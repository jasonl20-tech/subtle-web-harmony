import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import laptop1 from "@/assets/laptop-1.jpg";

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

// Simple Excel Table Mock
function SimpleExcelTable() {
  return (
    <div className="relative bg-white/90 backdrop-blur-sm rounded-lg shadow-xl p-6 max-w-sm mx-auto transform rotate-3 hover:rotate-0 transition-transform duration-300">
      <div className="text-center mb-4">
        <h3 className="text-primary font-semibold">Excel Tabelle</h3>
      </div>
      
      <div className="grid grid-cols-3 gap-1 text-xs">
        {/* Header Row */}
        <div className="bg-primary text-primary-foreground p-2 text-center font-medium">Datum</div>
        <div className="bg-primary text-primary-foreground p-2 text-center font-medium">Stunden</div>
        <div className="bg-primary text-primary-foreground p-2 text-center font-medium">Projekt</div>
        
        {/* Data Rows */}
        {Array.from({ length: 4 }).map((_, i) => (
          <>
            <div key={`date-${i}`} className="bg-muted p-2 text-center">{String(i + 1).padStart(2, '0')}.01</div>
            <div key={`hours-${i}`} className="bg-muted p-2 text-center">{8 - i}</div>
            <div key={`project-${i}`} className="bg-muted p-2 text-center">Web{i + 1}</div>
          </>
        ))}
      </div>
    </div>
  );
}

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* Single Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={laptop1} 
          alt="Laptop mit Tabellenkalkulationen"
          className="w-full h-full object-cover"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
            Automatisierte<br />
            Arbeitsstundennachweise
          </h1>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary-hover text-primary-foreground font-medium px-8 py-3 text-lg shadow-hover transition-all duration-200"
            >
              Jetzt starten
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm font-medium px-8 py-3 text-lg shadow-card transition-all duration-200"
            >
              Demo ansehen
            </Button>
          </div>
        </div>

        {/* Right Excel Table */}
        <div className="flex justify-center items-center">
          <SimpleExcelTable />
        </div>
      </div>

      {/* Floating Math Symbols */}
      <FloatingMathSymbols />
    </section>
  );
};

export default Hero;