import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, FileText, LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

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
      <header className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                Willkommen, {user.email}
              </span>
              <Button variant="outline" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Abmelden
              </Button>
            </div>
          </div>
        </div>
      </header>

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
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Dateien hier ablegen</h3>
                  <p className="text-muted-foreground mb-4">
                    oder klicken Sie zum Auswählen
                  </p>
                  <Input
                    type="file"
                    className="max-w-sm mx-auto"
                    accept=".xlsx,.xls,.csv"
                    multiple
                  />
                </div>
                
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium mb-2">Unterstützte Dateiformate:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Excel-Dateien (.xlsx, .xls)</li>
                    <li>CSV-Dateien (.csv)</li>
                  </ul>
                </div>

                <Button className="w-full" size="lg">
                  Dateien verarbeiten
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
    </div>
  );
};

export default Dashboard;