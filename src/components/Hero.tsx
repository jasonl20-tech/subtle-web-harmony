import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { ArrowRight, Clock, TrendingUp, BarChart, CreditCard, Users, DollarSign } from "lucide-react";
import Header from "@/components/Header";

// Floating Dashboard Cards Component  
function FloatingDashboardCards() {
  const cards = [
    {
      title: "Nettovolumen",
      value: "€3.528.198,72",
      subtitle: "Heute",
      trend: "+2.1%",
      color: "from-blue-500 to-purple-600",
      chartData: [20, 45, 35, 60, 55, 75, 70, 85]
    },
    {
      title: "Verkäufe",
      value: "2.951.556",
      subtitle: "Gestern",
      trend: "+321.9%",
      color: "from-green-500 to-teal-600",
      chartData: [30, 25, 45, 35, 65, 55, 85, 75]
    },
    {
      title: "Neue Kunden",
      value: "37",
      subtitle: "Heute",
      trend: "+321.9%",
      color: "from-orange-500 to-red-600",
      chartData: [10, 35, 25, 55, 45, 75, 65, 95]
    }
  ];
  
  const [visibleCards, setVisibleCards] = useState([0, 1, 2]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleCards(prev => {
        const rotated = [...prev];
        rotated.push(rotated.shift()!);
        return rotated;
      });
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="absolute top-32 right-8 w-80 space-y-4 z-20">
      {visibleCards.map((index, i) => (
        <div 
          key={`${index}-${i}`}
          className="animate-fade-in transition-all duration-700 ease-out"
          style={{ 
            animationDelay: `${i * 200}ms`,
            transform: `translateX(${i * 15}px) translateY(${i * 15}px)` 
          }}
        >
          <div className="bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${cards[index].color} flex items-center justify-center`}>
                {index === 0 && <DollarSign className="w-5 h-5 text-white" />}
                {index === 1 && <BarChart className="w-5 h-5 text-white" />}
                {index === 2 && <Users className="w-5 h-5 text-white" />}
              </div>
              <span className={`text-sm font-semibold ${cards[index].trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {cards[index].trend}
              </span>
            </div>
            <h3 className="text-sm text-gray-500 mb-1">{cards[index].title}</h3>
            <p className="text-2xl font-bold text-gray-900 mb-3">{cards[index].value}</p>
            <p className="text-xs text-gray-400 mb-3">{cards[index].subtitle}</p>
            
            {/* Mini Chart */}
            <div className="h-12 flex items-end space-x-1">
              {cards[index].chartData.map((height, idx) => (
                <div
                  key={idx}
                  className={`bg-gradient-to-t ${cards[index].color} rounded-sm flex-1 opacity-80`}
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Smartphone Mockup Component
function SmartphoneMockup() {
  return (
    <div className="absolute top-24 right-32 z-10">
      <div className="w-72 h-[580px] bg-gray-900 rounded-[3rem] p-2 shadow-2xl">
        <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
          {/* Status Bar */}
          <div className="bg-gray-50 h-12 flex items-center justify-between px-6 text-sm">
            <span className="font-medium">9:41</span>
            <div className="flex space-x-1">
              <div className="w-4 h-2 bg-green-500 rounded-sm"></div>
              <div className="w-6 h-2 bg-gray-300 rounded-sm"></div>
            </div>
          </div>
          
          {/* Payment Form */}
          <div className="p-6 space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Zahlung</h3>
              <p className="text-2xl font-bold text-blue-600">€9,99</p>
              <p className="text-sm text-gray-500">pro Monat</p>
            </div>
            
            {/* Apple Pay Button */}
            <button className="w-full bg-black text-white py-4 rounded-xl font-medium flex items-center justify-center space-x-2">
              <span>🍎</span>
              <span>Pay</span>
            </button>
            
            <div className="flex items-center space-x-2 my-4">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="text-sm text-gray-500">oder mit Karte bezahlen</span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>
            
            {/* Card Form */}
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-600 mb-1">E-Mail</label>
                <input
                  type="email"
                  className="w-full p-3 border border-gray-200 rounded-lg text-sm"
                  placeholder="kunde@beispiel.de"
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1">Kartendaten</label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    className="flex-1 p-3 border border-gray-200 rounded-lg text-sm"
                    placeholder="1234 1234 1234 1234"
                  />
                  <div className="flex space-x-1">
                    <span className="text-blue-600 text-lg">💳</span>
                    <span className="text-yellow-500 text-lg">💳</span>
                  </div>
                </div>
                <div className="flex space-x-2 mt-2">
                  <input
                    type="text"
                    className="flex-1 p-3 border border-gray-200 rounded-lg text-sm"
                    placeholder="MM/JJ"
                  />
                  <input
                    type="text"
                    className="flex-1 p-3 border border-gray-200 rounded-lg text-sm"
                    placeholder="CVC"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Land/Region</label>
                  <select className="w-full p-3 border border-gray-200 rounded-lg text-sm">
                    <option>Deutschland</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">PLZ</label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-200 rounded-lg text-sm"
                    placeholder="12345"
                  />
                </div>
              </div>
            </div>
            
            <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-medium mt-6">
              Zahlen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Tankstellen Logos Component
function TankstellenLogos() {
  const tankstellen = [
    { name: "Shell", color: "#FFCF00" },
    { name: "Aral", color: "#0066CC" },
    { name: "Jet", color: "#E31E24" },
    { name: "Agip", color: "#FFD700" },
    { name: "BP", color: "#009639" },
    { name: "Esso", color: "#FF0000" }
  ];

  return (
    <div className="mt-16">
      <p className="text-center text-gray-500 text-sm mb-8">
        Vertrauen von Unternehmen verschiedener Branchen
      </p>
      <div className="flex items-center justify-center space-x-12 flex-wrap gap-6">
        {tankstellen.map((station, index) => (
          <div 
            key={station.name}
            className="animate-fade-in opacity-60 hover:opacity-100 transition-all duration-300"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <div 
              className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-xs shadow-lg"
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
    <section className="relative min-h-screen overflow-hidden bg-white">
      {/* Header */}
      <div className="relative z-50">
        <Header />
      </div>
      
      {/* Curved Rainbow Gradient Background */}
      <div className="absolute top-0 left-0 right-0 h-96 z-0">
        <svg
          className="absolute top-0 left-0 w-full h-full"
          viewBox="0 0 1200 400"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="rainbowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="25%" stopColor="#EC4899" />
              <stop offset="50%" stopColor="#F97316" />
              <stop offset="75%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
          <path
            d="M0,0 Q300,200 600,100 T1200,50 L1200,0 Z"
            fill="url(#rainbowGradient)"
            opacity="0.1"
          />
          <path
            d="M0,0 Q400,150 800,80 T1200,30 L1200,0 Z"
            fill="url(#rainbowGradient)"
            opacity="0.15"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 pt-24 pb-16">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Main Heading */}
              <div className="animate-fade-in-up">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="text-gray-900">Lösungen für die</span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Zeiterfassung
                  </span>
                  <br />
                  <span className="text-gray-900">der Zukunft</span>
                </h1>
              </div>

              {/* Subtitle */}
              <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                  Nutzen Sie modernste Technologie für automatisierte Arbeitsstundennachweise, 
                  optimierte Zahlungsabwicklung und nachhaltige Gewinnsteigerung in Ihrem Unternehmen.
                </p>
              </div>

              {/* CTA Section */}
              <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <div className="flex items-center space-x-4 max-w-md">
                  <input
                    type="email"
                    placeholder="E-Mail-Adresse"
                    className="flex-1 px-6 py-4 rounded-full border border-gray-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                  />
                  <Button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2 whitespace-nowrap">
                    <span>Jetzt loslegen</span>
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Tankstellen Logos */}
              <div className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                <TankstellenLogos />
              </div>
            </div>

            {/* Right Content - Visualizations */}
            <div className="relative lg:h-[600px]">
              {/* Smartphone Mockup */}
              <SmartphoneMockup />
              
              {/* Floating Dashboard Cards */}
              <FloatingDashboardCards />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;