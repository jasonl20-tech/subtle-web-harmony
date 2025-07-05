import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";

const Help = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20 lg:py-32">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Hilfecenter
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Häufig gestellte Fragen und Hilfestellungen zu unserer Plattform.
            </p>
          </div>

          <div className="space-y-8 max-w-4xl mx-auto">
            <Card className="p-8">
              <h3 className="text-xl font-semibold mb-4">Wie funktioniert die automatische Verarbeitung?</h3>
              <p className="text-muted-foreground">Unsere KI analysiert Ihre hochgeladenen Stundendaten und erstellt automatisch einen professionellen Nachweis.</p>
            </Card>
            
            <Card className="p-8">
              <h3 className="text-xl font-semibold mb-4">Welche Dateiformate werden unterstützt?</h3>
              <p className="text-muted-foreground">Wir unterstützen Excel-Dateien (.xlsx, .xls) und CSV-Dateien für die Stundenerfassung.</p>
            </Card>
            
            <Card className="p-8">
              <h3 className="text-xl font-semibold mb-4">Ist meine Daten sicher?</h3>
              <p className="text-muted-foreground">Ja, alle Daten werden DSGVO-konform verarbeitet und nach der Bearbeitung automatisch gelöscht.</p>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Help;