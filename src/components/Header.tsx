import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut } from "lucide-react";

const Header = () => {
  const auth = useAuth();
  const user = auth?.user;
  const signOut = auth?.signOut;

  const handleSignOut = async () => {
    if (signOut) {
      await signOut();
    }
  };

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

          {/* Rechts - Auth Status */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="text-gray-600 hover:text-primary transition-colors duration-200 font-medium relative group"
                >
                  Dashboard
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Button variant="outline" onClick={handleSignOut} size="sm">
                  <LogOut className="w-4 h-4 mr-2" />
                  Abmelden
                </Button>
              </>
            ) : (
              <>
                <Link 
                  to="/auth" 
                  className="text-gray-600 hover:text-primary transition-colors duration-200 font-medium relative group"
                >
                  Einloggen
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <span className="text-gray-300">|</span>
                <Link 
                  to="/auth" 
                  className="text-gray-600 hover:text-primary transition-colors duration-200 font-medium relative group"
                >
                  Registrieren
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;