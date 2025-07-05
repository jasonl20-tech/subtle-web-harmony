import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Pricing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20 lg:py-32">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Preise
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Wählen Sie das passende Paket für Ihre Bedürfnisse.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="p-8 text-center">
              <h3 className="text-xl font-semibold mb-4">Basic</h3>
              <div className="text-3xl font-bold text-primary mb-4">9,99€</div>
              <p className="text-muted-foreground mb-6">pro Monat</p>
              <ul className="space-y-2 mb-8 text-left">
                <li>✓ 10 Nachweise pro Monat</li>
                <li>✓ Grundfunktionen</li>
                <li>✓ E-Mail Support</li>
              </ul>
              <Button className="w-full">Auswählen</Button>
            </Card>
            
            <Card className="p-8 text-center border-primary border-2">
              <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm mb-4">Beliebt</div>
              <h3 className="text-xl font-semibold mb-4">Pro</h3>
              <div className="text-3xl font-bold text-primary mb-4">19,99€</div>
              <p className="text-muted-foreground mb-6">pro Monat</p>
              <ul className="space-y-2 mb-8 text-left">
                <li>✓ Unbegrenzte Nachweise</li>
                <li>✓ Alle Funktionen</li>
                <li>✓ Priority Support</li>
                <li>✓ Team-Management</li>
              </ul>
              <Button className="w-full">Auswählen</Button>
            </Card>
            
            <Card className="p-8 text-center">
              <h3 className="text-xl font-semibold mb-4">Enterprise</h3>
              <div className="text-3xl font-bold text-primary mb-4">49,99€</div>
              <p className="text-muted-foreground mb-6">pro Monat</p>
              <ul className="space-y-2 mb-8 text-left">
                <li>✓ Alle Pro Funktionen</li>
                <li>✓ API Zugang</li>
                <li>✓ Custom Branding</li>
                <li>✓ Dedicated Support</li>
              </ul>
              <Button className="w-full">Kontakt</Button>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;