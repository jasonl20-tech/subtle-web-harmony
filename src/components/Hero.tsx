import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import laptop1 from "@/assets/laptop-1.jpg";
import laptop2 from "@/assets/laptop-2.jpg"; 
import laptop3 from "@/assets/laptop-3.jpg";
import laptop4 from "@/assets/laptop-4.jpg";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    { image: laptop1, alt: "Laptop mit Tabellenkalkulationen" },
    { image: laptop2, alt: "MacBook Pro Arbeitsplatz" },
    { image: laptop3, alt: "MacBook mit Code auf dem Bildschirm" },
    { image: laptop4, alt: "Grauer Laptop auf Schreibtisch" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img 
              src={slide.image} 
              alt={slide.alt}
              className="w-full h-full object-cover"
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6 lg:px-8">
        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-12 leading-tight">
          Arbeitsstundennachweis
        </h1>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary-hover text-primary-foreground font-medium px-10 py-4 text-lg shadow-hover transition-all duration-200"
          >
            Jetzt starten
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm font-medium px-10 py-4 text-lg shadow-card transition-all duration-200"
          >
            Demo ansehen
          </Button>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentSlide 
                  ? 'bg-white shadow-lg' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;