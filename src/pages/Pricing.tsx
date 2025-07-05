import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Zap, Crown } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Pricing = () => {
  const { user, session, subscription, checkSubscription } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState({ monthly: false, yearly: false });

  useEffect(() => {
    if (user && checkSubscription) {
      checkSubscription();
    }
  }, [user, checkSubscription]);

  const handleCheckout = async (plan: 'monthly' | 'yearly') => {
    console.log('Checkout started', { plan, user: !!user, session: !!session });
    
    if (!user) {
      navigate('/auth');
      return;
    }

    if (!session) {
      toast({
        title: "Keine gültige Session",
        description: "Bitte melden Sie sich erneut an.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(prev => ({ ...prev, [plan]: true }));

    try {
      console.log('Invoking create-checkout function');
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { plan },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      console.log('Function response', { data, error });

      if (error) {
        throw error;
      }

      if (!data?.url) {
        throw new Error('Keine Checkout-URL erhalten');
      }

      console.log('Opening checkout URL:', data.url);
      // Open Stripe checkout in new tab
      window.open(data.url, '_blank');
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: "Fehler beim Checkout",
        description: error instanceof Error ? error.message : "Es gab ein Problem beim Öffnen des Checkouts. Bitte versuchen Sie es erneut.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(prev => ({ ...prev, [plan]: false }));
    }
  };

  const features = [
    "Unbegrenzte Stundennachweise hochladen",
    "Automatische Verarbeitung und Analyse", 
    "Export in verschiedene Formate",
    "Bundesland-spezifische Regelungen",
    "Individuelle Arbeitszeit-Regeln",
    "Download von verarbeiteten Berichten",
    "Premium E-Mail Support",
    "Sicherheit und Datenschutz"
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary-light/30">
      <Header />
      <main className="py-20 lg:py-32">
        <div className="container mx-auto px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center max-w-4xl mx-auto mb-20">
            <div className="animate-fade-in-up">
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-foreground mb-8 leading-tight">
                Wählen Sie Ihren 
                <span className="bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent"> Plan</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-12 max-w-3xl mx-auto">
                Automatisieren Sie Ihre Arbeitsstundennachweise mit unserem Premium-Service
              </p>
            </div>
            
            {subscription.subscribed && (
              <div className="animate-scale-in inline-flex items-center px-6 py-3 bg-gradient-to-r from-accent-light to-accent-light/80 text-accent rounded-full text-base font-semibold mb-8 shadow-md">
                <Check className="w-5 h-5 mr-3" />
                Sie haben bereits ein aktives {subscription.subscription_tier} Abonnement
              </div>
            )}
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Monthly Plan */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <Card className="card-pricing">
                <CardHeader className="text-center pb-10 bg-gradient-to-b from-primary/5 to-transparent">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse-subtle">
                    <Zap className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4 text-foreground">Monatlich</h3>
                  <div className="space-y-3">
                    <div className="text-5xl font-bold text-primary">49€</div>
                    <p className="text-muted-foreground text-lg">pro Monat (netto)</p>
                    <p className="text-sm text-muted-foreground opacity-75">58,31€ inkl. MwSt.</p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-8 px-8 pb-10">
                  <ul className="space-y-4">
                    {features.map((feature, index) => (
                      <li key={index} className="feature-item flex items-start space-x-4">
                        <Check className="feature-check w-6 h-6 text-success mt-0.5 flex-shrink-0" />
                        <span className="text-base leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className="btn-gradient w-full h-14 text-lg font-semibold text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={() => handleCheckout('monthly')}
                    disabled={isLoading.monthly || (subscription.subscribed && subscription.subscription_tier === 'Monatlich')}
                  >
                    {isLoading.monthly ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-current border-t-transparent mr-3"></div>
                        Wird geladen...
                      </>
                    ) : subscription.subscribed && subscription.subscription_tier === 'Monatlich' ? (
                      <>
                        <Check className="w-5 h-5 mr-2" />
                        Aktueller Plan
                      </>
                    ) : (
                      "Monatlich starten"
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Yearly Plan */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <Card className="card-pricing border-2 border-primary/20 bg-gradient-to-b from-card to-primary-light/10">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="btn-success-gradient text-success-foreground px-6 py-2 font-bold text-sm shadow-md">
                    <Crown className="w-4 h-4 mr-2" />
                    2 Monate gratis
                  </Badge>
                </div>
                
                <CardHeader className="text-center pb-10 bg-gradient-to-b from-primary/10 to-transparent pt-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/30 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse-subtle">
                    <Crown className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4 text-foreground">Jährlich</h3>
                  <div className="space-y-3">
                    <div className="text-5xl font-bold text-primary">499€</div>
                    <p className="text-muted-foreground text-lg">pro Jahr (netto)</p>
                    <p className="text-sm text-muted-foreground opacity-75">593,81€ inkl. MwSt.</p>
                    <div className="inline-block bg-gradient-to-r from-success/20 to-success/10 text-success rounded-full px-4 py-2 text-sm font-semibold border border-success/20">
                      Sparen Sie 89€ pro Jahr!
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-8 px-8 pb-10">
                  <ul className="space-y-4">
                    {features.map((feature, index) => (
                      <li key={index} className="feature-item flex items-start space-x-4">
                        <Check className="feature-check w-6 h-6 text-success mt-0.5 flex-shrink-0" />
                        <span className="text-base leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className="btn-success-gradient w-full h-14 text-lg font-semibold text-success-foreground shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={() => handleCheckout('yearly')}
                    disabled={isLoading.yearly || (subscription.subscribed && subscription.subscription_tier === 'Jährlich')}
                  >
                    {isLoading.yearly ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-current border-t-transparent mr-3"></div>
                        Wird geladen...
                      </>
                    ) : subscription.subscribed && subscription.subscription_tier === 'Jährlich' ? (
                      <>
                        <Check className="w-5 h-5 mr-2" />
                        Aktueller Plan
                      </>
                    ) : (
                      "Jährlich starten"
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Additional Info */}
          <div className="text-center max-w-3xl mx-auto mt-20">
            <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="bg-gradient-to-r from-muted/50 to-secondary/30 rounded-2xl p-8 backdrop-blur-sm border border-border/50">
                <p className="text-muted-foreground mb-4 text-lg">
                  Alle Preise verstehen sich zzgl. der gesetzlichen Mehrwertsteuer.
                </p>
                <p className="text-base text-muted-foreground/80">
                  Sie können Ihr Abonnement jederzeit über das Kundenportal verwalten oder kündigen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
