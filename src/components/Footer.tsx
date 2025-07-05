import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-white via-gray-50/80 to-gray-100/60 border-t border-gray-200/50">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-blue-600/5"></div>
      
      <div className="relative z-10 container mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Branding */}
          <div className="md:col-span-1">
            <div className="animate-fade-in-up">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Arbeitsstundennachweis
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Automatisierte Lösung für professionelle Arbeitsstundennachweise - 
                schnell, sicher und gesetzeskonform.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-sm">AS</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <h4 className="text-lg font-semibold text-gray-900 mb-6">Navigation</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/help" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 hover:underline">
                  Hilfe
                </Link>
              </li>
              <li>
                <Link to="/tutorial" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 hover:underline">
                  Tutorial
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 hover:underline">
                  Preisgestaltung
                </Link>
              </li>
              <li>
                <Link to="/auth" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 hover:underline">
                  Anmelden
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h4 className="text-lg font-semibold text-gray-900 mb-6">Rechtliches</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/datenschutz" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 hover:underline">
                  Datenschutz
                </Link>
              </li>
              <li>
                <Link to="/impressum" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 hover:underline">
                  Impressum
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <h4 className="text-lg font-semibold text-gray-900 mb-6">Kontakt</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 text-sm">✉</span>
                </div>
                <a 
                  href="mailto:info@arbeitsstundennachweis.com" 
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200 hover:underline"
                >
                  info@arbeitsstundennachweis.com
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-600 text-sm">📞</span>
                </div>
                <a 
                  href="tel:+4915147918371" 
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200 hover:underline"
                >
                  + 49 (0) 151 47918371
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-purple-600 text-sm">📍</span>
                </div>
                <div className="text-gray-600 leading-relaxed">
                  67292 Kirchheimbolanden<br />
                  Schlossplatz 1
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200/80">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <p className="text-gray-500 text-sm">
                © 2025 Arbeitsstundennachweis. Alle Rechte vorbehalten.
              </p>
            </div>
            <div className="flex space-x-6 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <Link to="/datenschutz" className="text-gray-500 hover:text-blue-600 transition-colors duration-200 text-sm">
                Datenschutz
              </Link>
              <Link to="/impressum" className="text-gray-500 hover:text-blue-600 transition-colors duration-200 text-sm">
                Impressum
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;