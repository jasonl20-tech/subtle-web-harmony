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
              className="font-bold text-2xl text-gray-900 hover:text-gray-700 transition-colors duration-200"
            >
              <span className="block leading-tight">
                Arbeits-<br />stundennachweis
              </span>
            </Link>
          </div>

          {/* Mitte - Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/help" 
              className="text-gray-900 hover:text-gray-700 transition-colors font-medium"
            >
              Hilfe
            </Link>
            <Link 
              to="/tutorial" 
              className="text-gray-900 hover:text-gray-700 transition-colors font-medium"
            >
              Tutorial
            </Link>
            <Link 
              to="/pricing" 
              className="text-gray-900 hover:text-gray-700 transition-colors font-medium"
            >
              Preisgestaltung
            </Link>
          </nav>

          {/* Rechts - Action Buttons */}
          <div className="flex items-center space-x-4">
            {user ? (
              <Link 
                to="/dashboard" 
                className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-all duration-200 font-medium"
              >
                Dashboard →
              </Link>
            ) : (
              <>
                <Link 
                  to="/auth" 
                  className="bg-gray-100 border border-gray-300 text-gray-900 px-4 py-2 rounded-md hover:bg-gray-200 transition-all duration-200 font-medium"
                >
                  Login oder Registrierung
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