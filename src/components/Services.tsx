import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Services = () => {
  const services = [
    {
      title: "Web-Entwicklung",
      description: "Moderne, responsive Websites und Webanwendungen mit neuesten Technologien.",
      features: ["React & TypeScript", "Responsive Design", "SEO-Optimierung", "Performance-Tuning"]
    },
    {
      title: "UI/UX Design", 
      description: "Benutzerfreundliche Interfaces mit professionellem, minimalistischem Design.",
      features: ["User Research", "Wireframing", "Prototyping", "Design Systems"]
    },
    {
      title: "E-Commerce",
      description: "Vollständige Online-Shop-Lösungen für erfolgreichen Online-Handel.",
      features: ["Shop-Systeme", "Payment-Integration", "Inventory Management", "Analytics"]
    },
    {
      title: "Beratung",
      description: "Strategische Beratung für digitale Transformation und Optimierung.",
      features: ["Technologie-Beratung", "Performance-Audit", "Schulungen", "Support"]
    }
  ];

  return (
    <section id="services" className="py-20 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Unsere Services
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Professionelle Lösungen für alle Ihre digitalen Anforderungen. 
            Von der Konzeption bis zur Umsetzung.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="card-elegant p-6 h-full flex flex-col">
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
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="flex-1">
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <Button 
                variant="outline" 
                className="w-full border-border text-foreground hover:bg-secondary transition-all duration-200"
              >
                Mehr erfahren
              </Button>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <Card className="card-elegant p-8 md:p-12 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Bereit für Ihr nächstes Projekt?
            </h3>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Lassen Sie uns gemeinsam Ihre digitale Vision verwirklichen. 
              Kontaktieren Sie uns für ein unverbindliches Beratungsgespräch.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-primary hover:bg-primary-hover text-primary-foreground font-medium px-8 shadow-card hover:shadow-hover transition-all duration-200"
              >
                Kostenlose Beratung
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-border text-foreground hover:bg-secondary font-medium px-8 shadow-subtle hover:shadow-card transition-all duration-200"
              >
                Portfolio ansehen
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Services;