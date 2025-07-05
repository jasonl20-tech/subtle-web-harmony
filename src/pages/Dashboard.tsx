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
import { Upload, FileText, LogOut, Plus, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Dashboard = () => {
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [stundenplanFile, setStundenplanFile] = useState<File | null>(null);
  const [gesamtstundenFile, setGesamtstundenFile] = useState<File | null>(null);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedBundesland, setSelectedBundesland] = useState('');
  const [rules, setRules] = useState(['']);

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

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      
      // Add form fields
      formData.append('month', selectedMonth);
      formData.append('year', selectedYear);
      formData.append('bundesland', selectedBundesland);
      formData.append('rules', JSON.stringify(rules.filter(rule => rule.trim())));
      
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
    const { error } = await signOut();
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

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-6 py-8">
        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="upload" className="flex items-center space-x-2">
              <Upload className="w-4 h-4" />
              <span>Upload</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Berichte</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="mt-8">
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Upload className="w-5 h-5" />
                  <span>Dateien hochladen</span>
                </CardTitle>
                <CardDescription>
                  Laden Sie Ihre Stundendaten hoch und lassen Sie sie automatisch verarbeiten
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Upload Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Stundenplan Upload */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-base font-medium">Stundenplan</Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => downloadTemplate('stundenplan')}
                      >
                        Download Template
                      </Button>
                    </div>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center">
                      <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground mb-2">Stundenplan hier ablegen</p>
                      <Input
                        type="file"
                        accept=".xlsx,.xls,.csv"
                        onChange={(e) => setStundenplanFile(e.target.files?.[0] || null)}
                        className="text-sm"
                      />
                    </div>
                  </div>

                  {/* Gesamtstundenübersicht Upload */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-base font-medium">Gesamtstundenübersicht</Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => downloadTemplate('gesamtstunden')}
                      >
                        Download Template
                      </Button>
                    </div>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center">
                      <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground mb-2">Gesamtstunden hier ablegen</p>
                      <Input
                        type="file"
                        accept=".xlsx,.xls,.csv"
                        onChange={(e) => setGesamtstundenFile(e.target.files?.[0] || null)}
                        className="text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Month and Year Selection */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Monat</Label>
                    <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                      <SelectTrigger>
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
                  <div className="space-y-2">
                    <Label>Jahr</Label>
                    <Select value={selectedYear} onValueChange={setSelectedYear}>
                      <SelectTrigger>
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
                </div>

                {/* Bundesland Selection */}
                <div className="space-y-2">
                  <Label>Bundesland</Label>
                  <Select value={selectedBundesland} onValueChange={setSelectedBundesland}>
                    <SelectTrigger>
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

                {/* Rules Section */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-medium">Regeln</Label>
                    {rules.length < 10 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addRule}
                        className="flex items-center space-x-1"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Regel hinzufügen</span>
                      </Button>
                    )}
                  </div>
                  {rules.map((rule, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        value={rule}
                        onChange={(e) => updateRule(index, e.target.value)}
                        placeholder="z.B: Die Nachtschicht am Wochenende geht von 6 bis 12 Uhr"
                        className="flex-1"
                      />
                      {rules.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeRule(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="text-sm text-muted-foreground">
                  <p className="font-medium mb-2">Unterstützte Dateiformate:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Excel-Dateien (.xlsx, .xls)</li>
                    <li>CSV-Dateien (.csv)</li>
                  </ul>
                </div>

                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handleSubmit}
                  disabled={!selectedMonth || !selectedYear || !selectedBundesland}
                >
                  Daten verarbeiten
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="mt-8">
            <Card className="max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5" />
                  <span>Berichte</span>
                </CardTitle>
                <CardDescription>
                  Übersicht über Ihre verarbeiteten Arbeitsstundennachweise
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Keine Berichte vorhanden</h3>
                  <p className="text-muted-foreground">
                    Laden Sie zuerst Ihre Stundendaten hoch, um Berichte zu erstellen.
                  </p>
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