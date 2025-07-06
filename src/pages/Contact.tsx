import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-background">
      <Header />
      
      {/* Animated Curved Rainbow Gradient Background */}
      <div className="absolute top-0 left-0 right-0 h-full z-0">
        <svg
          className="absolute top-0 left-0 w-full h-full"
          viewBox="0 0 1400 800"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="contactGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="25%" stopColor="hsl(var(--primary-hover))" />
              <stop offset="50%" stopColor="hsl(var(--accent))" />
              <stop offset="75%" stopColor="hsl(var(--primary))" />
              <stop offset="100%" stopColor="hsl(var(--primary-hover))" />
            </linearGradient>
          </defs>
          <path
            d="M-100,0 L1500,0 L1500,100 Q1050,140 850,110 Q650,80 450,160 Q300,240 100,360 Q0,380 -100,400 Z"
            fill="url(#contactGradient)"
            opacity="0.08"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; 30,15; 0,0; -10,-5; 0,0"
              dur="12s"
              repeatCount="indefinite"
            />
          </path>
        </svg>
      </div>

      <main className="relative z-10 py-16 sm:py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16 lg:mb-20">
            <div className="animate-fade-in-up">
              <h1 className="text-responsive-xl font-bold leading-tight mb-6 sm:mb-8">
                <span className="bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">
                  Kontakt
                </span>
                <span className="text-foreground">
                  {" "}aufnehmen
                </span>
              </h1>
              <p className="text-responsive-md text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Haben Sie Fragen zu unseren automatisierten Arbeitsstundennachweisen? Wir sind für Sie da und helfen gerne weiter.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <Card className="card-modern p-6 sm:p-8 h-full">
                <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 mb-6 sm:mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-primary-hover rounded-xl flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0">
                    <span className="text-primary-foreground text-xl">📞</span>
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2 sm:mb-4">Kontaktinformationen</h3>
                    <p className="text-muted-foreground text-base sm:text-lg">Erreichen Sie uns direkt über die folgenden Kanäle</p>
                  </div>
                </div>
                
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-start space-y-2 sm:space-y-0 sm:space-x-4">
                    <div className="w-8 h-8 bg-primary-light rounded-lg flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0">
                      <span className="text-primary text-sm">✉</span>
                    </div>
                    <div className="text-center sm:text-left">
                      <h4 className="font-semibold text-foreground mb-1">E-Mail</h4>
                      <a 
                        href="mailto:info@arbeitsstundennachweis.com"
                        className="text-muted-foreground hover:text-primary transition-colors duration-200 hover:underline break-all"
                      >
                        info@arbeitsstundennachweis.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-start space-y-2 sm:space-y-0 sm:space-x-4">
                    <div className="w-8 h-8 bg-accent-light rounded-lg flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0">
                      <span className="text-accent text-sm">📞</span>
                    </div>
                    <div className="text-center sm:text-left">
                      <h4 className="font-semibold text-foreground mb-1">Telefon</h4>
                      <a 
                        href="tel:+4915147918371"
                        className="text-muted-foreground hover:text-primary transition-colors duration-200 hover:underline"
                      >
                        + 49 (0) 151 47918371
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-start space-y-2 sm:space-y-0 sm:space-x-4">
                    <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0">
                      <span className="text-primary text-sm">📍</span>
                    </div>
                    <div className="text-center sm:text-left">
                      <h4 className="font-semibold text-foreground mb-1">Adresse</h4>
                      <div className="text-muted-foreground">
                        67292 Kirchheimbolanden<br />
                        Schlossplatz 1
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-start space-y-2 sm:space-y-0 sm:space-x-4">
                    <div className="w-8 h-8 bg-warning/20 rounded-lg flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0">
                      <span className="text-warning text-sm">🕐</span>
                    </div>
                    <div className="text-center sm:text-left">
                      <h4 className="font-semibold text-foreground mb-1">Geschäftszeiten</h4>
                      <div className="text-muted-foreground">
                        Mo-Fr: 9:00 - 18:00 Uhr<br />
                        Sa-So: Nach Vereinbarung
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            
            {/* Contact Form */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <Card className="card-modern p-6 sm:p-8 h-full">
                <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 mb-6 sm:mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-accent to-accent/80 rounded-xl flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0">
                    <span className="text-accent-foreground text-xl">📝</span>
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2 sm:mb-4">Nachricht senden</h3>
                    <p className="text-muted-foreground text-base sm:text-lg">Schreiben Sie uns direkt eine Nachricht</p>
                  </div>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Ihr Name
                    </label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Max Mustermann" 
                      className="w-full px-4 py-3 border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background shadow-sm transition-all duration-200"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      E-Mail-Adresse
                    </label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="max@beispiel.de" 
                      className="w-full px-4 py-3 border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background shadow-sm transition-all duration-200"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Ihre Nachricht
                    </label>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Beschreiben Sie hier Ihr Anliegen..." 
                      rows={5}
                      className="w-full px-4 py-3 border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background shadow-sm transition-all duration-200 resize-vertical"
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit"
                    className="btn-gradient w-full py-3 sm:py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl"
                  >
                    Nachricht senden
                  </Button>
                </form>
              </Card>
            </div>
          </div>

          {/* Additional Info */}
          <div className="animate-fade-in-up mt-12 sm:mt-16 lg:mt-20" style={{ animationDelay: '0.3s' }}>
            <Card className="card-modern p-6 sm:p-8 lg:p-12 bg-gradient-to-r from-primary-light/50 to-secondary/30 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary-hover rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-primary-foreground text-2xl">🚀</span>
                </div>
                <h3 className="text-responsive-lg font-bold text-foreground mb-6">
                  Schnelle Antwortzeiten garantiert
                </h3>
                <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 text-center">
                  <div className="space-y-2 p-4 bg-background/50 rounded-xl">
                    <div className="text-xl sm:text-2xl font-bold text-primary">&lt; 2h</div>
                    <p className="text-muted-foreground text-sm sm:text-base">E-Mail-Antworten während Geschäftszeiten</p>
                  </div>
                  <div className="space-y-2 p-4 bg-background/50 rounded-xl">
                    <div className="text-xl sm:text-2xl font-bold text-primary">24/7</div>
                    <p className="text-muted-foreground text-sm sm:text-base">Automatisierte Nachweiserstellung</p>
                  </div>
                  <div className="space-y-2 p-4 bg-background/50 rounded-xl">
                    <div className="text-xl sm:text-2xl font-bold text-accent">DSGVO</div>
                    <p className="text-muted-foreground text-sm sm:text-base">Vollständig datenschutzkonform</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </section>
  );
};

export default Contact;