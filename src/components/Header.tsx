import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ChevronDown } from "lucide-react";

const Header = () => {
  const auth = useAuth();
  const user = auth?.user;

  return (
    <header className="absolute top-0 left-0 right-0 z-50 w-full">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Links - Logo/Brand */}
          <div className="flex items-center">
            <Link 
              to="/"
              className="font-bold text-2xl text-white hover:text-white/90 transition-colors duration-200"
            >
              StundenPro
            </Link>
          </div>

          {/* Mitte - Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-1 text-white/90 hover:text-white transition-colors cursor-pointer">
              <span className="font-medium">Produkte</span>
              <ChevronDown className="w-4 h-4" />
            </div>
            <div className="flex items-center space-x-1 text-white/90 hover:text-white transition-colors cursor-pointer">
              <span className="font-medium">Lösungen</span>
              <ChevronDown className="w-4 h-4" />
            </div>
            <div className="flex items-center space-x-1 text-white/90 hover:text-white transition-colors cursor-pointer">
              <span className="font-medium">Entwickler/innen</span>
              <ChevronDown className="w-4 h-4" />
            </div>
            <div className="flex items-center space-x-1 text-white/90 hover:text-white transition-colors cursor-pointer">
              <span className="font-medium">Ressourcen</span>
              <ChevronDown className="w-4 h-4" />
            </div>
            <Link 
              to="/pricing" 
              className="text-white/90 hover:text-white transition-colors font-medium"
            >
              Preisgestaltung
            </Link>
          </nav>

          {/* Rechts - Action Buttons */}
          <div className="flex items-center space-x-4">
            {user ? (
              <Link 
                to="/dashboard" 
                className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-md hover:bg-white/20 transition-all duration-200 font-medium"
              >
                Dashboard →
              </Link>
            ) : (
              <>
                <Link 
                  to="/auth" 
                  className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-md hover:bg-white/20 transition-all duration-200 font-medium"
                >
                  Dashboard →
                </Link>
                <Link 
                  to="/contact" 
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition-all duration-200 font-medium"
                >
                  Sales-Team kontaktieren →
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