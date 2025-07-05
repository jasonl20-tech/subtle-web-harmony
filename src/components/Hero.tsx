import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import heroLaptop from "@/assets/hero-laptop.jpg";

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
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Centered Laptop Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroLaptop} 
          alt="Laptop auf Schreibtisch im Studio"
          className="w-full h-full object-cover"
        />
        {/* Light Overlay */}
        <div className="absolute inset-0 bg-white/10"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6 lg:px-8">
        {/* Main Heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8 leading-tight">
          Automatisierte<br />
          Arbeitsstundennachweise
        </h1>

        {/* CTA Buttons - New Style */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white border-2 border-foreground text-foreground font-medium px-8 py-4 text-lg rounded-full hover:bg-foreground hover:text-white transition-all duration-200 shadow-lg">
            Jetzt starten
          </button>
          <button className="bg-transparent border-2 border-foreground text-foreground font-medium px-8 py-4 text-lg rounded-full hover:bg-foreground hover:text-white transition-all duration-200">
            Demo ansehen
          </button>
        </div>
      </div>

      {/* Floating Math Symbols */}
      <FloatingMathSymbols />
    </section>
  );
};

export default Hero;