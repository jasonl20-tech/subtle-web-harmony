import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const auth = useAuth();
  const user = auth?.user;
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 right-0 z-50 w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              to="/"
              className="font-bold text-lg sm:text-2xl text-gray-900 hover:text-gray-700 transition-colors duration-200"
            >
              <span className="hidden sm:inline">Arbeitsstundennachweis</span>
              <span className="sm:hidden">Arbeitszeit</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
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
              to="/contact" 
              className="text-gray-900 hover:text-gray-700 transition-colors font-medium"
            >
              Kontakt
            </Link>
            <Link 
              to="/pricing" 
              className="text-gray-900 hover:text-gray-700 transition-colors font-medium"
            >
              Preisgestaltung
            </Link>
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <Link 
                  to="/dashboard" 
                  className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-all duration-200 font-medium text-sm"
                >
                  Dashboard →
                </Link>
                <button
                  onClick={async () => {
                    await auth?.signOut();
                    navigate('/');
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-all duration-200 font-medium text-sm"
                >
                  Abmelden
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link 
                  to="/auth" 
                  className="bg-gray-100 border border-gray-300 text-gray-900 px-4 py-2 rounded-md hover:bg-gray-200 transition-all duration-200 font-medium text-sm"
                >
                  Login
                </Link>
                <Link 
                  to="/auth" 
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition-all duration-200 font-medium text-sm"
                >
                  Registrieren →
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-900 hover:bg-gray-100 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
            <div className="px-4 py-6 space-y-4">
              {/* Mobile Navigation Links */}
              <div className="space-y-3">
                <Link 
                  to="/help" 
                  className="block py-2 text-gray-900 hover:text-gray-700 transition-colors font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Hilfe
                </Link>
                <Link 
                  to="/tutorial" 
                  className="block py-2 text-gray-900 hover:text-gray-700 transition-colors font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Tutorial
                </Link>
                <Link 
                  to="/contact" 
                  className="block py-2 text-gray-900 hover:text-gray-700 transition-colors font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Kontakt
                </Link>
                <Link 
                  to="/pricing" 
                  className="block py-2 text-gray-900 hover:text-gray-700 transition-colors font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Preisgestaltung
                </Link>
              </div>

              {/* Mobile Action Buttons */}
              <div className="pt-4 border-t border-gray-200 space-y-3">
                {user ? (
                  <>
                    <Link 
                      to="/dashboard" 
                      className="block w-full bg-gray-900 text-white px-4 py-3 rounded-md hover:bg-gray-800 transition-all duration-200 font-medium text-center"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Dashboard →
                    </Link>
                    <button
                      onClick={async () => {
                        await auth?.signOut();
                        navigate('/');
                        setIsMobileMenuOpen(false);
                      }}
                      className="block w-full bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-md transition-all duration-200 font-medium"
                    >
                      Abmelden
                    </button>
                  </>
                ) : (
                  <>
                    <Link 
                      to="/auth" 
                      className="block w-full bg-gray-100 border border-gray-300 text-gray-900 px-4 py-3 rounded-md hover:bg-gray-200 transition-all duration-200 font-medium text-center"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link 
                      to="/auth" 
                      className="block w-full bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-md transition-all duration-200 font-medium text-center"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Registrieren →
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;