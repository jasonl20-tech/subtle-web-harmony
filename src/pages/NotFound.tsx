import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-md mx-auto">
        <h1 className="text-responsive-xl font-bold mb-6 text-foreground">404</h1>
        <p className="text-responsive-md text-muted-foreground mb-8 leading-relaxed">
          Oops! Die gesuchte Seite konnte nicht gefunden werden.
        </p>
        <a 
          href="/" 
          className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary-hover transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Zurück zur Startseite
        </a>
      </div>
    </div>
  );
};

export default NotFound;
