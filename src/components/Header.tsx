import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-primary/95 backdrop-blur supports-[backdrop-filter]:bg-primary/90 border-b border-primary/20">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span className="text-primary font-semibold text-sm">W</span>
            </div>
            <span className="font-semibold text-lg text-white">WebPro</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a 
              href="#home" 
              className="text-white/80 hover:text-white transition-colors duration-200 font-medium"
            >
              Home
            </a>
            <a 
              href="#services" 
              className="text-white/80 hover:text-white transition-colors duration-200 font-medium"
            >
              Services
            </a>
            <a 
              href="#about" 
              className="text-white/80 hover:text-white transition-colors duration-200 font-medium"
            >
              Über uns
            </a>
            <a 
              href="#contact" 
              className="text-white/80 hover:text-white transition-colors duration-200 font-medium"
            >
              Kontakt
            </a>
          </nav>

          {/* CTA Button */}
          <Button 
            className="bg-white hover:bg-white/90 text-primary font-medium px-6 shadow-subtle hover:shadow-card transition-all duration-200"
          >
            Jetzt starten
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;