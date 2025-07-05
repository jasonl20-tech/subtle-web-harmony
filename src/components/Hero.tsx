import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import laptopStudio from "@/assets/laptop-studio.jpg";

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

// Excel Table Component - Blue Style like in image
function ExcelTable() {
  return (
    <div className="relative bg-blue-500 rounded-lg shadow-2xl p-4 max-w-sm mx-auto transform hover:scale-105 transition-all duration-300 rotate-2 hover:rotate-0">
      {/* Excel Header */}
      <div className="flex items-center mb-3 text-white">
        <div className="w-4 h-4 bg-white/20 rounded mr-2"></div>
        <span className="text-sm font-medium">Arbeitsstunden Nachweis</span>
      </div>
      
      {/* Excel Grid */}
      <div className="bg-white/10 rounded p-2 mb-2">
        <div className="grid grid-cols-3 gap-1 text-xs text-white/80">
          {/* Column Headers */}
          <div className="bg-white/20 p-1 text-center rounded text-[10px]">A1</div>
          <div className="bg-white/20 p-1 text-center rounded text-[10px]">B2</div>
          <div className="bg-white/20 p-1 text-center rounded text-[10px]">C3</div>
          
          {/* Data Cells */}
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white/10 p-1 rounded h-4"></div>
          ))}
        </div>
      </div>
      
      {/* Chart Area */}
      <div className="bg-white/10 rounded p-2 h-16 flex items-end justify-center space-x-1">
        <div className="w-2 bg-green-400 h-6 rounded-t"></div>
        <div className="w-2 bg-orange-400 h-8 rounded-t"></div>
        <div className="w-2 bg-purple-400 h-4 rounded-t"></div>
        <div className="w-2 bg-blue-300 h-10 rounded-t"></div>
      </div>
      
      {/* Excel Icons */}
      <div className="absolute top-2 right-2 flex space-x-1">
        <div className="w-3 h-3 bg-white/30 rounded"></div>
        <div className="w-3 h-3 bg-white/30 rounded"></div>
      </div>
    </div>
  );
}

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* Studio Laptop Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src={laptopStudio} 
          alt="Laptop im Studio mit Excel"
          className="w-full h-full object-cover"
        />
        {/* Light Overlay */}
        <div className="absolute inset-0 bg-white/20"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8 leading-tight">
            Automatisierte<br />
            Arbeitsstundennachweise
          </h1>

          {/* CTA Buttons - New Style */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-white border-2 border-foreground text-foreground font-medium px-8 py-4 text-lg rounded-full hover:bg-foreground hover:text-white transition-all duration-200 shadow-lg">
              Jetzt starten
            </button>
            <button className="bg-transparent border-2 border-foreground text-foreground font-medium px-8 py-4 text-lg rounded-full hover:bg-foreground hover:text-white transition-all duration-200">
              Demo ansehen
            </button>
          </div>
        </div>

        {/* Right Excel Table */}
        <div className="flex justify-center items-center">
          <ExcelTable />
        </div>
      </div>

      {/* Floating Math Symbols */}
      <FloatingMathSymbols />
    </section>
  );
};

export default Hero;