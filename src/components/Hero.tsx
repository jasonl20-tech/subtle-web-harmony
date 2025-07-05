import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Hero = () => {
  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Professionelle Web-Lösungen
            <span className="block text-primary mt-2">für Ihr Unternehmen</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-3xl mx-auto">
            Wir entwickeln moderne, elegante Webanwendungen mit klarem Design 
            und perfekter Benutzererfahrung. Minimalistisch, funktional, professionell.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary-hover text-primary-foreground font-medium px-8 py-4 text-lg shadow-card hover:shadow-hover transition-all duration-200"
            >
              Projekt starten
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-border text-foreground hover:bg-secondary font-medium px-8 py-4 text-lg shadow-subtle hover:shadow-card transition-all duration-200"
            >
              Portfolio ansehen
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <Card className="card-elegant p-8 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <div className="w-6 h-6 bg-primary rounded"></div>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Clean Design</h3>
              <p className="text-muted-foreground leading-relaxed">
                Minimalistisches, elegantes Design mit großzügigem Weißraum und klaren Linien.
              </p>
            </Card>

            <Card className="card-elegant p-8 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <div className="w-6 h-6 bg-primary rounded-full"></div>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Responsive</h3>
              <p className="text-muted-foreground leading-relaxed">
                Perfekte Darstellung auf allen Geräten - vom Smartphone bis zum Desktop.
              </p>
            </Card>

            <Card className="card-elegant p-8 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <div className="w-6 h-6 bg-primary rounded-lg transform rotate-45"></div>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Performance</h3>
              <p className="text-muted-foreground leading-relaxed">
                Schnelle Ladezeiten und optimierte Performance für beste Nutzererfahrung.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;