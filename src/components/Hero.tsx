import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { ArrowRight, Users, Clock, TrendingUp, BarChart } from "lucide-react";
import Header from "@/components/Header";

// Floating Dashboard Cards Component  
function FloatingDashboardCards() {
  const cards = [
    {
      title: "Zeiterfassung",
      value: "8.5h",
      subtitle: "Heute",
      trend: "+2.1%",
      color: "from-blue-500 to-purple-600"
    },
    {
      title: "Wöchentlich",
      value: "42.5h",
      subtitle: "Diese Woche",
      trend: "+5.2%",
      color: "from-green-500 to-teal-600"
    },
    {
      title: "Überstunden",
      value: "3.2h",
      subtitle: "Diesen Monat",
      trend: "-12%",
      color: "from-orange-500 to-red-600"
    }
  ];
  
  const [visibleCards, setVisibleCards] = useState([0, 1, 2]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleCards(prev => {
        const nextStart = (prev[0] + 1) % cards.length;
        return [nextStart, (nextStart + 1) % cards.length, (nextStart + 2) % cards.length];
      });
    }, 3000);
    
    return () => clearInterval(interval);
  }, [cards.length]);
  
  return (
    <div className="absolute top-1/4 right-8 w-80 space-y-4">
      {visibleCards.map((index, i) => (
        <div 
          key={`${index}-${i}`}
          className="animate-fade-in transition-all duration-700 ease-out"
          style={{ 
            animationDelay: `${i * 300}ms`,
            transform: `translateX(${i * 20}px) translateY(${i * 20}px)` 
          }}
        >
          <div className="bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-white/30 hover:shadow-3xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${cards[index].color} flex items-center justify-center`}>
                {index === 0 && <Clock className="w-6 h-6 text-white" />}
                {index === 1 && <BarChart className="w-6 h-6 text-white" />}
                {index === 2 && <TrendingUp className="w-6 h-6 text-white" />}
              </div>
              <span className={`text-sm font-semibold ${cards[index].trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {cards[index].trend}
              </span>
            </div>
            <h3 className="text-sm text-muted-foreground mb-1">{cards[index].title}</h3>
            <p className="text-2xl font-bold text-foreground mb-1">{cards[index].value}</p>
            <p className="text-xs text-muted-foreground">{cards[index].subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// Gas Station Logos Component
function GasStationLogos() {
  const gasStations = [
    { name: "Shell", color: "#FFCF00" },
    { name: "Aral", color: "#0066CC" },
    { name: "Jet", color: "#E31E24" },
    { name: "Agip", color: "#FFD700" },
    { name: "BP", color: "#009639" },
    { name: "Esso", color: "#FF0000" }
  ];

  return (
    <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-10">
      <p className="text-white/80 text-center text-sm mb-6">
        Vertrauen von Unternehmen verschiedener Branchen
      </p>
      <div className="flex items-center justify-center space-x-8 flex-wrap gap-4">
        {gasStations.map((station, index) => (
          <div 
            key={station.name}
            className="animate-fade-in opacity-70 hover:opacity-100 transition-all duration-300"
            style={{ animationDelay: `${index * 200}ms` }}
          >
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg"
              style={{ backgroundColor: station.color }}
            >
              {station.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const Hero = () => {
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Header integriert */}
      <Header />
      
      {/* Stripe-ähnlicher Gradient Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-purple-500 to-blue-500"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/80 via-blue-500/60 to-teal-400/80"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/20 to-blue-600/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center h-full">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-2xl">
            {/* Main Heading */}
            <div className="animate-fade-in-up">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-8">
                Lösungen für die
                <br />
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  Zeiterfassung
                </span>
                <br />
                der Zukunft
              </h1>
            </div>

            {/* Subtitle */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-4">
                Nutzen Sie modernste Technologie für automatisierte
              </p>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-4">
                Arbeitsstundennachweise, um Zeit zu sparen,
              </p>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-12">
                Fehler zu reduzieren und Ihren Gewinn zu steigern.
              </p>
            </div>

            {/* CTA Section */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center space-x-4 mb-8">
                <input
                  type="email"
                  placeholder="E-Mail-Adresse"
                  className="flex-1 max-w-sm px-6 py-4 rounded-full border-0 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-white/50 bg-white/95 backdrop-blur-sm"
                />
                <Button className="bg-foreground hover:bg-foreground/90 text-background px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2">
                  <span>Jetzt loslegen</span>
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Dashboard Cards */}
      <FloatingDashboardCards />

      {/* Gas Station Logos */}
      <GasStationLogos />
    </section>
  );
};

export default Hero;