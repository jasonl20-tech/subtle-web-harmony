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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary-light/20">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-12 text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight">
              Willkommen 
              <span className="bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent"> zurück!</span>
            </h1>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed">
              Verwalten Sie Ihre Arbeitsstundennachweise einfach und effizient
            </p>
          </div>
        </div>

        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="card-modern grid w-full grid-cols-3 max-w-3xl mx-auto mb-12 p-2 h-auto bg-card/80 backdrop-blur-sm">
            <TabsTrigger 
              value="upload" 
              className="flex items-center justify-center space-x-3 py-4 px-6 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md transition-all duration-300"
            >
              <Upload className="w-5 h-5" />
              <span className="hidden sm:inline font-medium">Upload</span>
            </TabsTrigger>
            <TabsTrigger 
              value="reports" 
              className="flex items-center justify-center space-x-3 py-4 px-6 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md transition-all duration-300"
            >
              <FileText className="w-5 h-5" />
              <span className="hidden sm:inline font-medium">Berichte</span>
            </TabsTrigger>
            <TabsTrigger 
              value="subscription" 
              className="flex items-center justify-center space-x-3 py-4 px-6 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md transition-all duration-300"
            >
              <Calendar className="w-5 h-5" />
              <span className="hidden sm:inline font-medium">Abonnement</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="mt-8">
            <div className="animate-fade-in-up">
              <Card className="card-modern max-w-6xl mx-auto">
                <CardHeader className="text-center pb-10 bg-gradient-to-b from-primary/5 to-transparent">
                  <CardTitle className="flex items-center justify-center space-x-4 text-3xl mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/30 rounded-2xl flex items-center justify-center">
                      <Upload className="w-7 h-7 text-primary" />
                    </div>
                    <span>Dateien hochladen</span>
                  </CardTitle>
                  <CardDescription className="text-lg mt-2 max-w-2xl mx-auto leading-relaxed">
                    Laden Sie Ihre Stundendaten hoch und lassen Sie sie automatisch verarbeiten
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-10 p-8">
                  {/* Upload Sections */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Stundenplan Upload */}
                    <div className="space-y-6 animate-slide-in-right" style={{ animationDelay: '0.1s' }}>
                      <div className="flex items-center justify-between">
                        <Label className="text-xl font-semibold flex items-center space-x-3">
                          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Calendar className="w-5 h-5 text-primary" />
                          </div>
                          <span>Stundenplan</span>
                        </Label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => downloadTemplate('stundenplan')}
                          className="flex items-center space-x-2 hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          <Download className="w-4 h-4" />
                          <span>Template</span>
                        </Button>
                      </div>
                      <div className="upload-area p-8 text-center">
                        <div className="mb-6">
                          <Upload className="w-14 h-14 mx-auto text-primary mb-4 animate-pulse-subtle" />
                          <p className="text-base text-muted-foreground mb-4 font-medium">Stundenplan hier ablegen oder durchsuchen</p>
                        </div>
                        <Input
                          type="file"
                          accept=".xlsx,.xls,.csv"
                          onChange={(e) => setStundenplanFile(e.target.files?.[0] || null)}
                          className="text-sm file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary-hover file:transition-colors"
                        />
                        {stundenplanFile && (
                          <div className="mt-4 p-3 bg-success/10 border border-success/20 rounded-lg">
                            <p className="text-success font-medium">✓ {stundenplanFile.name}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Gesamtstundenübersicht Upload */}
                    <div className="space-y-6 animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
                      <div className="flex items-center justify-between">
                        <Label className="text-xl font-semibold flex items-center space-x-3">
                          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                            <FileText className="w-5 h-5 text-primary" />
                          </div>
                          <span>Gesamtstundenübersicht</span>
                        </Label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => downloadTemplate('gesamtstunden')}
                          className="flex items-center space-x-2 hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          <Download className="w-4 h-4" />
                          <span>Template</span>
                        </Button>
                      </div>
                      <div className="upload-area p-8 text-center">
                        <div className="mb-6">
                          <Upload className="w-14 h-14 mx-auto text-primary mb-4 animate-pulse-subtle" />
                          <p className="text-base text-muted-foreground mb-4 font-medium">Gesamtstunden hier ablegen oder durchsuchen</p>
                        </div>
                        <Input
                          type="file"
                          accept=".xlsx,.xls,.csv"
                          onChange={(e) => setGesamtstundenFile(e.target.files?.[0] || null)}
                          className="text-sm file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary-hover file:transition-colors"
                        />
                        {gesamtstundenFile && (
                          <div className="mt-4 p-3 bg-success/10 border border-success/20 rounded-lg">
                            <p className="text-success font-medium">✓ {gesamtstundenFile.name}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Month, Year and Bundesland Selection */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                    <div className="space-y-4">
                      <Label className="text-lg font-semibold flex items-center space-x-3">
                        <div className="w-6 h-6 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Calendar className="w-4 h-4 text-primary" />
                        </div>
                        <span>Monat</span>
                      </Label>
                      <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                        <SelectTrigger className="h-14 bg-card/80 backdrop-blur-sm border-border/50 text-base rounded-xl">
                          <SelectValue placeholder="Monat auswählen" />
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
                    <div className="space-y-4">
                      <Label className="text-lg font-semibold flex items-center space-x-3">
                        <div className="w-6 h-6 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Calendar className="w-4 h-4 text-primary" />
                        </div>
                        <span>Jahr</span>
                      </Label>
                      <Select value={selectedYear} onValueChange={setSelectedYear}>
                        <SelectTrigger className="h-14 bg-card/80 backdrop-blur-sm border-border/50 text-base rounded-xl">
                          <SelectValue placeholder="Jahr auswählen" />
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
                    <div className="space-y-4 sm:col-span-2 lg:col-span-1">
                      <Label className="text-lg font-semibold flex items-center space-x-3">
                        <div className="w-6 h-6 bg-primary/10 rounded-lg flex items-center justify-center">
                          <MapPin className="w-4 h-4 text-primary" />
                        </div>
                        <span>Bundesland</span>
                      </Label>
                      <Select value={selectedBundesland} onValueChange={setSelectedBundesland}>
                        <SelectTrigger className="h-14 bg-card/80 backdrop-blur-sm border-border/50 text-base rounded-xl">
                          <SelectValue placeholder="Bundesland auswählen" />
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

                  {/* Rules Section */}
                  <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                    <div className="flex items-center justify-between">
                      <Label className="text-xl font-semibold">Regeln & Besonderheiten</Label>
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
                    <div className="space-y-4">
                      {rules.map((rule, index) => (
                        <div key={index} className="relative">
                          <Input
                            value={rule}
                            onChange={(e) => updateRule(index, e.target.value)}
                            placeholder="z.B: Die Nachtschicht am Wochenende geht von 6 bis 12 Uhr"
                            className="pr-14 h-14 bg-card/80 backdrop-blur-sm border-border/50 focus:border-primary text-base rounded-xl"
                          />
                          {rules.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeRule(index)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-destructive hover:text-destructive-foreground rounded-lg"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-muted/30 to-secondary/20 rounded-2xl p-8 backdrop-blur-sm border border-border/50 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                    <p className="font-semibold mb-4 text-lg">Unterstützte Dateiformate:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-base text-muted-foreground">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-success rounded-full animate-pulse-subtle"></div>
                        <span>Excel-Dateien (.xlsx, .xls)</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-success rounded-full animate-pulse-subtle"></div>
                        <span>CSV-Dateien (.csv)</span>
                      </div>
                    </div>
                  </div>

                  <Button 
                    className="btn-gradient w-full h-16 text-xl font-semibold text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300" 
                    onClick={handleSubmit}
                    disabled={!selectedMonth || !selectedYear || !selectedBundesland || (!stundenplanFile && !gesamtstundenFile)}
                  >
                    <Upload className="w-6 h-6 mr-3" />
                    Daten verarbeiten
                  </Button>
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
    </div>
  );
};

export default Dashboard;