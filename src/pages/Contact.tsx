import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20 lg:py-32">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Kontakt
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Haben Sie Fragen? Wir sind für Sie da!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-8">
              <h3 className="text-xl font-semibold mb-6">Kontaktinformationen</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">E-Mail</h4>
                  <p className="text-muted-foreground">support@arbeitsstundennachweise.de</p>
                </div>
                <div>
                  <h4 className="font-medium">Telefon</h4>
                  <p className="text-muted-foreground">+49 (0) 123 456 789</p>
                </div>
                <div>
                  <h4 className="font-medium">Geschäftszeiten</h4>
                  <p className="text-muted-foreground">Mo-Fr: 9:00 - 18:00 Uhr</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-8">
              <h3 className="text-xl font-semibold mb-6">Nachricht senden</h3>
              <div className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Ihr Name" 
                  className="w-full p-3 border border-border rounded-md"
                />
                <input 
                  type="email" 
                  placeholder="Ihre E-Mail" 
                  className="w-full p-3 border border-border rounded-md"
                />
                <textarea 
                  placeholder="Ihre Nachricht" 
                  rows={4}
                  className="w-full p-3 border border-border rounded-md"
                ></textarea>
                <Button className="w-full">Nachricht senden</Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;