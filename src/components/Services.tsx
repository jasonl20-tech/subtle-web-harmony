import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Services = () => {
  const features = [
    {
      title: "Automatische Zeiterfassung",
      description: "Keine manuellen Eingaben mehr - unsere KI erfasst Ihre Arbeitszeiten vollautomatisch.",
      features: ["KI-basierte Erkennung", "Präzise Minutenangaben", "Pausenzeiten automatisch", "Fehlerfreie Dokumentation"]
    },
    {
      title: "Excel-Integration", 
      description: "Nahtlose Integration in Ihre bestehenden Excel-Tabellen und Workflows.",
      features: ["Direkte Excel-Ausgabe", "Vorlagen verfügbar", "Kompatibel mit Office 365", "Backup-Funktion"]
    },
    {
      title: "Berichtswesen",
      description: "Professionelle Stundenberichte für Kunden, Steuerberater und interne Zwecke.",
      features: ["PDF-Export", "Anpassbare Templates", "Monats-/Wochenberichte", "Automatischer Versand"]
    },
    {
      title: "Team-Management",
      description: "Perfekt für Teams und Freiberufler - verwalten Sie alle Arbeitszeiten zentral.",
      features: ["Multi-User Support", "Projektverwaltung", "Kundenzuordnung", "Echtzeit-Übersicht"]
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

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="card-elegant p-6 h-full flex flex-col hover:shadow-lg transition-all duration-300">
              <div className="mb-4">
                <div className={`w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4`}>
                  <div className={`w-6 h-6 bg-primary ${
                    index === 0 ? 'rounded' : 
                    index === 1 ? 'rounded-full' : 
                    index === 2 ? 'rounded-lg transform rotate-45' : 
                    'rounded-sm'
                  }`}></div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              <div className="flex-1">
                <ul className="space-y-2 mb-6">
                  {feature.features.map((item, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Ihre Vorteile auf einen Blick
            </h3>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">95%</div>
              <p className="text-lg font-medium text-foreground mb-2">Weniger Fehler</p>
              <p className="text-muted-foreground">bei der Zeiterfassung</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">2h</div>
              <p className="text-lg font-medium text-foreground mb-2">Täglich gespart</p>
              <p className="text-muted-foreground">durchschnittlich pro Nutzer</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">100%</div>
              <p className="text-lg font-medium text-foreground mb-2">Automatisch</p>
              <p className="text-muted-foreground">keine manuelle Eingabe nötig</p>
            </div>
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-primary hover:bg-primary-hover text-primary-foreground font-medium px-8 shadow-card hover:shadow-hover transition-all duration-200"
              >
                30 Tage kostenlos testen
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-border text-foreground hover:bg-secondary font-medium px-8 shadow-subtle hover:shadow-card transition-all duration-200"
              >
                Live-Demo ansehen
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Services;