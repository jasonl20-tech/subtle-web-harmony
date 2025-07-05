import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Links - Website Name */}
          <div className="flex items-center">
            <span className="font-bold text-xl text-gray-900">ARBEITSSTUNDENNACHWEISE</span>
          </div>

          {/* Mitte - Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-600 hover:text-primary transition-all duration-300 font-medium relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              to="/tutorial" 
              className="text-gray-600 hover:text-primary transition-all duration-300 font-medium relative group"
            >
              Tutorial
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              to="/help" 
              className="text-gray-600 hover:text-primary transition-all duration-300 font-medium relative group"
            >
              Hilfecenter
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              to="/contact" 
              className="text-gray-600 hover:text-primary transition-all duration-300 font-medium relative group"
            >
              Kontakt
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              to="/pricing" 
              className="text-gray-600 hover:text-primary transition-all duration-300 font-medium relative group"
            >
              Preise
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>

          {/* Rechts - Einloggen und Registrieren */}
          <div className="flex items-center space-x-4">
            <a 
              href="#login" 
              className="text-gray-600 hover:text-primary transition-colors duration-200 font-medium relative group"
            >
              Einloggen
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
            <span className="text-gray-300">|</span>
            <a 
              href="#register" 
              className="text-gray-600 hover:text-primary transition-colors duration-200 font-medium relative group"
            >
              Registrieren
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;