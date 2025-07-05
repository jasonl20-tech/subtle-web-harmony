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

// Desktop Mockup Component with Animated Excel
function DesktopMockup() {
  const [currentRow, setCurrentRow] = useState(1);
  const [excelData, setExcelData] = useState([
    { date: "01.07.2025", start: "08:00", end: "16:30", break: "00:30", hours: "8.0", status: "Erfasst" },
    { date: "02.07.2025", start: "08:15", end: "17:00", break: "00:45", hours: "8.0", status: "Bearbeitung..." },
    { date: "03.07.2025", start: "07:45", end: "16:15", break: "00:30", hours: "8.0", status: "Warten..." },
    { date: "04.07.2025", start: "08:30", end: "17:30", break: "01:00", hours: "8.0", status: "Warten..." },
    { date: "05.07.2025", start: "08:00", end: "16:00", break: "00:30", hours: "7.5", status: "Warten..." }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRow(prev => (prev % excelData.length) + 1);
      
      // Update status animation
      setExcelData(prevData => 
        prevData.map((row, index) => {
          if (index === currentRow - 1) {
            return { ...row, status: "Bearbeitung..." };
          } else if (index < currentRow - 1) {
            return { ...row, status: "Erfasst" };
          }
          return { ...row, status: "Warten..." };
        })
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [currentRow, excelData.length]);

  return (
    <div className="absolute top-8 -right-32 z-10 animate-slide-in-right">
      {/* Desktop Monitor */}
      <div className="relative">
        {/* Monitor Screen */}
        <div className="w-[600px] h-[400px] bg-gray-900 rounded-t-3xl p-2 shadow-2xl">
          <div className="w-full h-full bg-white rounded-t-2xl overflow-hidden">
            {/* Excel Interface */}
            <div className="h-full flex flex-col">
              {/* Excel Toolbar */}
              <div className="bg-gray-50 px-3 py-2 border-b border-gray-200 flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex-1 text-center">
                  <span className="text-xs font-medium text-gray-700">Arbeitsstunden_Juli_2025.xlsx</span>
                </div>
              </div>

              {/* Excel Header */}
              <div className="bg-green-600 text-white text-xs font-bold px-2 py-1">
                <div className="grid grid-cols-6 gap-1">
                  <div>Datum</div>
                  <div>Start</div>
                  <div>Ende</div>
                  <div>Pause</div>
                  <div>Stunden</div>
                  <div>Status</div>
                </div>
              </div>

              {/* Excel Data Rows */}
              <div className="flex-1 overflow-hidden">
                {excelData.map((row, index) => (
                  <div 
                    key={index}
                    className={`grid grid-cols-6 gap-1 px-2 py-1 text-xs border-b border-gray-200 transition-all duration-500 ${
                      index === currentRow - 1 ? 'bg-blue-100 border-blue-300' : 'bg-white'
                    }`}
                  >
                    <div className="font-medium">{row.date}</div>
                    <div>{row.start}</div>
                    <div>{row.end}</div>
                    <div>{row.break}</div>
                    <div className="font-bold text-green-600">{row.hours}h</div>
                    <div className={`font-medium ${
                      row.status === 'Erfasst' ? 'text-green-600' :
                      row.status === 'Bearbeitung...' ? 'text-blue-600 animate-pulse' :
                      'text-gray-400'
                    }`}>
                      {row.status}
                    </div>
                  </div>
                ))}
                
                {/* Sum Row */}
                <div className="grid grid-cols-6 gap-1 px-2 py-1 text-xs bg-gray-100 border-t-2 border-gray-300 font-bold">
                  <div className="col-span-4">Gesamt:</div>
                  <div className="text-green-700">39.5h</div>
                  <div className="text-green-600">✓</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Monitor Stand */}
        <div className="w-48 h-12 bg-gray-300 mx-auto rounded-b-xl"></div>
        <div className="w-64 h-4 bg-gray-400 mx-auto rounded-full"></div>
      </div>
    </div>
  );
}

// Floating Company Logos Component
function FloatingCompanyLogos() {
  const companies = [
    { name: "Shell", color: "#FFCF00", textColor: "#000" },
    { name: "Aral", color: "#0066CC", textColor: "#FFF" },
    { name: "Jet", color: "#E31E24", textColor: "#FFF" },
    { name: "Agip", color: "#FFD700", textColor: "#000" },
    { name: "Esso", color: "#FF0000", textColor: "#FFF" }
  ];

  return (
    <div className="absolute inset-0 pointer-events-none z-5">
      {companies.map((company, index) => (
        <div
          key={company.name}
          className="absolute animate-pulse"
          style={{
            left: `${15 + index * 18}%`,
            top: `${20 + (index % 2) * 40}%`,
            animationDelay: `${index * 0.8}s`,
            animationDuration: `${4 + index}s`
          }}
        >
          <div 
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-xs font-bold shadow-lg transition-all duration-1000 hover:scale-110"
            style={{ 
              backgroundColor: company.color,
              color: company.textColor,
              animation: `float ${6 + index}s ease-in-out infinite`
            }}
          >
            {company.name}
          </div>
        </div>
      ))}
    </div>
  );
}

// Tankstellen Logos Component (static at bottom)
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
      
      {/* Animated Curved Rainbow Gradient Background - More swing and movement */}
      <div className="absolute top-0 left-0 right-0 h-full z-0">
        <svg
          className="absolute top-0 left-0 w-full h-full"
          viewBox="0 0 1200 800"
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
            <linearGradient id="rainbowGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#EC4899" />
              <stop offset="25%" stopColor="#F97316" />
              <stop offset="50%" stopColor="#3B82F6" />
              <stop offset="75%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>
          </defs>
          {/* Animated wavy gradient layers with more swing */}
          <path
            d="M0,0 L1200,0 L1200,60 Q1000,80 800,120 Q600,160 400,140 Q200,120 0,380 Z"
            fill="url(#rainbowGradient)"
            opacity="0.18"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; 20,-10; 0,0; -20,10; 0,0"
              dur="8s"
              repeatCount="indefinite"
            />
          </path>
          <path
            d="M0,0 L1200,0 L1200,80 Q900,60 700,140 Q500,220 300,180 Q150,140 0,420 Z"
            fill="url(#rainbowGradient2)"
            opacity="0.15"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; -15,5; 0,0; 25,-8; 0,0"
              dur="10s"
              repeatCount="indefinite"
            />
          </path>
          <path
            d="M0,0 L1200,0 L1200,100 Q850,140 650,110 Q450,80 250,160 Q100,240 0,360 Z"
            fill="url(#rainbowGradient)"
            opacity="0.12"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; 30,15; 0,0; -10,-5; 0,0"
              dur="12s"
              repeatCount="indefinite"
            />
          </path>
          {/* Additional flowing wave */}
          <path
            d="M0,0 L1200,0 L1200,120 Q1050,100 850,160 Q650,220 450,200 Q250,180 50,240 Q25,260 0,300 Z"
            fill="url(#rainbowGradient2)"
            opacity="0.08"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; -25,-12; 0,0; 15,8; 0,0"
              dur="15s"
              repeatCount="indefinite"
            />
          </path>
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
              {/* Desktop Mockup */}
              <DesktopMockup />
              
              {/* Floating Company Logos */}
              <FloatingCompanyLogos />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;