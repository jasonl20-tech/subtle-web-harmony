import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, LogOut, Download, Calendar, Copy, Key } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Dashboard = () => {
  const { user, subscription, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [userApiKey, setUserApiKey] = useState<string>('');
  const [reports, setReports] = useState<any[]>([]);

  const fetchUserData = async () => {
    if (!user) return;
    
    try {
      // Get user profile with API key
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('api_key')
        .eq('user_id', user.id)
        .single();
      
      if (profileError) {
        console.error('Profile error:', profileError);
        return;
      }
      
      if (profile?.api_key) {
        setUserApiKey(profile.api_key);
        
        // Fetch user reports
        const { data: reportsData, error: reportsError } = await supabase
          .from('reports')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
        
        if (!reportsError && reportsData) {
          setReports(reportsData);
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    } else if (user) {
      fetchUserData();
    }
  }, [user, loading, navigate]);

  const handleSignOut = async () => {
    const auth = useAuth();
    if (!auth?.signOut) return;
    
    const { error } = await auth.signOut();
    if (error) {
      toast({
        title: "Fehler beim Abmelden",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Erfolgreich abgemeldet",
        description: "Auf Wiedersehen!",
      });
      navigate('/');
    }
  };

  const copyApiKey = () => {
    navigator.clipboard.writeText(userApiKey);
    toast({
      title: "API Key kopiert",
      description: "Der API Key wurde in die Zwischenablage kopiert.",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Wird geladen...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // Check if user has active subscription
  if (!subscription.subscribed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <Header />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Card className="max-w-2xl mx-auto text-center shadow-lg border-0 bg-card/50 backdrop-blur-sm">
            <CardContent className="py-16">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-10 h-10 text-primary" />
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-4">
                Premium-Mitgliedschaft erforderlich
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Um das Dashboard und alle Funktionen nutzen zu können, benötigen Sie eine aktive Premium-Mitgliedschaft.
              </p>
              <div className="space-y-4">
                <Button 
                  size="lg" 
                  onClick={() => {
                    const auth = useAuth();
                    if (auth?.checkSubscription) {
                      console.log('[DASHBOARD] Manual subscription refresh triggered');
                      auth.checkSubscription();
                      toast({
                        title: "Abonnement wird überprüft...",
                        description: "Einen Moment bitte.",
                      });
                    }
                  }}
                  variant="outline"
                  className="w-full max-w-sm mx-auto mb-4"
                >
                  Abonnement aktualisieren
                </Button>
                <Button 
                  size="lg" 
                  onClick={() => navigate('/pricing')}
                  className="w-full max-w-sm mx-auto bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
                >
                  Jetzt Premium werden
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleSignOut}
                  className="w-full max-w-sm mx-auto"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Abmelden
                </Button>
              </div>
              
              {/* Debug Info */}
              <details className="mt-8 text-left">
                <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
                  Debug Info
                </summary>
                <div className="mt-2 p-4 bg-muted/50 rounded-lg text-xs font-mono">
                  <p>User: {user?.email}</p>
                  <p>Subscribed: {subscription.subscribed ? 'Yes' : 'No'}</p>
                  <p>Tier: {subscription.subscription_tier || 'None'}</p>
                  <p>End: {subscription.subscription_end || 'None'}</p>
                </div>
              </details>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-white">
      <Header />
      
      {/* Animated Curved Rainbow Gradient Background */}
      <div className="absolute top-0 left-0 right-0 h-full z-0">
        <svg
          className="absolute top-0 left-0 w-full h-full"
          viewBox="0 0 1400 800"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="dashboardGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="25%" stopColor="#EC4899" />
              <stop offset="50%" stopColor="#F97316" />
              <stop offset="75%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
          <path
            d="M-100,0 L1500,0 L1500,60 Q1200,80 1000,120 Q800,160 600,140 Q400,120 200,380 Q100,400 -100,420 Z"
            fill="url(#dashboardGradient)"
            opacity="0.10"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; 20,-10; 0,0; -20,10; 0,0"
              dur="8s"
              repeatCount="indefinite"
            />
          </path>
        </svg>
      </div>

      <main className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Welcome Section */}
        <div className="mb-20 text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-8">
              <span className="text-gray-900">Willkommen </span>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">zurück!</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Verwalten Sie Ihre Arbeitsstundennachweise und API-Integration
            </p>
          </div>
        </div>

        <Tabs defaultValue="reports" className="w-full">
          <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <TabsList className="grid w-full grid-cols-3 max-w-4xl mx-auto mb-16 p-2 h-auto bg-white/80 backdrop-blur-sm border border-gray-100 shadow-lg rounded-2xl">
              <TabsTrigger 
                value="reports" 
                className="flex items-center justify-center space-x-3 py-4 px-6 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 text-gray-700 hover:text-gray-900"
              >
                <FileText className="w-5 h-5" />
                <span className="hidden sm:inline font-medium">Berichte</span>
              </TabsTrigger>
              <TabsTrigger 
                value="api" 
                className="flex items-center justify-center space-x-3 py-4 px-6 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 text-gray-700 hover:text-gray-900"
              >
                <Key className="w-5 h-5" />
                <span className="hidden sm:inline font-medium">API</span>
              </TabsTrigger>
              <TabsTrigger 
                value="subscription" 
                className="flex items-center justify-center space-x-3 py-4 px-6 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 text-gray-700 hover:text-gray-900"
              >
                <Calendar className="w-5 h-5" />
                <span className="hidden sm:inline font-medium">Abonnement</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="reports" className="mt-8">
            <div className="animate-fade-in-up">
              <Card className="card-modern max-w-6xl mx-auto">
                <CardHeader className="text-center pb-10 bg-gradient-to-b from-primary/5 to-transparent">
                  <CardTitle className="flex items-center justify-center space-x-4 text-3xl mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/30 rounded-2xl flex items-center justify-center">
                      <FileText className="w-7 h-7 text-primary" />
                    </div>
                    <span>Ihre Berichte</span>
                  </CardTitle>
                  <CardDescription className="text-lg mt-2 max-w-2xl mx-auto leading-relaxed">
                    Übersicht über Ihre verarbeiteten Arbeitsstundennachweise
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  {reports.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {reports.map((report, index) => (
                        <div key={report.id} className="animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                          <Card className="card-modern bg-gradient-to-br from-card to-card/50 hover:shadow-lg transition-all duration-300">
                            <CardContent className="p-6">
                              <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center space-x-4">
                                  <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/20 rounded-xl flex items-center justify-center">
                                    <FileText className="w-6 h-6 text-primary" />
                                  </div>
                                  <div>
                                    <h3 className="font-semibold text-foreground text-lg line-clamp-1">{report.title}</h3>
                                    <p className="text-muted-foreground">
                                      {new Date(report.created_at).toLocaleDateString('de-DE')}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-muted-foreground font-medium">
                                  {report.file_type || 'Bericht'}
                                </span>
                                <Button
                                  variant="outline"
                                  onClick={() => window.open(report.download_url, '_blank')}
                                  className="flex items-center space-x-2 hover:bg-primary hover:text-primary-foreground transition-colors"
                                >
                                  <Download className="w-4 h-4" />
                                  <span>Download</span>
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-20">
                      <div className="w-28 h-28 bg-gradient-to-br from-muted/20 to-muted/10 rounded-full flex items-center justify-center mx-auto mb-8">
                        <FileText className="w-14 h-14 text-muted-foreground" />
                      </div>
                      <h3 className="text-2xl font-semibold mb-4">Keine Berichte vorhanden</h3>
                      <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
                        Ihre Berichte werden automatisch über die API-Integration hinzugefügt.
                      </p>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          const apiTab = document.querySelector('[value="api"]') as HTMLElement;
                          apiTab?.click();
                        }}
                        className="px-8 py-3 hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        Zur API
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="api" className="mt-8">
            <div className="animate-fade-in-up">
              <Card className="card-modern max-w-4xl mx-auto">
                <CardHeader className="text-center pb-10 bg-gradient-to-b from-primary/5 to-transparent">
                  <CardTitle className="flex items-center justify-center space-x-4 text-3xl mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/30 rounded-2xl flex items-center justify-center">
                      <Key className="w-7 h-7 text-primary" />
                    </div>
                    <span>API Integration</span>
                  </CardTitle>
                  <CardDescription className="text-lg mt-2 max-w-2xl mx-auto leading-relaxed">
                    Verwenden Sie Ihren API Key für die automatische Übertragung von Berichten
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8 p-8">
                  {/* API Key Section */}
                  <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 border border-primary/20">
                    <h3 className="text-xl font-semibold mb-4">Ihr API Key</h3>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="flex-1 bg-white/50 rounded-lg p-4 font-mono text-sm border">
                        {userApiKey || 'Wird geladen...'}
                      </div>
                      <Button
                        variant="outline"
                        onClick={copyApiKey}
                        disabled={!userApiKey}
                        className="flex items-center space-x-2"
                      >
                        <Copy className="w-4 h-4" />
                        <span>Kopieren</span>
                      </Button>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Verwenden Sie diesen API Key zur automatischen Übertragung Ihrer Berichte.
                    </p>
                  </div>

                  {/* API Usage Documentation */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold">API Verwendung</h3>
                    
                    <div className="bg-muted/50 rounded-lg p-6 space-y-4">
                      <h4 className="font-semibold">Berichte hinzufügen</h4>
                      <p className="text-muted-foreground">
                        Senden Sie Berichte über die folgende API-Endpoint:
                      </p>
                      <div className="bg-white/80 rounded-lg p-4 font-mono text-sm border">
                        POST https://kcahfnjgcwgntwkwypvx.supabase.co/functions/v1/add-report
                      </div>
                      
                      <h5 className="font-medium mt-4">Payload Format:</h5>
                      <div className="bg-white/80 rounded-lg p-4 font-mono text-sm border">
                        {JSON.stringify({
                          api_key: "ihr-api-key",
                          title: "Bericht Name",
                          download_url: "https://example.com/report.pdf",
                          file_type: "PDF" // optional
                        }, null, 2)}
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-900 mb-2">💡 Tipp</h4>
                      <p className="text-blue-700 text-sm">
                        Alle über diese API hinzugefügten Berichte erscheinen automatisch in Ihrer Berichte-Übersicht.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="subscription" className="mt-8">
            <div className="animate-fade-in-up">
              <Card className="card-modern max-w-5xl mx-auto">
                <CardHeader className="text-center pb-10 bg-gradient-to-b from-primary/5 to-transparent">
                  <CardTitle className="flex items-center justify-center space-x-4 text-3xl mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/30 rounded-2xl flex items-center justify-center">
                      <Calendar className="w-7 h-7 text-primary" />
                    </div>
                    <span>Mein Abonnement</span>
                  </CardTitle>
                  <CardDescription className="text-lg mt-2 max-w-2xl mx-auto leading-relaxed">
                    Verwalten Sie Ihr Abonnement und Zahlungseinstellungen
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-10 p-8">
                  {/* Current Subscription Status */}
                  <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 border border-primary/20 animate-scale-in">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-semibold text-foreground mb-2">Aktives Abonnement</h3>
                        <p className="text-muted-foreground text-lg">
                          {subscription.subscription_tier} Plan
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-success/20 to-success/10 text-success text-base font-semibold border border-success/20">
                          ✓ Aktiv
                        </div>
                      </div>
                    </div>
                    
                    {subscription.subscription_end && (
                      <div className="text-muted-foreground">
                        <p className="text-base">Nächste Abrechnung: {new Date(subscription.subscription_end).toLocaleDateString('de-DE', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}</p>
                      </div>
                    )}
                  </div>

                  {/* Management Actions */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="animate-slide-in-right" style={{ animationDelay: '0.1s' }}>
                      <Card className="card-modern bg-gradient-to-br from-card to-card/50 h-full">
                        <CardContent className="p-8">
                          <div className="flex items-center space-x-4 mb-6">
                            <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/20 rounded-xl flex items-center justify-center">
                              <Calendar className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">Zahlungseinstellungen</h3>
                              <p className="text-muted-foreground">Zahlungsmethode & Rechnungen</p>
                            </div>
                          </div>
                          <Button 
                            className="w-full h-12 text-base" 
                            variant="outline"
                            onClick={async () => {
                              try {
                                const auth = useAuth();
                                if (!auth?.session) return;
                                
                                const { data, error } = await supabase.functions.invoke('customer-portal', {
                                  headers: {
                                    Authorization: `Bearer ${auth.session.access_token}`,
                                  },
                                });
                                
                                if (error) {
                                  toast({
                                    title: "Fehler",
                                    description: "Kundenportal konnte nicht geöffnet werden.",
                                    variant: "destructive",
                                  });
                                  return;
                                }
                                
                                window.open(data.url, '_blank');
                              } catch (error) {
                                toast({
                                  title: "Fehler",
                                  description: "Ein unerwarteter Fehler ist aufgetreten.",
                                  variant: "destructive",
                                });
                              }
                            }}
                          >
                            Zahlungen verwalten
                          </Button>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
                      <Card className="card-modern bg-gradient-to-br from-card to-card/50 h-full">
                        <CardContent className="p-8">
                          <div className="flex items-center space-x-4 mb-6">
                            <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/20 rounded-xl flex items-center justify-center">
                              <Download className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">Subscription Status</h3>
                              <p className="text-muted-foreground">Status aktualisieren</p>
                            </div>
                          </div>
                          <Button 
                            className="w-full h-12 text-base" 
                            variant="outline"
                            onClick={async () => {
                              const auth = useAuth();
                              if (auth?.checkSubscription) {
                                await auth.checkSubscription();
                                toast({
                                  title: "Erfolgreich aktualisiert",
                                  description: "Abonnement-Status wurde überprüft.",
                                });
                              }
                            }}
                          >
                            Status aktualisieren
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </section>
  );
};

export default Dashboard;