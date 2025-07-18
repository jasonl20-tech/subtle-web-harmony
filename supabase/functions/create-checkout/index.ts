
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-CHECKOUT] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? ""
  );

  try {
    logStep("Function started");
    
    // Check if Stripe key is available
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      throw new Error("STRIPE_SECRET_KEY is not configured");
    }
    logStep("Stripe key found", { keyLength: stripeKey.length });
    
    const { plan } = await req.json();
    if (!plan || !['monthly', 'yearly'].includes(plan)) {
      throw new Error("Invalid plan. Must be 'monthly' or 'yearly'");
    }
    
    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data } = await supabaseClient.auth.getUser(token);
    const user = data.user;
    if (!user?.email) throw new Error("User not authenticated or email not available");
    
    logStep("User authenticated", { userId: user.id, email: user.email, plan });

    const stripe = new Stripe(stripeKey, { 
      apiVersion: "2023-10-16" 
    });
    
    // Check if customer exists
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      logStep("Existing customer found", { customerId });
    } else {
      logStep("Creating new customer");
    }

    // Define pricing (in cents, including VAT)
    const pricing = {
      monthly: {
        amount: 5831, // 49€ netto + 19% VAT = 58,31€
        interval: 'month'
      },
      yearly: {
        amount: 59381, // 499€ netto + 19% VAT = 593,81€  
        interval: 'year'
      }
    };

    const selectedPlan = pricing[plan as keyof typeof pricing];
    logStep("Creating checkout session", { plan, amount: selectedPlan.amount, interval: selectedPlan.interval });

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : user.email,
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: { 
              name: `Arbeitsstundennachweise - ${plan === 'monthly' ? 'Monatlich' : 'Jährlich'}`,
              description: `${plan === 'monthly' ? 'Monatliches' : 'Jährliches'} Abonnement für Arbeitsstundennachweise`
            },
            unit_amount: selectedPlan.amount,
            recurring: { interval: selectedPlan.interval },
          },
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${req.headers.get("origin")}/thank-you`,
      cancel_url: `${req.headers.get("origin")}/pricing?canceled=true`,
    });

    logStep("Checkout session created", { sessionId: session.id, url: session.url });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in create-checkout", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
