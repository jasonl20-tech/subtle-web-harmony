import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";

const Datenschutz = () => {
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
            <linearGradient id="datenschutzGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="25%" stopColor="#EC4899" />
              <stop offset="50%" stopColor="#F97316" />
              <stop offset="75%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
          <path
            d="M-100,0 L1500,0 L1500,60 Q1200,80 1000,120 Q800,160 600,140 Q400,120 200,380 Q100,400 -100,420 Z"
            fill="url(#datenschutzGradient)"
            opacity="0.12"
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
                  Datenschutz
                </span>
                <span className="text-gray-900">
                  erklärung
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst und halten uns strikt an die Regeln der Datenschutzgesetze.
              </p>
            </div>
          </div>

          <div className="space-y-8 max-w-5xl mx-auto">
            <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <Card className="p-8 bg-white/80 backdrop-blur-sm border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">1. Verantwortliche Stelle</h2>
                <div className="text-gray-600 text-lg leading-relaxed space-y-2">
                  <p><strong>Arbeitsstundennachweis</strong></p>
                  <p>Schlossplatz 1</p>
                  <p>67292 Kirchheimbolanden</p>
                  <p>Deutschland</p>
                  <p>E-Mail: info@arbeitsstundennachweis.com</p>
                  <p>Telefon: + 49 (0) 151 47918371</p>
                </div>
              </Card>
            </div>
            
            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <Card className="p-8 bg-white/80 backdrop-blur-sm border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">2. Erhebung und Verarbeitung personenbezogener Daten</h2>
                <div className="text-gray-600 text-lg leading-relaxed">
                  <p>Wir erheben und verarbeiten personenbezogene Daten nur, soweit dies zur Erbringung unserer Dienstleistungen erforderlich ist. Dazu gehören:</p>
                  <ul className="list-disc list-inside mt-4 space-y-2">
                    <li>Kontaktdaten (E-Mail-Adresse, Name)</li>
                    <li>Arbeitsstundendaten (zur Verarbeitung und Erstellung von Nachweisen)</li>
                    <li>Nutzungsdaten (zur Verbesserung unserer Services)</li>
                    <li>Zahlungsdaten (zur Abwicklung von Abonnements)</li>
                  </ul>
                </div>
              </Card>
            </div>
            
            <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <Card className="p-8 bg-white/80 backdrop-blur-sm border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">3. Zweck der Datenverarbeitung</h2>
                <div className="text-gray-600 text-lg leading-relaxed">
                  <p>Ihre Daten werden ausschließlich für folgende Zwecke verarbeitet:</p>
                  <ul className="list-disc list-inside mt-4 space-y-2">
                    <li>Erstellung und Bereitstellung von Arbeitsstundennachweisen</li>
                    <li>Kommunikation bezüglich unserer Dienstleistungen</li>
                    <li>Abwicklung von Zahlungen und Abonnements</li>
                    <li>Verbesserung unserer Services und Nutzerfreundlichkeit</li>
                  </ul>
                </div>
              </Card>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <Card className="p-8 bg-white/80 backdrop-blur-sm border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">4. Datensicherheit</h2>
                <div className="text-gray-600 text-lg leading-relaxed">
                  <p>Wir setzen technische und organisatorische Sicherheitsmaßnahmen ein, um Ihre Daten gegen zufällige oder vorsätzliche Manipulationen, Verlust, Zerstörung oder den Zugriff unberechtigter Personen zu schützen. Alle hochgeladenen Arbeitsstundendaten werden nach der Verarbeitung automatisch und sicher gelöscht.</p>
                </div>
              </Card>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <Card className="p-8 bg-white/80 backdrop-blur-sm border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">5. Ihre Rechte</h2>
                <div className="text-gray-600 text-lg leading-relaxed">
                  <p>Sie haben das Recht auf:</p>
                  <ul className="list-disc list-inside mt-4 space-y-2">
                    <li>Auskunft über die zu Ihrer Person gespeicherten Daten</li>
                    <li>Berichtigung unrichtiger Daten</li>
                    <li>Löschung Ihrer Daten</li>
                    <li>Einschränkung der Datenverarbeitung</li>
                    <li>Datenübertragbarkeit</li>
                    <li>Widerspruch gegen die Datenverarbeitung</li>
                  </ul>
                  <p className="mt-4">Zur Ausübung Ihrer Rechte wenden Sie sich bitte an: info@arbeitsstundennachweis.com</p>
                </div>
              </Card>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <Card className="p-8 bg-white/80 backdrop-blur-sm border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">6. Kontakt</h2>
                <div className="text-gray-600 text-lg leading-relaxed">
                  <p>Bei Fragen zum Datenschutz können Sie sich jederzeit an uns wenden:</p>
                  <div className="mt-4 space-y-2">
                    <p>E-Mail: info@arbeitsstundennachweis.com</p>
                    <p>Telefon: + 49 (0) 151 47918371</p>
                    <p>Adresse: Schlossplatz 1, 67292 Kirchheimbolanden</p>
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

export default Datenschutz;