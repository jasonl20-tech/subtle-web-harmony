import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";

// Floating Testimonials Component  
function FloatingTestimonials() {
  const testimonials = [
    { text: "Spart uns täglich 2 Stunden!", author: "Maria K." },
    { text: "Endlich keine Excel-Tabellen mehr!", author: "Thomas B." },
    { text: "Automatisch und zuverlässig", author: "Sarah L." },
    { text: "Perfekt für unser Team", author: "Michael R." },
    { text: "95% weniger Fehler bei der Zeiterfassung", author: "Anna S." },
    { text: "Einfach genial für Freiberufler", author: "Peter H." },
    { text: "Nie wieder Überstunden vergessen", author: "Lisa M." },
    { text: "Spart Nerven und Zeit", author: "David K." }
  ];
  
  const [visibleTestimonials, setVisibleTestimonials] = useState([0, 1, 2]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleTestimonials(prev => {
        const nextStart = (prev[0] + 3) % testimonials.length;
        return [nextStart, (nextStart + 1) % testimonials.length, (nextStart + 2) % testimonials.length];
      });
    }, 4000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);
  
  return (
    <div className="absolute bottom-8 right-8 w-80 space-y-3">
      {visibleTestimonials.map((index, i) => (
        <div 
          key={`${index}-${i}`}
          className="animate-fade-in transition-all duration-700 ease-out"
          style={{ animationDelay: `${i * 200}ms` }}
        >
          <div className="bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-2xl border border-white/30 hover:shadow-3xl transition-all duration-300 hover:scale-105">
            <div className="flex items-start space-x-3">
              <div className="text-primary text-xl">💬</div>
              <div>
                <p className="text-sm text-foreground mb-2 italic font-medium">"{testimonials[index].text}"</p>
                <p className="text-xs text-muted-foreground font-semibold">- {testimonials[index].author}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Floating Math Symbols Component
function FloatingMathSymbols() {
  const [symbols] = useState(['∑', '∫', '√', '∆', 'π', '∞', '≈', '±', '×', '÷']);
  
  return (
    <div className="absolute bottom-0 right-0 w-64 h-64 overflow-hidden pointer-events-none">
      {symbols.map((symbol, index) => (
        <div
          key={index}
          className="absolute text-muted-foreground/20 text-2xl animate-float"
          style={{
            right: `${Math.random() * 100}px`,
            bottom: `${-20 + Math.random() * 40}px`,
            animationDelay: `${index * 0.5}s`,
            animationDuration: `${4 + Math.random() * 2}s`
          }}
        >
          {symbol}
        </div>
      ))}
    </div>
  );
}

const Hero = () => {
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Centered Laptop Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/lovable-uploads/6a5a0fe9-3c3f-4af0-ad8d-b64cdee58663.png" 
          alt="Laptop mit Excel Tabelle auf Schreibtisch"
          className="w-full h-full object-cover"
        />
        {/* Darker Overlay */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Content - Header oben, Buttons Mitte */}
      <div className="relative z-10 flex flex-col items-center h-full">
        {/* Main Heading - Weiter oben */}
        <div className="mt-24 mb-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight text-center animate-fade-in">
            Automatisierte<br />
            Arbeitsstundennachweise
          </h1>
        </div>

        {/* CTA Buttons - In der Mitte */}
        <div className="flex flex-col sm:flex-row gap-4 mb-auto">
          <button className="bg-white border-2 border-white text-foreground font-medium px-8 py-4 text-lg rounded-full hover:bg-foreground hover:text-white transition-all duration-200 shadow-lg">
            Jetzt starten
          </button>
          <button className="bg-transparent border-2 border-white text-white font-medium px-8 py-4 text-lg rounded-full hover:bg-white hover:text-foreground transition-all duration-200">
            Demo ansehen
          </button>
        </div>
      </div>

      {/* Scroll Down Animation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex flex-col items-center animate-bounce">
          <span className="text-white/60 text-sm mb-2">Mehr erfahren</span>
          <ArrowDown className="w-6 h-6 text-white/60" />
        </div>
      </div>

      {/* Floating Testimonials */}
      <FloatingTestimonials />

      {/* Floating Math Symbols */}
      <FloatingMathSymbols />
    </section>
  );
};

export default Hero;