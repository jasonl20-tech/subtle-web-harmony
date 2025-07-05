import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Services = () => {
  const steps = [
    {
      number: "1",
      title: "Gesamtstunden hochladen",
      description: "Laden Sie Ihre Gesamtstunden und Gesamtstundenübersicht hoch."
    },
    {
      number: "2", 
      title: "5 Minuten warten",
      description: "Unsere KI verarbeitet automatisch Ihre Daten und erstellt den Nachweis."
    },
    {
      number: "3",
      title: "Fertiges Dokument herunterladen",
      description: "Laden Sie Ihren professionellen Arbeitsstundennachweis herunter."
    }
  ];

  return (
    <section id="services" className="py-20 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Wie wir Ihre Arbeitsstunden automatisieren
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Schluss mit manueller Zeiterfassung! Unsere intelligente Lösung erfasst automatisch Ihre Arbeitszeiten 
            und erstellt professionelle Nachweise - ohne Aufwand, ohne Fehler.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <Card key={index} className="card-elegant p-8 text-center hover:shadow-lg transition-all duration-300">
              <div className="mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">{step.number}</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="mt-24">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Ihre Vorteile auf einen Blick
            </h3>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Revolutionieren Sie Ihre Zeiterfassung mit unserer innovativen Lösung
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="card-elegant p-8 text-center hover:shadow-lg transition-all duration-300 group">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">🔒</div>
              <h4 className="text-xl font-bold text-foreground mb-4">Datenschutz konform</h4>
              <p className="text-muted-foreground leading-relaxed">DSGVO-konforme Verarbeitung Ihrer sensiblen Arbeitszeitdaten</p>
            </Card>
            <Card className="card-elegant p-8 text-center hover:shadow-lg transition-all duration-300 group">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">⚡</div>
              <h4 className="text-xl font-bold text-foreground mb-4">Blitzschnell</h4>
              <p className="text-muted-foreground leading-relaxed">Fertige Nachweise in nur 5 Minuten - ohne Wartezeit</p>
            </Card>
            <Card className="card-elegant p-8 text-center hover:shadow-lg transition-all duration-300 group">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">💰</div>
              <h4 className="text-xl font-bold text-foreground mb-4">Kosteneffizient</h4>
              <p className="text-muted-foreground leading-relaxed">Sparen Sie Personalkosten - keine manuellen Prozesse mehr nötig</p>
            </Card>
            <Card className="card-elegant p-8 text-center hover:shadow-lg transition-all duration-300 group">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">🤖</div>
              <h4 className="text-xl font-bold text-foreground mb-4">Vollautomatisch</h4>
              <p className="text-muted-foreground leading-relaxed">100% automatisierte Verarbeitung ohne menschliches Eingreifen</p>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <Card className="card-elegant p-8 md:p-12 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Bereit für automatisierte Arbeitsstundennachweise?
            </h3>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Starten Sie noch heute und sparen Sie sich täglich wertvolle Zeit. 
              Testen Sie unsere Lösung 30 Tage kostenlos und unverbindlich.
            </p>
            <div className="flex justify-center">
              <Button 
                size="lg"
                className="bg-primary hover:bg-primary-hover text-primary-foreground font-medium px-12 shadow-card hover:shadow-hover transition-all duration-200"
              >
                Jetzt starten
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Services;