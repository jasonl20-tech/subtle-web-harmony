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
    <section className="relative min-h-screen overflow-hidden bg-white">
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
              <stop offset="0%" stopColor="#F97316" />
              <stop offset="25%" stopColor="#3B82F6" />
              <stop offset="50%" stopColor="#8B5CF6" />
              <stop offset="75%" stopColor="#EC4899" />
              <stop offset="100%" stopColor="#F97316" />
            </linearGradient>
          </defs>
          <path
            d="M-100,0 L1500,0 L1500,100 Q1050,140 850,110 Q650,80 450,160 Q300,240 100,360 Q0,380 -100,400 Z"
            fill="url(#contactGradient)"
            opacity="0.12"
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

      <main className="relative z-10 py-24 lg:py-32">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-20">
            <div className="animate-fade-in-up">
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-8">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Kontakt
                </span>
                <span className="text-gray-900">
                  {" "}aufnehmen
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Haben Sie Fragen zu unseren automatisierten Arbeitsstundennachweisen? Wir sind für Sie da und helfen gerne weiter.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <Card className="p-8 bg-white/80 backdrop-blur-sm border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                <div className="flex items-start space-x-4 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xl">📞</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Kontaktinformationen</h3>
                    <p className="text-gray-600 text-lg">Erreichen Sie uns direkt über die folgenden Kanäle</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 text-sm">✉</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">E-Mail</h4>
                      <a 
                        href="mailto:info@arbeitsstundennachweis.com"
                        className="text-gray-600 hover:text-blue-600 transition-colors duration-200 hover:underline"
                      >
                        info@arbeitsstundennachweis.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 text-sm">📞</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Telefon</h4>
                      <a 
                        href="tel:+4915147918371"
                        className="text-gray-600 hover:text-blue-600 transition-colors duration-200 hover:underline"
                      >
                        + 49 (0) 151 47918371
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-600 text-sm">📍</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Adresse</h4>
                      <div className="text-gray-600">
                        67292 Kirchheimbolanden<br />
                        Schlossplatz 1
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-orange-600 text-sm">🕐</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Geschäftszeiten</h4>
                      <div className="text-gray-600">
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
              <Card className="p-8 bg-white/80 backdrop-blur-sm border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                <div className="flex items-start space-x-4 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xl">📝</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Nachricht senden</h3>
                    <p className="text-gray-600 text-lg">Schreiben Sie uns direkt eine Nachricht</p>
                  </div>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Ihr Name
                    </label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Max Mustermann" 
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm transition-all duration-200"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      E-Mail-Adresse
                    </label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="max@beispiel.de" 
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm transition-all duration-200"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Ihre Nachricht
                    </label>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Beschreiben Sie hier Ihr Anliegen..." 
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm transition-all duration-200 resize-vertical"
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    Nachricht senden
                  </Button>
                </form>
              </Card>
            </div>
          </div>

          {/* Additional Info */}
          <div className="animate-fade-in-up mt-20" style={{ animationDelay: '0.3s' }}>
            <Card className="p-8 md:p-12 bg-gradient-to-r from-blue-50/80 to-purple-50/80 backdrop-blur-sm border border-gray-100 shadow-lg max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-2xl">🚀</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                  Schnelle Antwortzeiten garantiert
                </h3>
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div className="space-y-2">
                    <div className="text-2xl font-bold text-blue-600">&lt; 2h</div>
                    <p className="text-gray-600">E-Mail-Antworten während Geschäftszeiten</p>
                  </div>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold text-purple-600">24/7</div>
                    <p className="text-gray-600">Automatisierte Nachweiserstellung</p>
                  </div>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold text-green-600">DSGVO</div>
                    <p className="text-gray-600">Vollständig datenschutzkonform</p>
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