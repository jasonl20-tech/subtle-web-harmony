import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import heroLaptop from "@/assets/hero-laptop.jpg";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";

// 3D Excel Table Component
function Excel3D() {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      
      {/* Table Base */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 6, Math.PI / 8, 0]}>
        <boxGeometry args={[4, 2.5, 0.1]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      
      {/* Header Row */}
      <Text
        position={[-1.5, 0.8, 0.1]}
        rotation={[-Math.PI / 6, Math.PI / 8, 0]}
        fontSize={0.15}
        color="#333333"
        anchorX="center"
        anchorY="middle"
      >
        Datum
      </Text>
      <Text
        position={[0, 0.8, 0.1]}
        rotation={[-Math.PI / 6, Math.PI / 8, 0]}
        fontSize={0.15}
        color="#333333"
        anchorX="center"
        anchorY="middle"
      >
        Stunden
      </Text>
      <Text
        position={[1.5, 0.8, 0.1]}
        rotation={[-Math.PI / 6, Math.PI / 8, 0]}
        fontSize={0.15}
        color="#333333"
        anchorX="center"
        anchorY="middle"
      >
        Projekt
      </Text>
      
      {/* Sample Data Rows */}
      {Array.from({ length: 6 }, (_, i) => (
        <group key={i}>
          <Text
            position={[-1.5, 0.4 - i * 0.3, 0.1]}
            rotation={[-Math.PI / 6, Math.PI / 8, 0]}
            fontSize={0.12}
            color="#666666"
            anchorX="center"
            anchorY="middle"
          >
            {`${String(i + 1).padStart(2, '0')}.01`}
          </Text>
          <Text
            position={[0, 0.4 - i * 0.3, 0.1]}
            rotation={[-Math.PI / 6, Math.PI / 8, 0]}
            fontSize={0.12}
            color="#666666"
            anchorX="center"
            anchorY="middle"
          >
            {`${Math.floor(Math.random() * 8) + 1}h`}
          </Text>
          <Text
            position={[1.5, 0.4 - i * 0.3, 0.1]}
            rotation={[-Math.PI / 6, Math.PI / 8, 0]}
            fontSize={0.12}
            color="#666666"
            anchorX="center"
            anchorY="middle"
          >
            A-{i + 1}
          </Text>
        </group>
      ))}
      
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}

// Floating Math Symbols Component
function FloatingMathSymbols() {
  const [symbols] = useState(['∑', '∫', '√', '∆', 'π', '∞', '≈', '±', '×', '÷']);
  
  return (
    <div className="absolute top-0 left-0 w-96 h-96 overflow-hidden pointer-events-none">
      {symbols.map((symbol, index) => (
        <div
          key={index}
          className="absolute text-muted-foreground/20 text-2xl animate-float"
          style={{
            left: `${Math.random() * 150}px`,
            top: `${-20 + Math.random() * 60}px`,
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
          alt="Laptop auf Schreibtisch im Studio"
          className="w-full h-full object-cover"
        />
        {/* Light Overlay */}
        <div className="absolute inset-0 bg-white/10"></div>
      </div>

      {/* Content Grid */}
      <div className="relative z-10 h-full grid grid-cols-2 items-center px-6 lg:px-12">
        {/* Left Side - Text and Buttons */}
        <div className="space-y-8">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
            Automatisierte<br />
            Arbeitsstundennachweise
          </h1>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-white border-2 border-foreground text-foreground font-medium px-8 py-4 text-lg rounded-full hover:bg-foreground hover:text-white transition-all duration-200 shadow-lg">
              Jetzt starten
            </button>
            <button className="bg-transparent border-2 border-foreground text-foreground font-medium px-8 py-4 text-lg rounded-full hover:bg-foreground hover:text-white transition-all duration-200">
              Demo ansehen
            </button>
          </div>
        </div>

        {/* Right Side - 3D Excel Table */}
        <div className="h-96 w-full">
          <Excel3D />
        </div>
      </div>

      {/* Floating Math Symbols */}
      <FloatingMathSymbols />
    </section>
  );
};

export default Hero;