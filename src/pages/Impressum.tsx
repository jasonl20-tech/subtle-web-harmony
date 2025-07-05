import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";

const Impressum = () => {
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
            <linearGradient id="impressumGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="25%" stopColor="#8B5CF6" />
              <stop offset="50%" stopColor="#EC4899" />
              <stop offset="75%" stopColor="#F97316" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
          </defs>
          <path
            d="M-100,0 L1500,0 L1500,80 Q1100,60 900,140 Q700,220 500,180 Q350,140 150,420 Q50,440 -100,460 Z"
            fill="url(#impressumGradient)"
            opacity="0.10"
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
                <span className="text-gray-900">Impressum</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Rechtliche Informationen und Angaben gemäß § 5 TMG
              </p>
            </div>
          </div>

          <div className="space-y-8 max-w-4xl mx-auto">
            <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <Card className="p-8 bg-white/80 backdrop-blur-sm border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xl">🏢</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Angaben gemäß § 5 TMG</h2>
                    <div className="text-gray-600 text-lg leading-relaxed space-y-2">
                      <p><strong>Arbeitsstundennachweis</strong></p>
                      <p>Schlossplatz 1</p>
                      <p>67292 Kirchheimbolanden</p>
                      <p>Deutschland</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            
            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <Card className="p-8 bg-white/80 backdrop-blur-sm border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xl">📞</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Kontakt</h2>
                    <div className="text-gray-600 text-lg leading-relaxed space-y-2">
                      <p><strong>Telefon:</strong> + 49 (0) 151 47918371</p>
                      <p><strong>E-Mail:</strong> info@arbeitsstundennachweis.com</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            
            <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <Card className="p-8 bg-white/80 backdrop-blur-sm border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xl">⚖️</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Haftung für Inhalte</h2>
                    <div className="text-gray-600 text-lg leading-relaxed">
                      <p>Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht unter der Verpflichtung, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <Card className="p-8 bg-white/80 backdrop-blur-sm border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xl">🔗</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Haftung für Links</h2>
                    <div className="text-gray-600 text-lg leading-relaxed">
                      <p>Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <Card className="p-8 bg-white/80 backdrop-blur-sm border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xl">©</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Urheberrecht</h2>
                    <div className="text-gray-600 text-lg leading-relaxed">
                      <p>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <Card className="p-8 bg-gradient-to-r from-blue-50/80 to-purple-50/80 backdrop-blur-sm border border-gray-100 shadow-lg">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <span className="text-white text-2xl">📧</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    Fragen zum Impressum?
                  </h3>
                  <p className="text-gray-600 text-lg mb-6">
                    Bei Fragen oder Anmerkungen zu diesem Impressum kontaktieren Sie uns gerne.
                  </p>
                  <div className="flex justify-center space-x-6">
                    <a 
                      href="mailto:info@arbeitsstundennachweis.com"
                      className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
                    >
                      <span>E-Mail schreiben</span>
                    </a>
                    <a 
                      href="tel:+4915147918371"
                      className="inline-flex items-center space-x-2 bg-white border border-gray-200 text-gray-900 px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
                    >
                      <span>Anrufen</span>
                    </a>
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

export default Impressum;