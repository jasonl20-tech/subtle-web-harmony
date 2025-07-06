import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { ArrowRight, Clock, TrendingUp, BarChart, CreditCard, Users, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";


// Desktop Mockup Component with Animated Excel - Mobile optimized
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
    <div className="hidden lg:block absolute top-8 -right-32 z-10 animate-slide-in-right">
      {/* Desktop Monitor */}
      <div className="relative">
        {/* Monitor Screen with better styling */}
        <div className="w-[600px] h-[400px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-t-3xl p-3 shadow-2xl border-2 border-gray-700">
          <div className="w-full h-full bg-gradient-to-br from-white to-gray-50 rounded-t-2xl overflow-hidden shadow-inner border border-gray-200">
            {/* Excel Interface */}
            <div className="h-full flex flex-col">
              {/* Excel Toolbar - Enhanced */}
              <div className="bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 px-4 py-3 border-b border-gray-300 flex items-center space-x-3 shadow-sm">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full shadow-sm hover:bg-red-600 transition-colors"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-sm hover:bg-yellow-600 transition-colors"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full shadow-sm hover:bg-green-600 transition-colors"></div>
                </div>
                <div className="flex-1 text-center">
                  <span className="text-sm font-semibold text-gray-800 bg-white px-3 py-1 rounded shadow-sm">
                    📊 Arbeitsstunden_Juli_2025.xlsx
                  </span>
                </div>
              </div>

              {/* Excel Header - Enhanced */}
              <div className="bg-gradient-to-r from-green-600 via-green-500 to-green-600 text-white text-sm font-bold px-3 py-2 shadow-md">
                <div className="grid grid-cols-6 gap-2">
                  <div className="flex items-center space-x-1">
                    <span>📅</span>
                    <span>Datum</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>🕐</span>
                    <span>Start</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>🕕</span>
                    <span>Ende</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>⏸️</span>
                    <span>Pause</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>⏱️</span>
                    <span>Stunden</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>✅</span>
                    <span>Status</span>
                  </div>
                </div>
              </div>

              {/* Excel Data Rows - Enhanced */}
              <div className="flex-1 overflow-hidden bg-white">
                {excelData.map((row, index) => (
                  <div 
                    key={index}
                    className={`grid grid-cols-6 gap-2 px-3 py-2 text-sm border-b border-gray-100 transition-all duration-500 hover:bg-gray-50 ${
                      index === currentRow - 1 ? 'bg-blue-50 border-blue-200 shadow-sm' : 'bg-white'
                    }`}
                  >
                    <div className="font-medium text-gray-800">{row.date}</div>
                    <div className="text-gray-700">{row.start}</div>
                    <div className="text-gray-700">{row.end}</div>
                    <div className="text-gray-700">{row.break}</div>
                    <div className="font-bold text-green-600 bg-green-50 px-2 py-1 rounded text-center">{row.hours}h</div>
                    <div className={`font-medium px-2 py-1 rounded text-center text-xs ${
                      row.status === 'Erfasst' ? 'text-green-700 bg-green-100' :
                      row.status === 'Bearbeitung...' ? 'text-blue-700 bg-blue-100 animate-pulse' :
                      'text-gray-500 bg-gray-100'
                    }`}>
                      {row.status}
                    </div>
                  </div>
                ))}
                
                {/* Sum Row - Enhanced */}
                <div className="grid grid-cols-6 gap-2 px-3 py-3 text-sm bg-gradient-to-r from-gray-100 to-gray-200 border-t-2 border-gray-300 font-bold shadow-inner">
                  <div className="col-span-4 text-gray-800 flex items-center">
                    <span>📊 Gesamt:</span>
                  </div>
                  <div className="text-green-700 bg-green-100 px-2 py-1 rounded text-center">39.5h</div>
                  <div className="text-green-600 bg-green-100 px-2 py-1 rounded text-center">✅ Fertig</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Monitor Stand - Enhanced */}
        <div className="w-48 h-12 bg-gradient-to-b from-gray-400 to-gray-500 mx-auto rounded-b-xl shadow-lg"></div>
        <div className="w-64 h-4 bg-gradient-to-r from-gray-500 via-gray-400 to-gray-500 mx-auto rounded-full shadow-md"></div>
      </div>
    </div>
  );
}


