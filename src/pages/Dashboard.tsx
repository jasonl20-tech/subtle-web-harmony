import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, FileText, LogOut, Plus, X, Download, Calendar, MapPin, Settings, Users, Key, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Dashboard = () => {
  const { user, subscription, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [stundenplanFile, setStundenplanFile] = useState<File | null>(null);
  const [gesamtstundenFile, setGesamtstundenFile] = useState<File | null>(null);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedBundesland, setSelectedBundesland] = useState('');
  const [rules, setRules] = useState(['']);
  const [userApiKey, setUserApiKey] = useState<string>('');
  const [reports, setReports] = useState<any[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [allProfiles, setAllProfiles] = useState<any[]>([]);
  const [webhookUrl, setWebhookUrl] = useState('https://xlk.ai/webhook-test/325480de-a076-41e7-8d11-3bb1edb8f668');

  const months = [
    { value: '01', label: 'Januar' },
    { value: '02', label: 'Februar' },
    { value: '03', label: 'März' },
    { value: '04', label: 'April' },
    { value: '05', label: 'Mai' },
    { value: '06', label: 'Juni' },
    { value: '07', label: 'Juli' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'Oktober' },
    { value: '11', label: 'November' },
    { value: '12', label: 'Dezember' }
  ];

  const years = Array.from({ length: 10 }, (_, i) => {
    const year = new Date().getFullYear() - 5 + i;
    return { value: year.toString(), label: year.toString() };
  });

  const bundeslaender = [
    'Baden-Württemberg', 'Bayern', 'Berlin', 'Brandenburg', 'Bremen',
    'Hamburg', 'Hessen', 'Mecklenburg-Vorpommern', 'Niedersachsen',
    'Nordrhein-Westfalen', 'Rheinland-Pfalz', 'Saarland', 'Sachsen',
    'Sachsen-Anhalt', 'Schleswig-Holstein', 'Thüringen'
  ];

  const addRule = () => {
    if (rules.length < 10) {
      setRules([...rules, '']);
    }
  };

  const removeRule = (index: number) => {
    if (rules.length > 1) {
      setRules(rules.filter((_, i) => i !== index));
    }
  };

  const updateRule = (index: number, value: string) => {
    const newRules = [...rules];
    newRules[index] = value;
    setRules(newRules);
  };

  const downloadTemplate = (type: 'stundenplan' | 'gesamtstunden') => {
    const headers = type === 'stundenplan' 
      ? ['Datum', 'Startzeit', 'Endzeit', 'Pause', 'Beschreibung']
      : ['Woche', 'Gesamtstunden', 'Überstunden', 'Bemerkungen'];
    
    const csvContent = headers.join(',') + '\n';
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}_template.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const checkAdminRole = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .eq('role', 'admin')
        .single();
      
      setIsAdmin(!error && data?.role === 'admin');
    } catch (error) {
      console.error('Error checking admin role:', error);
      setIsAdmin(false);
    }
  };

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

  const fetchAdminData = async () => {
    if (!isAdmin) return;
    
    try {
      // Use a more explicit query to get all data properly
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select(`
          id,
          user_id,
          email,
          full_name,
          api_key,
          created_at,
          updated_at
        `)
        .order('created_at', { ascending: false });
      
      if (profilesError) {
        console.error('[ADMIN] Error fetching profiles:', profilesError);
        return;
      }

      // Fetch user roles separately
      const { data: rolesData } = await supabase
        .from('user_roles')
        .select('user_id, role');

      // Fetch subscribers separately  
      const { data: subscribersData } = await supabase
        .from('subscribers')
        .select('user_id, subscribed, subscription_tier');

      // Combine the data
      const enrichedProfiles = profilesData?.map(profile => {
        const userRole = rolesData?.find(role => role.user_id === profile.user_id);
        const subscriber = subscribersData?.find(sub => sub.user_id === profile.user_id);
        
        return {
          ...profile,
          user_roles: userRole ? [userRole] : [],
          subscribers: subscriber ? [subscriber] : []
        };
      });

      console.log('[ADMIN] Fetched enriched profiles:', enrichedProfiles);
      setAllProfiles(enrichedProfiles || []);
      
    } catch (error) {
      console.error('Error fetching admin data:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      
      // Add form fields
      formData.append('month', selectedMonth);
      formData.append('year', selectedYear);
      formData.append('bundesland', selectedBundesland);
      
      // Add rules as rule_1, rule_2, etc.
      const filteredRules = rules.filter(rule => rule.trim());
      filteredRules.forEach((rule, index) => {
        formData.append(`rule_${index + 1}`, rule);
      });
      
      formData.append('api_key', userApiKey);
      
      // Add files
      if (stundenplanFile) {
        formData.append('stundenplan', stundenplanFile);
      }
      if (gesamtstundenFile) {
        formData.append('gesamtstunden', gesamtstundenFile);
      }

      const response = await fetch(webhookUrl, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        toast({
          title: "Erfolgreich gesendet",
          description: "Ihre Daten wurden erfolgreich verarbeitet.",
        });
        // Reset form
        setStundenplanFile(null);
        setGesamtstundenFile(null);
        setSelectedMonth('');
        setSelectedYear('');
        setSelectedBundesland('');
        setRules(['']);
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      toast({
        title: "Fehler beim Upload",
        description: "Es gab ein Problem beim Senden der Daten.",
        variant: "destructive",
      });
    }
  };

  const grantSubscription = async (userId: string, userEmail: string) => {
    try {
      const { error } = await supabase
        .from('subscribers')
        .upsert({
          user_id: userId,
          email: userEmail,
          subscribed: true,
          subscription_tier: 'Standard',
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      toast({
        title: "Abonnement gewährt",
        description: "Der Benutzer kann jetzt das Dashboard nutzen.",
      });
      
      fetchAdminData();
    } catch (error) {
      toast({
        title: "Fehler",
        description: "Abonnement konnte nicht gewährt werden.",
        variant: "destructive",
      });
    }
  };

  const revokeSubscription = async (userId: string, userEmail: string) => {
    try {
      const { error } = await supabase
        .from('subscribers')
        .upsert({
          user_id: userId,
          email: userEmail,
          subscribed: false,
          subscription_tier: null,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      toast({
        title: "Abonnement entzogen",
        description: "Der Benutzer hat keinen Zugriff mehr auf das Dashboard.",
      });
      
      fetchAdminData();
    } catch (error) {
      toast({
        title: "Fehler",
        description: "Abonnement konnte nicht entzogen werden.",
        variant: "destructive",
      });
    }
  };

  const toggleUserRole = async (userId: string, currentRole?: string) => {
    try {
      const newRole = currentRole === 'admin' ? 'user' : 'admin';
      
      // Use upsert to handle users without existing roles
      const { error } = await supabase
        .from('user_roles')
        .upsert({ 
          user_id: userId, 
          role: newRole 
        }, { 
          onConflict: 'user_id' 
        });

      if (error) throw error;

      toast({
        title: "Rolle geändert",
        description: `Benutzer ist jetzt ${newRole === 'admin' ? 'Administrator' : 'normaler User'}.`,
      });
      
      fetchAdminData();
    } catch (error) {
      toast({
        title: "Fehler",
        description: "Rolle konnte nicht geändert werden.",
        variant: "destructive",
      });
    }
  };

  const copyApiKey = (apiKey: string) => {
    navigator.clipboard.writeText(apiKey);
    toast({
      title: "API Key kopiert",
      description: "Der API Key wurde in die Zwischenablage kopiert.",
    });
  };

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    } else if (user) {
      fetchUserData();
      checkAdminRole();
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchAdminData();
    }
  }, [isAdmin]);

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
                <Upload className="w-10 h-10 text-primary" />
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-4">
                Abonnement erforderlich
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Um das Dashboard nutzen zu können, benötigen Sie ein aktives Abonnement.
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
                  Jetzt abonnieren
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

  const tabsConfig = isAdmin ? [
    { value: 'upload', icon: Upload, label: 'Upload' },
    { value: 'reports', icon: FileText, label: 'Berichte' },
    { value: 'admin', icon: Settings, label: 'Admin' },
    { value: 'subscription', icon: Calendar, label: 'Abonnement' }
  ] : [
    { value: 'upload', icon: Upload, label: 'Upload' },
    { value: 'reports', icon: FileText, label: 'Berichte' },
    { value: 'subscription', icon: Calendar, label: 'Abonnement' }
  ];

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
              {isAdmin && (
                <span className="block text-2xl md:text-3xl text-red-600 mt-4">
                  🛡️ Admin-Bereich
                </span>
              )}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Verwalten Sie Ihre Arbeitsstundennachweise einfach und effizient mit unserer automatisierten Lösung
            </p>
          </div>
        </div>

        <Tabs defaultValue="upload" className="w-full">
          <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <TabsList className={`grid w-full grid-cols-${tabsConfig.length} max-w-4xl mx-auto mb-16 p-2 h-auto bg-white/80 backdrop-blur-sm border border-gray-100 shadow-lg rounded-2xl`}>
              {tabsConfig.map(({ value, icon: Icon, label }) => (
                <TabsTrigger 
                  key={value}
                  value={value} 
                  className="flex items-center justify-center space-x-3 py-4 px-6 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 text-gray-700 hover:text-gray-900"
                >
                  <Icon className="w-5 h-5" />
                  <span className="hidden sm:inline font-medium">{label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value="upload" className="mt-8">
            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <Card className="max-w-6xl mx-auto bg-white/80 backdrop-blur-sm border border-gray-100 shadow-xl rounded-2xl">
                <CardHeader className="text-center pb-10 bg-gradient-to-b from-blue-50/50 to-transparent">
                  <CardTitle className="flex items-center justify-center space-x-4 text-3xl md:text-4xl mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                      <Upload className="w-8 h-8 text-white" />
                    </div>
                    <span className="text-gray-900">Dateien hochladen</span>
                  </CardTitle>
                  <CardDescription className="text-xl mt-2 max-w-3xl mx-auto leading-relaxed text-gray-600">
                    Laden Sie Ihre Stundendaten hoch und lassen Sie sie automatisch verarbeiten - in nur wenigen Minuten erhalten Sie Ihren fertigen Nachweis
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8 p-6">
                  {/* Upload Sections */}
                  <div className="space-y-6">
                    {/* Combined Upload Area */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-slide-in-right" style={{ animationDelay: '0.1s' }}>
                      {/* Stundenplan Upload */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label className="text-lg font-semibold flex items-center space-x-2">
                            <div className="w-6 h-6 bg-primary/10 rounded-lg flex items-center justify-center">
                              <Calendar className="w-4 h-4 text-primary" />
                            </div>
                            <span>Stundenplan</span>
                          </Label>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => downloadTemplate('stundenplan')}
                            className="flex items-center space-x-2 hover:bg-primary hover:text-primary-foreground transition-colors h-8 px-3 text-xs"
                          >
                            <Download className="w-3 h-3" />
                            <span>Template</span>
                          </Button>
                        </div>
                        <div className="upload-area p-6 text-center min-h-[140px] flex flex-col justify-center">
                          <Upload className="w-10 h-10 mx-auto text-primary mb-3 animate-pulse-subtle" />
                          <p className="text-sm text-muted-foreground mb-3 font-medium">Stundenplan hier ablegen</p>
                          <Input
                            type="file"
                            accept=".xlsx,.xls,.csv"
                            onChange={(e) => setStundenplanFile(e.target.files?.[0] || null)}
                            className="text-xs file:mr-2 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary-hover file:transition-colors"
                          />
                          {stundenplanFile && (
                            <div className="mt-3 p-2 bg-success/10 border border-success/20 rounded-lg">
                              <p className="text-success font-medium text-sm">✓ {stundenplanFile.name}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Gesamtstundenübersicht Upload */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label className="text-lg font-semibold flex items-center space-x-2">
                            <div className="w-6 h-6 bg-primary/10 rounded-lg flex items-center justify-center">
                              <FileText className="w-4 h-4 text-primary" />
                            </div>
                            <span>Gesamtstunden</span>
                          </Label>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => downloadTemplate('gesamtstunden')}
                            className="flex items-center space-x-2 hover:bg-primary hover:text-primary-foreground transition-colors h-8 px-3 text-xs"
                          >
                            <Download className="w-3 h-3" />
                            <span>Template</span>
                          </Button>
                        </div>
                        <div className="upload-area p-6 text-center min-h-[140px] flex flex-col justify-center">
                          <Upload className="w-10 h-10 mx-auto text-primary mb-3 animate-pulse-subtle" />
                          <p className="text-sm text-muted-foreground mb-3 font-medium">Gesamtstunden hier ablegen</p>
                          <Input
                            type="file"
                            accept=".xlsx,.xls,.csv"
                            onChange={(e) => setGesamtstundenFile(e.target.files?.[0] || null)}
                            className="text-xs file:mr-2 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary-hover file:transition-colors"
                          />
                          {gesamtstundenFile && (
                            <div className="mt-3 p-2 bg-success/10 border border-success/20 rounded-lg">
                              <p className="text-success font-medium text-sm">✓ {gesamtstundenFile.name}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Compact Form Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                      <div className="space-y-2">
                        <Label className="text-base font-medium flex items-center space-x-2">
                          <div className="w-4 h-4 bg-primary/10 rounded flex items-center justify-center">
                            <Calendar className="w-3 h-3 text-primary" />
                          </div>
                          <span>Monat</span>
                        </Label>
                        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                          <SelectTrigger className="h-12 bg-card/80 backdrop-blur-sm border-border/50 rounded-xl">
                            <SelectValue placeholder="Monat" />
                          </SelectTrigger>
                          <SelectContent className="backdrop-blur-sm">
                            {months.map((month) => (
                              <SelectItem key={month.value} value={month.value}>
                                {month.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-base font-medium flex items-center space-x-2">
                          <div className="w-4 h-4 bg-primary/10 rounded flex items-center justify-center">
                            <Calendar className="w-3 h-3 text-primary" />
                          </div>
                          <span>Jahr</span>
                        </Label>
                        <Select value={selectedYear} onValueChange={setSelectedYear}>
                          <SelectTrigger className="h-12 bg-card/80 backdrop-blur-sm border-border/50 rounded-xl">
                            <SelectValue placeholder="Jahr" />
                          </SelectTrigger>
                          <SelectContent className="backdrop-blur-sm">
                            {years.map((year) => (
                              <SelectItem key={year.value} value={year.value}>
                                {year.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-base font-medium flex items-center space-x-2">
                          <div className="w-4 h-4 bg-primary/10 rounded flex items-center justify-center">
                            <MapPin className="w-3 h-3 text-primary" />
                          </div>
                          <span>Bundesland</span>
                        </Label>
                        <Select value={selectedBundesland} onValueChange={setSelectedBundesland}>
                          <SelectTrigger className="h-12 bg-card/80 backdrop-blur-sm border-border/50 rounded-xl">
                            <SelectValue placeholder="Bundesland" />
                          </SelectTrigger>
                          <SelectContent className="backdrop-blur-sm">
                            {bundeslaender.map((land) => (
                              <SelectItem key={land} value={land}>
                                {land}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Compact Rules Section */}
                    <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                      <div className="flex items-center justify-between">
                        <Label className="text-lg font-semibold">Regeln & Besonderheiten</Label>
                        {rules.length < 10 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={addRule}
                            className="flex items-center space-x-2 hover:bg-primary hover:text-primary-foreground transition-colors h-8 px-3 text-xs"
                          >
                            <Plus className="w-3 h-3" />
                            <span>Hinzufügen</span>
                          </Button>
                        )}
                      </div>
                      <div className="space-y-3">
                        {rules.map((rule, index) => (
                          <div key={index} className="relative">
                            <Input
                              value={rule}
                              onChange={(e) => updateRule(index, e.target.value)}
                              placeholder="z.B: Die Nachtschicht am Wochenende geht von 6 bis 12 Uhr"
                              className="pr-12 h-12 bg-card/80 backdrop-blur-sm border-border/50 focus:border-primary rounded-xl"
                            />
                            {rules.length > 1 && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeRule(index)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-destructive hover:text-destructive-foreground rounded-lg"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button 
                      className="btn-gradient w-full h-14 text-lg font-semibold text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300" 
                      onClick={handleSubmit}
                      disabled={!selectedMonth || !selectedYear || !selectedBundesland || (!stundenplanFile && !gesamtstundenFile)}
                    >
                      <Upload className="w-5 h-5 mr-2" />
                      Daten verarbeiten
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="mt-8">
            <div className="animate-fade-in-up">
              <Card className="card-modern max-w-6xl mx-auto">
                <CardHeader className="text-center pb-10 bg-gradient-to-b from-primary/5 to-transparent">
                  <CardTitle className="flex items-center justify-center space-x-4 text-3xl mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/30 rounded-2xl flex items-center justify-center">
                      <FileText className="w-7 h-7 text-primary" />
                    </div>
                    <span>Berichte</span>
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
                        Laden Sie zuerst Ihre Stundendaten hoch, um Berichte zu erstellen.
                      </p>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          const uploadTab = document.querySelector('[value="upload"]') as HTMLElement;
                          uploadTab?.click();
                        }}
                        className="px-8 py-3 hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        Zum Upload
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {isAdmin && (
            <TabsContent value="admin" className="mt-8">
              <div className="animate-fade-in-up space-y-8">
                {/* User Management */}
                <Card className="card-modern max-w-6xl mx-auto">
                  <CardHeader className="text-center pb-6 bg-gradient-to-b from-red-50 to-transparent">
                    <CardTitle className="flex items-center justify-center space-x-4 text-3xl mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-red-500/20 to-red-600/30 rounded-2xl flex items-center justify-center">
                        <Users className="w-7 h-7 text-red-600" />
                      </div>
                      <span>User Management</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-4">E-Mail</th>
                            <th className="text-left p-4">Name</th>
                            <th className="text-left p-4">Rolle</th>
                            <th className="text-left p-4">Abonnement</th>
                            <th className="text-left p-4">API Key</th>
                            <th className="text-left p-4">Aktionen</th>
                          </tr>
                        </thead>
                        <tbody>
                          {allProfiles.map((profile) => (
                            <tr key={profile.id} className="border-b hover:bg-muted/50">
                              <td className="p-4">{profile.email}</td>
                              <td className="p-4">{profile.full_name || '-'}</td>
                              <td className="p-4">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  profile.user_roles?.[0]?.role === 'admin' 
                                    ? 'bg-red-100 text-red-800' 
                                    : 'bg-blue-100 text-blue-800'
                                }`}>
                                  {profile.user_roles?.[0]?.role === 'admin' ? '🛡️ Admin' : '👤 User'}
                                </span>
                              </td>
                              <td className="p-4">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  profile.subscribers?.[0]?.subscribed 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-gray-100 text-gray-800'
                                }`}>
                                  {profile.subscribers?.[0]?.subscribed ? '✅ Abonniert' : '❌ Nicht abonniert'}
                                </span>
                              </td>
                              <td className="p-4">
                                <div className="flex items-center space-x-2">
                                  <code className="text-xs bg-muted px-2 py-1 rounded">
                                    {profile.api_key.substring(0, 8)}...
                                  </code>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => copyApiKey(profile.api_key)}
                                  >
                                    <Copy className="w-3 h-3" />
                                  </Button>
                                </div>
                              </td>
                              <td className="p-4">
                                <div className="flex space-x-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => toggleUserRole(profile.user_id, profile.user_roles?.[0]?.role)}
                                    className="text-xs"
                                  >
                                    {profile.user_roles?.[0]?.role === 'admin' ? '👤 User machen' : '🛡️ Admin machen'}
                                  </Button>
                                  {profile.subscribers?.[0]?.subscribed ? (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => revokeSubscription(profile.user_id, profile.email)}
                                      className="bg-red-50 hover:bg-red-100 text-red-700 text-xs"
                                    >
                                      Abo entziehen
                                    </Button>
                                  ) : (
                                    <Button
                                      size="sm"
                                      onClick={() => grantSubscription(profile.user_id, profile.email)}
                                      className="bg-green-600 hover:bg-green-700 text-white text-xs"
                                    >
                                      Abo gewähren
                                    </Button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                {/* API Documentation */}
                <Card className="card-modern max-w-6xl mx-auto">
                  <CardHeader className="text-center pb-6 bg-gradient-to-b from-blue-50 to-transparent">
                    <CardTitle className="flex items-center justify-center space-x-4 text-3xl mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-blue-600/30 rounded-2xl flex items-center justify-center">
                        <Key className="w-7 h-7 text-blue-600" />
                      </div>
                      <span>API Documentation</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 space-y-6">
                    <div className="bg-muted/50 rounded-lg p-6">
                      <h3 className="text-xl font-semibold mb-4">Berichte hinzufügen</h3>
                      <p className="text-muted-foreground mb-4">
                        Endpoint zum automatischen Hinzufügen von Berichten für Benutzer:
                      </p>
                      <div className="bg-black rounded-lg p-4 font-mono text-sm text-green-400 overflow-x-auto">
                        POST https://kcahfnjgcwgntwkwypvx.supabase.co/functions/v1/add-report
                      </div>
                      
                      <h4 className="font-semibold mt-6 mb-2">Payload:</h4>
                      <div className="bg-black rounded-lg p-4 font-mono text-sm text-green-400 overflow-x-auto">
                        {JSON.stringify({
                          api_key: "user-api-key-uuid",
                          title: "Arbeitsnachweis März 2024",
                          download_url: "https://example.com/report.pdf",
                          file_type: "PDF"
                        }, null, 2)}
                      </div>

                      <h4 className="font-semibold mt-6 mb-2">Beispiel cURL:</h4>
                      <div className="bg-black rounded-lg p-4 font-mono text-sm text-green-400 overflow-x-auto">
                        {`curl -X POST https://kcahfnjgcwgntwkwypvx.supabase.co/functions/v1/add-report \\
  -H "Content-Type: application/json" \\
  -d '{
    "api_key": "user-api-key-uuid",
    "title": "Arbeitsnachweis März 2024", 
    "download_url": "https://example.com/report.pdf",
    "file_type": "PDF"
  }'`}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Webhook URL Management */}
                <Card className="card-modern max-w-6xl mx-auto">
                  <CardHeader className="text-center pb-6 bg-gradient-to-b from-purple-50 to-transparent">
                    <CardTitle className="flex items-center justify-center space-x-4 text-3xl mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-purple-600/30 rounded-2xl flex items-center justify-center">
                        <Settings className="w-7 h-7 text-purple-600" />
                      </div>
                      <span>Webhook Einstellungen</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 space-y-6">
                    <div className="bg-muted/50 rounded-lg p-6">
                      <h3 className="text-xl font-semibold mb-4">Webhook URL</h3>
                      <p className="text-muted-foreground mb-4">
                        Diese URL wird für die Verarbeitung der Arbeitsstundennachweise verwendet:
                      </p>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                          <Input
                            value={webhookUrl}
                            onChange={(e) => setWebhookUrl(e.target.value)}
                            placeholder="https://example.com/webhook"
                            className="font-mono text-sm"
                          />
                          <Button
                            onClick={() => {
                              toast({
                                title: "Webhook URL gespeichert",
                                description: "Die neue Webhook URL wird für alle Uploads verwendet.",
                              });
                            }}
                            variant="outline"
                          >
                            <Settings className="w-4 h-4 mr-2" />
                            Speichern
                          </Button>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <p>Diese URL wird für alle Benutzer-Uploads verwendet. Stellen Sie sicher, dass der Endpoint die POST-Anfragen korrekt verarbeitet.</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          )}
          
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
                          {subscription.subscription_tier || 'Standard'} Plan
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