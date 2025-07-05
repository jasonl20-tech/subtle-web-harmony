const Footer = () => {
  return (
    <footer className="bg-secondary/20 py-12">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-semibold text-sm">W</span>
              </div>
              <span className="font-semibold text-lg text-foreground">WebPro</span>
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-md">
              Professionelle Web-Lösungen mit minimalistischem Design und 
              perfekter Benutzererfahrung. Wir entwickeln moderne, elegante 
              Webanwendungen für Ihr Unternehmen.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                  Home
                </a>
              </li>
              <li>
                <a href="#services" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                  Services
                </a>
              </li>
              <li>
                <a href="#about" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                  Über uns
                </a>
              </li>
              <li>
                <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                  Kontakt
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Kontakt</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground">
                info@webpro.de
              </li>
              <li className="text-muted-foreground">
                +49 (0) 123 456 789
              </li>
              <li className="text-muted-foreground">
                Musterstraße 123<br />
                12345 Musterstadt
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground mb-4 md:mb-0">
              © 2024 WebPro. Alle Rechte vorbehalten.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                Datenschutz
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                Impressum
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                AGB
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;