import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(
      supabaseUrl,
      supabaseServiceKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { api_key, title, download_url, file_type } = await req.json();

    if (!api_key || !title || !download_url) {
      return new Response(JSON.stringify({ error: 'Missing required fields: api_key, title, download_url' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Received report request:', { api_key, title, download_url, file_type });

    // Find user by API key
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('user_id')
      .eq('api_key', api_key)
      .single();

    if (profileError || !profile) {
      console.error('Profile lookup error:', profileError);
      return new Response(JSON.stringify({ error: 'Invalid API key' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Found user:', profile.user_id);

    // Insert report
    const { data: report, error: insertError } = await supabase
      .from('reports')
      .insert({
        user_id: profile.user_id,
        api_key: api_key,
        title: title,
        download_url: download_url,
        file_type: file_type || null
      })
      .select()
      .single();

    if (insertError) {
      console.error('Insert error:', insertError);
      return new Response(JSON.stringify({ error: 'Failed to create report' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Report created successfully:', report);

    return new Response(JSON.stringify({ 
      success: true, 
      report: report,
      message: 'Report added successfully' 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in add-report function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});