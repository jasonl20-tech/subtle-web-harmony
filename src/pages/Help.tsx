import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";

const Help = () => {
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
            <linearGradient id="helpGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="25%" stopColor="#EC4899" />
              <stop offset="50%" stopColor="#F97316" />
              <stop offset="75%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
          <path
            d="M-100,0 L1500,0 L1500,60 Q1200,80 1000,120 Q800,160 600,140 Q400,120 200,380 Q100,400 -100,420 Z"
            fill="url(#helpGradient)"
            opacity="0.15"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; 20,-10; 0,0; -20,10; 0,0"
              dur="8s"
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
                  Hilfe
                </span>
                <span className="text-gray-900">
                  {" "}& Support
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Häufig gestellte Fragen und umfassende Hilfestellungen zu unserer Plattform für Arbeitsstundennachweise.
              </p>
            </div>
          </div>

          <div className="space-y-8 max-w-4xl mx-auto">
            <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <Card className="p-8 bg-white/80 backdrop-blur-sm border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xl">🤖</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Wie funktioniert die automatische Verarbeitung?</h3>
                    <p className="text-gray-600 text-lg leading-relaxed">Unsere KI analysiert Ihre hochgeladenen Stundendaten und erstellt automatisch einen professionellen, gesetzeskonformen Nachweis. Der Prozess dauert nur wenige Minuten und berücksichtigt alle relevanten Arbeitszeit-Regelungen.</p>
                  </div>
                </div>
              </Card>
            </div>
            
            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <Card className="p-8 bg-white/80 backdrop-blur-sm border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xl">📄</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Welche Dateiformate werden unterstützt?</h3>
                    <p className="text-gray-600 text-lg leading-relaxed">Wir unterstützen Excel-Dateien (.xlsx, .xls), CSV-Dateien und andere gängige Tabellenformate für die Stundenerfassung. Unser System erkennt automatisch das Format und verarbeitet Ihre Daten entsprechend.</p>
                  </div>
                </div>
              </Card>
            </div>
            
            <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <Card className="p-8 bg-white/80 backdrop-blur-sm border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xl">🔒</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Sind meine Daten sicher?</h3>
                    <p className="text-gray-600 text-lg leading-relaxed">Ja, alle Daten werden DSGVO-konform verarbeitet und verschlüsselt übertragen. Nach der Bearbeitung werden Ihre Daten automatisch gelöscht. Wir verwenden modernste Sicherheitsstandards zum Schutz Ihrer sensiblen Informationen.</p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <Card className="p-8 bg-white/80 backdrop-blur-sm border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xl">⏱️</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Wie lange dauert die Verarbeitung?</h3>
                    <p className="text-gray-600 text-lg leading-relaxed">Die automatische Verarbeitung Ihrer Arbeitsstunden dauert in der Regel nur 5 Minuten. Bei größeren Datenmengen kann es bis zu 10 Minuten dauern. Sie erhalten eine E-Mail-Benachrichtigung, sobald Ihr Nachweis fertig ist.</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </section>
  );
};

export default Help;