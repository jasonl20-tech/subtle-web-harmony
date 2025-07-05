import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import heroLaptop from "@/assets/laptop-excel.jpg";
import { ArrowDown } from "lucide-react";

// Floating Testimonials Component  
function FloatingTestimonials() {
  const testimonials = [
    { text: "Spart uns täglich 2 Stunden!", author: "Maria K." },
    { text: "Endlich keine Excel-Tabellen mehr!", author: "Thomas B." },
    { text: "Automatisch und zuverlässig", author: "Sarah L." },
    { text: "Perfekt für unser Team", author: "Michael R." }
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        setIsVisible(true);
      }, 500);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);
  
  return (
    <div className="absolute right-8 top-1/2 transform -translate-y-1/2 w-64">
      <div className={`transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
        <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-white/20">
          <p className="text-sm text-foreground mb-2 italic">"{testimonials[currentIndex].text}"</p>
          <p className="text-xs text-muted-foreground font-medium">- {testimonials[currentIndex].author}</p>
        </div>
      </div>
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
          src={heroLaptop} 
          alt="Laptop mit Excel Tabelle"
          className="w-full h-full object-cover"
        />
        {/* Darker Overlay */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Content - Upper Left */}
      <div className="relative z-10 absolute top-32 left-8 lg:left-16">
        {/* Main Heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-8">
          Automatisierte<br />
          Arbeitsstundennachweise
        </h1>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
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