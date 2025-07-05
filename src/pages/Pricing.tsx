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
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { plan },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) {
        throw error;
      }

      // Open Stripe checkout in new tab
      window.open(data.url, '_blank');
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: "Fehler beim Checkout",
        description: "Es gab ein Problem beim Öffnen des Checkouts. Bitte versuchen Sie es erneut.",
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header />
      <main className="py-20 lg:py-32">
        <div className="container mx-auto px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Wählen Sie Ihren Plan
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8">
              Automatisieren Sie Ihre Arbeitsstundennachweise mit unserem Premium-Service
            </p>
            
            {subscription.subscribed && (
              <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-8">
                <Check className="w-4 h-4 mr-2" />
                Sie haben bereits ein aktives {subscription.subscription_tier} Abonnement
              </div>
            )}
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Monthly Plan */}
            <Card className="relative overflow-hidden shadow-lg border-0 bg-card/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center pb-8 bg-gradient-to-b from-primary/5 to-transparent">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Monatlich</h3>
                <div className="space-y-2">
                  <div className="text-4xl font-bold text-primary">49€</div>
                  <p className="text-muted-foreground">pro Monat (netto)</p>
                  <p className="text-sm text-muted-foreground">58,31€ inkl. MwSt.</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className="w-full h-12 text-lg bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-200"
                  onClick={() => handleCheckout('monthly')}
                  disabled={isLoading.monthly || (subscription.subscribed && subscription.subscription_tier === 'Monatlich')}
                >
                  {isLoading.monthly ? (
                    "Wird geladen..."
                  ) : subscription.subscribed && subscription.subscription_tier === 'Monatlich' ? (
                    "Aktueller Plan"
                  ) : (
                    "Monatlich starten"
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Yearly Plan */}
            <Card className="relative overflow-hidden shadow-lg border-2 border-primary bg-card/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground px-4 py-1 font-semibold">
                  <Crown className="w-4 h-4 mr-1" />
                  2 Monate gratis
                </Badge>
              </div>
              
              <CardHeader className="text-center pb-8 bg-gradient-to-b from-primary/10 to-transparent pt-8">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Jährlich</h3>
                <div className="space-y-2">
                  <div className="text-4xl font-bold text-primary">499€</div>
                  <p className="text-muted-foreground">pro Jahr (netto)</p>
                  <p className="text-sm text-muted-foreground">593,81€ inkl. MwSt.</p>
                  <div className="bg-green-100 text-green-800 rounded-full px-3 py-1 text-sm font-medium inline-block">
                    Sparen Sie 89€ pro Jahr!
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className="w-full h-12 text-lg bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                  onClick={() => handleCheckout('yearly')}
                  disabled={isLoading.yearly || (subscription.subscribed && subscription.subscription_tier === 'Jährlich')}
                >
                  {isLoading.yearly ? (
                    "Wird geladen..."
                  ) : subscription.subscribed && subscription.subscription_tier === 'Jährlich' ? (
                    "Aktueller Plan"
                  ) : (
                    "Jährlich starten"
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Additional Info */}
          <div className="text-center max-w-2xl mx-auto mt-16">
            <p className="text-muted-foreground mb-4">
              Alle Preise verstehen sich zzgl. der gesetzlichen Mehrwertsteuer.
            </p>
            <p className="text-sm text-muted-foreground">
              Sie können Ihr Abonnement jederzeit über das Kundenportal verwalten oder kündigen.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;