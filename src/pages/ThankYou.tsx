import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, ArrowRight, Calendar, Crown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ThankYou = () => {
  const { user, subscription, checkSubscription } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifySubscription = async () => {
      if (user && checkSubscription) {
        try {
          // Wait a moment for Stripe to process, then check subscription
          setTimeout(async () => {
            await checkSubscription();
            setIsLoading(false);
          }, 2000);
        } catch (error) {
          console.error('Error verifying subscription:', error);
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    verifySubscription();
  }, [user, checkSubscription]);

  const handleGoToDashboard = () => {
    navigate('/dashboard');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/20 via-secondary/10 to-muted/20">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-foreground font-medium">Verifiziere Ihr Abonnement...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-secondary/10 to-muted/20">
      <Header />
      
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-2xl mx-auto">
          {/* Success Animation */}
          <div className="text-center mb-8">
            <div className="relative inline-flex items-center justify-center w-24 h-24 mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/60 rounded-full animate-pulse"></div>
              <CheckCircle className="w-16 h-16 text-white relative z-10" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Vielen Dank!
            </h1>
            <p className="text-xl text-muted-foreground">
              Ihr Abonnement wurde erfolgreich aktiviert
            </p>
          </div>

          {/* Subscription Details Card */}
          <Card className="mb-8 border-primary/20 shadow-lg">
            <CardHeader className="text-center pb-4">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center">
                  <Crown className="w-6 h-6 text-primary" />
                </div>
              </div>
              <CardTitle className="text-2xl font-semibold">
                Abonnement Aktiviert
              </CardTitle>
              <CardDescription className="text-lg">
                Sie haben jetzt vollen Zugang zu allen Premium-Funktionen
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Subscription Info */}
              <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-6 border border-primary/20">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg text-foreground">
                      {subscription.subscription_tier || 'Premium'} Plan
                    </h3>
                    <p className="text-muted-foreground">
                      Aktiv seit heute
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    <span className="text-sm text-foreground font-medium">
                      {subscription.subscription_end 
                        ? new Date(subscription.subscription_end).toLocaleDateString('de-DE')
                        : 'Aktiv'
                      }
                    </span>
                  </div>
                </div>
                
                {/* Features List */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">Unbegrenzte Arbeitsstundennachweise</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">Automatische PDF-Generierung</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">Individuelle Anpassungen</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">Priority Support</span>
                  </div>
                </div>
              </div>

              {/* Next Steps */}
              <div className="text-center space-y-4">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Was kommt als Nächstes?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Beginnen Sie sofort mit der Erstellung Ihrer ersten Arbeitsstundennachweise im Dashboard.
                </p>
                
                <Button 
                  onClick={handleGoToDashboard}
                  size="lg"
                  className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Zum Dashboard
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Support Info */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">
              Fragen zu Ihrem Abonnement?
            </p>
            <Button 
              variant="outline" 
              onClick={() => navigate('/help')}
              className="text-sm"
            >
              Support kontaktieren
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ThankYou;