// Tankstellen Logos Component - Animated and Mobile optimized
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
    <div className="mt-8 lg:mt-16">
      <p className="text-center text-gray-500 text-sm mb-6 lg:mb-8">
        Vertrauen von Unternehmen verschiedener Branchen
      </p>
      <div className="flex items-center justify-center space-x-6 sm:space-x-8 lg:space-x-12 flex-wrap gap-4 lg:gap-6">
        {tankstellen.map((station, index) => (
          <div 
            key={station.name}
            className="animate-fade-in opacity-60 hover:opacity-100 transition-all duration-500 hover:scale-110 cursor-pointer"
            style={{ 
              animationDelay: `${index * 200}ms`,
              animation: `fadeInUp 0.6s ease-out ${index * 200}ms both, float ${4 + index * 0.5}s ease-in-out infinite`
            }}
          >
            <div 
              className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-lg lg:rounded-xl flex items-center justify-center text-white font-bold text-xs shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
              style={{ backgroundColor: station.color }}
            >
              <div className="absolute inset-0 bg-white opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
              <span className="relative z-10 text-xs">{station.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const Hero = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (email.trim()) {
      // Store email in sessionStorage for the auth page
      sessionStorage.setItem('signup-email', email);
    }
    navigate('/auth');
  };

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
          viewBox="0 0 1400 800"
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
            d="M-100,0 L1500,0 L1500,60 Q1200,80 1000,120 Q800,160 600,140 Q400,120 200,380 Q100,400 -100,420 Z"
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
            d="M-100,0 L1500,0 L1500,80 Q1100,60 900,140 Q700,220 500,180 Q350,140 150,420 Q50,440 -100,460 Z"
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
            d="M-100,0 L1500,0 L1500,100 Q1050,140 850,110 Q650,80 450,160 Q300,240 100,360 Q0,380 -100,400 Z"
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
            d="M-100,0 L1500,0 L1500,120 Q1250,100 1050,160 Q850,220 650,200 Q450,180 250,240 Q125,260 25,300 Q0,320 -100,340 Z"
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
      <div className="relative z-10 pt-24 pb-8 lg:pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-6 lg:space-y-8 text-center lg:text-left">
              {/* Main Heading */}
              <div className="animate-fade-in-up">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Automatisierte
                  </span>
                  <span className="text-gray-900 hover:text-blue-600 transition-all duration-300 cursor-default hover:scale-105 inline-block">
                    {" "}Arbeitszeit-<br />erfassung
                  </span>
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {" "}für Ihr Gewerbe
                  </span>
                </h1>
              </div>

              {/* Subtitle */}
              <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Sparen Sie täglich Stunden mit automatisierten Arbeitszeitnachweisen. 
                  Upload → 5 Min warten → Fertiges PDF. DSGVO-konform und sofort einsatzbereit.
                </p>
              </div>

              {/* CTA Section */}
              <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <div className="flex flex-col sm:flex-row items-center gap-4 max-w-md mx-auto lg:mx-0">
                  <input
                    type="email"
                    placeholder="E-Mail-Adresse"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full sm:flex-1 px-4 sm:px-6 py-3 sm:py-4 rounded-full border border-gray-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                  />
                  <Button 
                    onClick={handleGetStarted}
                    className="w-full sm:w-auto bg-gray-900 hover:bg-gray-800 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 whitespace-nowrap"
                  >
                    <span>Jetzt registrieren</span>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                </div>
              </div>

              {/* Tankstellen Logos */}
              <div className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                <TankstellenLogos />
              </div>
            </div>

            {/* Right Content - Visualizations */}
            <div className="relative h-[300px] sm:h-[400px] lg:h-[600px] mt-8 lg:mt-0">
              {/* Desktop Mockup - Only on large screens */}
              <DesktopMockup />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;