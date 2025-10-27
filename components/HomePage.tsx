import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Brain, Keyboard, Mic, Zap, Eye, Waves } from "lucide-react";

interface HomePageProps {
  onStartAnalysis: () => void;
}

// Animated neural network component
function NeuralNetwork() {
  const [connections, setConnections] = useState<Array<{id: number, opacity: number, delay: number}>>([]);

  useEffect(() => {
    const connectionData = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      opacity: Math.random(),
      delay: Math.random() * 3000
    }));
    setConnections(connectionData);

    const interval = setInterval(() => {
      setConnections(prev => prev.map(conn => ({
        ...conn,
        opacity: Math.random() * 0.8 + 0.2
      })));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg width="100%" height="100%" className="absolute inset-0">
        <defs>
          <radialGradient id="nodeGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.2"/>
          </radialGradient>
        </defs>
        
        {/* Neural nodes */}
        {Array.from({ length: 12 }).map((_, i) => {
          const x = (i % 4) * 25 + 10 + Math.sin(i) * 5;
          const y = Math.floor(i / 4) * 30 + 15 + Math.cos(i) * 5;
          return (
            <circle
              key={`node-${i}`}
              cx={`${x}%`}
              cy={`${y}%`}
              r="3"
              fill="url(#nodeGradient)"
              className="animate-pulse"
              style={{ animationDelay: `${i * 200}ms` }}
            />
          );
        })}
        
        {/* Neural connections */}
        {connections.map((conn, i) => {
          const startX = (i % 4) * 25 + 10;
          const startY = Math.floor(i / 4) * 30 + 15;
          const endX = ((i + 1) % 4) * 25 + 10;
          const endY = Math.floor((i + 1) / 4) * 30 + 15;
          
          return (
            <line
              key={`connection-${conn.id}`}
              x1={`${startX}%`}
              y1={`${startY}%`}
              x2={`${endX}%`}
              y2={`${endY}%`}
              stroke="#3b82f6"
              strokeWidth="1"
              opacity={conn.opacity}
              className="transition-opacity duration-1000"
            />
          );
        })}
      </svg>
    </div>
  );
}

export function HomePage({ onStartAnalysis }: HomePageProps) {
  const [currentInsight, setCurrentInsight] = useState(0);
  
  const insights = [
    "Your typing reveals 40+ cognitive markers",
    "Voice patterns unlock subconscious emotional states", 
    "Neural pathways change every 90 seconds of input",
    "AI detects micro-hesitations invisible to humans"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentInsight(prev => (prev + 1) % insights.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [insights.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 flex flex-col relative overflow-hidden">
      {/* Animated Neural Network Background */}
      <NeuralNetwork />
      
      {/* Header */}
      <header className="p-6 relative z-10">
        <div className="flex items-center gap-3 max-w-6xl mx-auto">
          <div className="gradient-neurosense p-2 rounded-lg shadow-lg">
            <Brain className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-xl font-semibold text-white">NeuroSense AI</h1>
          <div className="ml-auto text-xs text-blue-200 bg-blue-900/30 px-3 py-1 rounded-full border border-blue-400/30">
            Neural Engine v2.1 Active
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Hero Section */}
          <div className="mb-12">
            {/* Dynamic Insight Ticker */}
            <div className="mb-8 h-6">
              <p className="text-blue-200 text-sm animate-pulse">
                💡 {insights[currentInsight]}
              </p>
            </div>

            {/* Enhanced Illustrative Icon */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="glass-effect p-12 rounded-full shadow-2xl border border-white/20">
                  <Brain className="h-20 w-20 text-blue-400 animate-pulse" />
                  
                  {/* Orbiting elements */}
                  <div className="absolute inset-0 animate-spin" style={{ animationDuration: '20s' }}>
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-500/80 p-3 rounded-full shadow-lg">
                      <Keyboard className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  
                  <div className="absolute inset-0 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}>
                    <div className="absolute top-1/2 -right-3 transform -translate-y-1/2 bg-blue-500/80 p-3 rounded-full shadow-lg">
                      <Mic className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  
                  <div className="absolute inset-0 animate-spin" style={{ animationDuration: '25s' }}>
                    <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-green-500/80 p-3 rounded-full shadow-lg">
                      <Eye className="h-5 w-5 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Title */}
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              NeuroSense AI
            </h1>
            <h2 className="text-2xl md:text-4xl text-blue-100 mb-4">
              Decode Your Mind's Hidden Language
            </h2>
            
            {/* Enhanced Tagline */}
            <p className="text-lg text-blue-200 max-w-3xl mx-auto mb-10 leading-relaxed">
              Advanced neural pattern recognition reveals cognitive fingerprints invisible to the conscious mind. 
              Discover what your typing rhythm and voice inflections secretly reveal about your mental state.
            </p>

            {/* Enhanced CTA Button */}
            <Button 
              onClick={onStartAnalysis}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-5 text-lg rounded-2xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 border border-blue-400/30"
            >
              <Zap className="h-5 w-5 mr-2" />
              Begin Neural Analysis
            </Button>
          </div>

          {/* Enhanced Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="p-8 text-center border-0 shadow-2xl bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300 group">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Keyboard className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold mb-3 text-white text-lg">Cognitive Keystroke Analysis</h3>
              <p className="text-blue-200 text-sm leading-relaxed">
                AI-powered analysis of micro-pauses, rhythm patterns, and cognitive load indicators hidden in your typing behavior
              </p>
            </Card>

            <Card className="p-8 text-center border-0 shadow-2xl bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300 group">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Waves className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold mb-3 text-white text-lg">Neural Voice Mapping</h3>
              <p className="text-blue-200 text-sm leading-relaxed">
                Deep spectral analysis detects emotional undertones, stress markers, and cognitive state changes through voice patterns
              </p>
            </Card>

            <Card className="p-8 text-center border-0 shadow-2xl bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300 group">
              <div className="bg-gradient-to-br from-green-500 to-green-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold mb-3 text-white text-lg">Subconscious Pattern Recognition</h3>
              <p className="text-blue-200 text-sm leading-relaxed">
                Uncover personality traits, emotional patterns, and cognitive tendencies that operate below conscious awareness
              </p>
            </Card>
          </div>
        </div>
      </main>

      {/* Enhanced Footer */}
      <footer className="p-6 text-center border-t border-white/10 bg-black/20 relative z-10">
        <p className="text-blue-300 text-sm">
          🔒 All neural data remains encrypted and private. This is not a medical diagnosis.
        </p>
      </footer>
    </div>
  );
}