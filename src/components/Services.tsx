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
    <section id="services" className="relative py-20 lg:py-32 bg-gradient-to-b from-white via-gray-50/50 to-white overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-30">
        <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 400 400">
          <defs>
            <linearGradient id="servicesGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F3F4F6" />
              <stop offset="100%" stopColor="#E5E7EB" />
            </linearGradient>
          </defs>
          <circle cx="100" cy="100" r="50" fill="url(#servicesGradient)" opacity="0.5" />
          <circle cx="300" cy="200" r="30" fill="url(#servicesGradient)" opacity="0.3" />
          <circle cx="200" cy="300" r="40" fill="url(#servicesGradient)" opacity="0.4" />
        </svg>
      </div>
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8">
              <span className="text-gray-900">Wie wir Ihre </span>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Arbeitsstunden automatisieren
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Schluss mit manueller Zeiterfassung! Unsere intelligente Lösung erfasst automatisch Ihre Arbeitszeiten 
              und erstellt professionelle Nachweise - ohne Aufwand, ohne Fehler.
            </p>
          </div>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
          {steps.map((step, index) => (
            <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <Card className="p-8 text-center bg-white/80 backdrop-blur-sm border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group h-full">
                <div className="mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl font-bold text-white">{step.number}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </Card>
            </div>
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