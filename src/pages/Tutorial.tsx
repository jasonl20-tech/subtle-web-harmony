import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";

const Tutorial = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20 lg:py-32">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Tutorial - So funktioniert's
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Lernen Sie in wenigen Schritten, wie Sie automatisierte Arbeitsstundennachweise erstellen.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="p-8 text-center">
              <div className="text-4xl mb-4">📁</div>
              <h3 className="text-xl font-semibold mb-4">Schritt 1: Upload</h3>
              <p className="text-muted-foreground">Laden Sie Ihre Gesamtstunden und Übersicht hoch</p>
            </Card>
            
            <Card className="p-8 text-center">
              <div className="text-4xl mb-4">⏱️</div>
              <h3 className="text-xl font-semibold mb-4">Schritt 2: Verarbeitung</h3>
              <p className="text-muted-foreground">Warten Sie 5 Minuten während der automatischen Verarbeitung</p>
            </Card>
            
            <Card className="p-8 text-center">
              <div className="text-4xl mb-4">⬇️</div>
              <h3 className="text-xl font-semibold mb-4">Schritt 3: Download</h3>
              <p className="text-muted-foreground">Laden Sie Ihren fertigen Nachweis herunter</p>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Tutorial;