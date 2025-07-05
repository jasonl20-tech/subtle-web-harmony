import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";

const Tutorial = () => {
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
            <linearGradient id="tutorialGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="25%" stopColor="#8B5CF6" />
              <stop offset="50%" stopColor="#EC4899" />
              <stop offset="75%" stopColor="#F97316" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
          </defs>
          <path
            d="M-100,0 L1500,0 L1500,80 Q1100,60 900,140 Q700,220 500,180 Q350,140 150,420 Q50,440 -100,460 Z"
            fill="url(#tutorialGradient)"
            opacity="0.12"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; -15,5; 0,0; 25,-8; 0,0"
              dur="10s"
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
                <span className="text-gray-900">Tutorial - </span>
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  So funktioniert's
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Lernen Sie in nur 3 einfachen Schritten, wie Sie automatisierte Arbeitsstundennachweise erstellen und dabei Zeit sparen.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <Card className="p-8 text-center bg-white/80 backdrop-blur-sm border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-3xl">📁</span>
                </div>
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">1</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Dateien hochladen</h3>
                <p className="text-gray-600 text-lg leading-relaxed">Laden Sie Ihre Gesamtstunden und Stundenübersicht als Excel- oder CSV-Datei hoch. Unser System unterstützt alle gängigen Formate.</p>
              </Card>
            </div>
            
            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <Card className="p-8 text-center bg-white/80 backdrop-blur-sm border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-3xl">⏱️</span>
                </div>
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">2</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">KI-Verarbeitung</h3>
                <p className="text-gray-600 text-lg leading-relaxed">Warten Sie nur 5 Minuten, während unsere KI Ihre Daten analysiert und einen professionellen Nachweis erstellt - vollautomatisch.</p>
              </Card>
            </div>
            
            <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <Card className="p-8 text-center bg-white/80 backdrop-blur-sm border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-3xl">⬇️</span>
                </div>
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">3</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Nachweis herunterladen</h3>
                <p className="text-gray-600 text-lg leading-relaxed">Laden Sie Ihren fertigen, gesetzeskonformen Arbeitsstundennachweis herunter - bereit für die Übermittlung an Behörden.</p>
              </Card>
            </div>
          </div>

          {/* Additional Tips Section */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Card className="p-8 md:p-12 bg-gradient-to-r from-blue-50/80 to-purple-50/80 backdrop-blur-sm border border-gray-100 shadow-lg max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-2xl">💡</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                  Hilfreiche Tipps für optimale Ergebnisse
                </h3>
                <div className="grid md:grid-cols-2 gap-6 text-left">
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-600">Stellen Sie sicher, dass Ihre Dateien vollständig und korrekt ausgefüllt sind</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-600">Verwenden Sie konsistente Datumsformate in Ihren Tabellen</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-600">Prüfen Sie Ihre E-Mails für Benachrichtigungen über den Verarbeitungsstatus</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-600">Bei Fragen steht unser Support-Team jederzeit zur Verfügung</p>
                    </div>
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

export default Tutorial;