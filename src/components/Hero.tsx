import { Button } from "@/components/ui/button";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Box, Text } from "@react-three/drei";
import { useEffect, useState } from "react";
import laptop1 from "@/assets/laptop-1.jpg";

// 3D Excel Table Component
function ExcelTable() {
  return (
    <group>
      {/* Table base */}
      <Box args={[3, 0.1, 2]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#e8e8e8" />
      </Box>
      
      {/* Table cells */}
      {Array.from({ length: 5 }).map((_, row) =>
        Array.from({ length: 4 }).map((_, col) => (
          <Box
            key={`${row}-${col}`}
            args={[0.6, 0.05, 0.4]}
            position={[-1.2 + col * 0.75, 0.1, -0.6 + row * 0.4]}
          >
            <meshStandardMaterial color={row === 0 ? "#3A86FF" : "#ffffff"} />
          </Box>
        ))
      )}
      
      {/* Header text simulation */}
      <Text
        position={[0, 0.5, 0]}
        fontSize={0.2}
        color="#333333"
        anchorX="center"
        anchorY="middle"
      >
        EXCEL TABELLE
      </Text>
    </group>
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

        {/* Right 3D Excel Table */}
        <div className="h-96 w-full">
          <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <ExcelTable />
            <OrbitControls 
              enablePan={false} 
              enableZoom={false}
              autoRotate
              autoRotateSpeed={1}
            />
          </Canvas>
        </div>
      </div>

      {/* Floating Math Symbols */}
      <FloatingMathSymbols />
    </section>
  );
};

export default Hero;