import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Upload, FileText, LogOut, Plus, X, Download, Calendar, MapPin } from 'lucide-react';
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
    // Create a simple CSV template
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

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      
      // Add form fields
      formData.append('month', selectedMonth);
      formData.append('year', selectedYear);
      formData.append('bundesland', selectedBundesland);
      formData.append('rules', JSON.stringify(rules.filter(rule => rule.trim())));
      formData.append('api_key', userApiKey);
      
      // Add files
      if (stundenplanFile) {
        formData.append('stundenplan', stundenplanFile);
      }
      if (gesamtstundenFile) {
        formData.append('gesamtstunden', gesamtstundenFile);
      }

      const response = await fetch('https://xlk.ai/webhook-test/325480de-a076-41e7-8d11-3bb1edb8f668', {
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

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
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
                Premium-Mitgliedschaft erforderlich
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Um das Dashboard und alle Funktionen nutzen zu können, benötigen Sie eine aktive Premium-Mitgliedschaft.
              </p>
              <div className="space-y-4">
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
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
            Willkommen zurück!
          </h1>
          <p className="text-muted-foreground text-lg">
            Verwalten Sie Ihre Arbeitsstundennachweise einfach und effizient
          </p>
        </div>

        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto mb-8 bg-card/50 backdrop-blur-sm">
            <TabsTrigger value="upload" className="flex items-center space-x-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Upload className="w-4 h-4" />
              <span className="hidden sm:inline">Upload</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center space-x-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Berichte</span>
            </TabsTrigger>
            <TabsTrigger value="subscription" className="flex items-center space-x-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Abonnement</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="mt-8">
            <Card className="max-w-4xl mx-auto shadow-lg border-0 bg-card/50 backdrop-blur-sm">
              <CardHeader className="text-center pb-8">
                <CardTitle className="flex items-center justify-center space-x-3 text-2xl">
                  <Upload className="w-6 h-6 text-primary" />
                  <span>Dateien hochladen</span>
                </CardTitle>
                <CardDescription className="text-lg mt-2">
                  Laden Sie Ihre Stundendaten hoch und lassen Sie sie automatisch verarbeiten
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Upload Sections */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Stundenplan Upload */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-lg font-semibold flex items-center space-x-2">
                        <Calendar className="w-5 h-5 text-primary" />
                        <span>Stundenplan</span>
                      </Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => downloadTemplate('stundenplan')}
                        className="flex items-center space-x-2"
                      >
                        <Download className="w-4 h-4" />
                        <span>Template</span>
                      </Button>
                    </div>
                    <div className="border-2 border-dashed border-primary/20 hover:border-primary/40 transition-colors rounded-xl p-6 text-center bg-gradient-to-b from-card to-card/50">
                      <Upload className="w-12 h-12 mx-auto text-primary mb-3" />
                      <p className="text-sm text-muted-foreground mb-3">Stundenplan hier ablegen oder durchsuchen</p>
                      <Input
                        type="file"
                        accept=".xlsx,.xls,.csv"
                        onChange={(e) => setStundenplanFile(e.target.files?.[0] || null)}
                        className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                      />
                      {stundenplanFile && (
                        <p className="text-sm text-primary mt-2">✓ {stundenplanFile.name}</p>
                      )}
                    </div>
                  </div>

                  {/* Gesamtstundenübersicht Upload */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-lg font-semibold flex items-center space-x-2">
                        <FileText className="w-5 h-5 text-primary" />
                        <span>Gesamtstundenübersicht</span>
                      </Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => downloadTemplate('gesamtstunden')}
                        className="flex items-center space-x-2"
                      >
                        <Download className="w-4 h-4" />
                        <span>Template</span>
                      </Button>
                    </div>
                    <div className="border-2 border-dashed border-primary/20 hover:border-primary/40 transition-colors rounded-xl p-6 text-center bg-gradient-to-b from-card to-card/50">
                      <Upload className="w-12 h-12 mx-auto text-primary mb-3" />
                      <p className="text-sm text-muted-foreground mb-3">Gesamtstunden hier ablegen oder durchsuchen</p>
                      <Input
                        type="file"
                        accept=".xlsx,.xls,.csv"
                        onChange={(e) => setGesamtstundenFile(e.target.files?.[0] || null)}
                        className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                      />
                      {gesamtstundenFile && (
                        <p className="text-sm text-primary mt-2">✓ {gesamtstundenFile.name}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Month, Year and Bundesland Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <Label className="text-base font-medium flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>Monat</span>
                    </Label>
                    <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                      <SelectTrigger className="h-12 bg-card/50">
                        <SelectValue placeholder="Monat auswählen" />
                      </SelectTrigger>
                      <SelectContent>
                        {months.map((month) => (
                          <SelectItem key={month.value} value={month.value}>
                            {month.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-base font-medium flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>Jahr</span>
                    </Label>
                    <Select value={selectedYear} onValueChange={setSelectedYear}>
                      <SelectTrigger className="h-12 bg-card/50">
                        <SelectValue placeholder="Jahr auswählen" />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map((year) => (
                          <SelectItem key={year.value} value={year.value}>
                            {year.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-3 sm:col-span-2 lg:col-span-1">
                    <Label className="text-base font-medium flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>Bundesland</span>
                    </Label>
                    <Select value={selectedBundesland} onValueChange={setSelectedBundesland}>
                      <SelectTrigger className="h-12 bg-card/50">
                        <SelectValue placeholder="Bundesland auswählen" />
                      </SelectTrigger>
                      <SelectContent>
                        {bundeslaender.map((land) => (
                          <SelectItem key={land} value={land}>
                            {land}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Rules Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-lg font-semibold">Regeln & Besonderheiten</Label>
                    {rules.length < 10 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addRule}
                        className="flex items-center space-x-2 hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Regel hinzufügen</span>
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
                          className="pr-12 h-12 bg-card/50 border-primary/20 focus:border-primary"
                        />
                        {rules.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeRule(index)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-destructive hover:text-destructive-foreground"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-muted/30 rounded-xl p-6">
                  <p className="font-semibold mb-3 text-base">Unterstützte Dateiformate:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Excel-Dateien (.xlsx, .xls)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>CSV-Dateien (.csv)</span>
                    </div>
                  </div>
                </div>

                <Button 
                  className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-200" 
                  onClick={handleSubmit}
                  disabled={!selectedMonth || !selectedYear || !selectedBundesland || (!stundenplanFile && !gesamtstundenFile)}
                >
                  <Upload className="w-5 h-5 mr-2" />
                  Daten verarbeiten
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="mt-8">
            <Card className="max-w-6xl mx-auto shadow-lg border-0 bg-card/50 backdrop-blur-sm">
              <CardHeader className="text-center pb-8">
                <CardTitle className="flex items-center justify-center space-x-3 text-2xl">
                  <FileText className="w-6 h-6 text-primary" />
                  <span>Berichte</span>
                </CardTitle>
                <CardDescription className="text-lg mt-2">
                  Übersicht über Ihre verarbeiteten Arbeitsstundennachweise
                </CardDescription>
              </CardHeader>
              <CardContent>
                {reports.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reports.map((report) => (
                      <Card key={report.id} className="bg-gradient-to-br from-card to-card/50 hover:shadow-lg transition-shadow duration-200">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                <FileText className="w-5 h-5 text-primary" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-foreground line-clamp-1">{report.title}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(report.created_at).toLocaleDateString('de-DE')}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">
                              {report.file_type || 'Bericht'}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => window.open(report.download_url, '_blank')}
                              className="flex items-center space-x-2"
                            >
                              <Download className="w-4 h-4" />
                              <span>Download</span>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="w-24 h-24 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-6">
                      <FileText className="w-12 h-12 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Keine Berichte vorhanden</h3>
                    <p className="text-muted-foreground text-lg mb-6">
                      Laden Sie zuerst Ihre Stundendaten hoch, um Berichte zu erstellen.
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        const uploadTab = document.querySelector('[value="upload"]') as HTMLElement;
                        uploadTab?.click();
                      }}
                      className="px-6"
                    >
                      Zum Upload
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="subscription" className="mt-8">
            <Card className="max-w-4xl mx-auto shadow-lg border-0 bg-card/50 backdrop-blur-sm">
              <CardHeader className="text-center pb-8">
                <CardTitle className="flex items-center justify-center space-x-3 text-2xl">
                  <Calendar className="w-6 h-6 text-primary" />
                  <span>Mein Abonnement</span>
                </CardTitle>
                <CardDescription className="text-lg mt-2">
                  Verwalten Sie Ihr Abonnement und Zahlungseinstellungen
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Current Subscription Status */}
                <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-6 border border-primary/20">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">Aktives Abonnement</h3>
                      <p className="text-muted-foreground">
                        {subscription.subscription_tier} Plan
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium">
                        ✓ Aktiv
                      </div>
                    </div>
                  </div>
                  
                  {subscription.subscription_end && (
                    <div className="text-sm text-muted-foreground">
                      <p>Nächste Abrechnung: {new Date(subscription.subscription_end).toLocaleDateString('de-DE', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</p>
                    </div>
                  )}
                </div>

                {/* Management Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-gradient-to-br from-card to-card/50">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Zahlungseinstellungen</h3>
                          <p className="text-sm text-muted-foreground">Zahlungsmethode & Rechnungen</p>
                        </div>
                      </div>
                      <Button 
                        className="w-full" 
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

                  <Card className="bg-gradient-to-br from-card to-card/50">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Download className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Subscription Status</h3>
                          <p className="text-sm text-muted-foreground">Status aktualisieren</p>
                        </div>
                      </div>
                      <Button 
                        className="w-full" 
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
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;