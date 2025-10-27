import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { 
  Brain, 
  ArrowLeft, 
  Download, 
  RotateCcw, 
  TrendingUp,
  Heart,
  Zap,
  MessageCircle,
  AlertCircle,
  Eye,
  Shield,
  Target,
  Lightbulb,
  Waves
} from "lucide-react";

interface AnalysisResultsScreenProps {
  onBack: () => void;
  onRetest: () => void;
  onViewHistory: () => void;
}

// Enhanced Neural Network Radar Chart
function EnhancedRadarChart({ data }: { data: { label: string; value: number; color: string }[] }) {
  return (
    <div className="relative w-64 h-64 mx-auto">
      <svg viewBox="0 0 260 260" className="w-full h-full">
        <defs>
          {/* Glowing effect */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          {/* Neural grid pattern */}
          <pattern id="neuralGrid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="1" fill="#3b82f6" opacity="0.3"/>
          </pattern>
        </defs>
        
        {/* Background neural grid */}
        <rect width="260" height="260" fill="url(#neuralGrid)" opacity="0.2"/>
        
        {/* Concentric circles */}
        {[20, 40, 60, 80, 100].map((radius, i) => (
          <circle
            key={i}
            cx="130"
            cy="130"
            r={radius}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="1"
            opacity={0.3 - i * 0.05}
          />
        ))}
        
        {/* Axis lines */}
        {data.map((_, index) => {
          const angle = (index * 2 * Math.PI) / data.length - Math.PI / 2;
          const x2 = 130 + Math.cos(angle) * 100;
          const y2 = 130 + Math.sin(angle) * 100;
          return (
            <line
              key={`axis-${index}`}
              x1="130"
              y1="130"
              x2={x2}
              y2={y2}
              stroke="#3b82f6"
              strokeWidth="1"
              opacity="0.3"
            />
          );
        })}
        
        {/* Data points and connections */}
        {data.map((point, index) => {
          const angle = (index * 2 * Math.PI) / data.length - Math.PI / 2;
          const radius = (point.value / 100) * 100;
          const x = 130 + Math.cos(angle) * radius;
          const y = 130 + Math.sin(angle) * radius;
          
          return (
            <g key={point.label}>
              <circle 
                cx={x} 
                cy={y} 
                r="6" 
                fill={point.color} 
                filter="url(#glow)"
                opacity="0.8"
              />
              <text 
                x={130 + Math.cos(angle) * 120} 
                y={130 + Math.sin(angle) * 120} 
                textAnchor="middle" 
                className="text-xs fill-white font-medium"
                dy="0.35em"
              >
                {point.label}
              </text>
            </g>
          );
        })}
        
        {/* Connect the dots with glowing line */}
        <polygon
          points={data.map((point, index) => {
            const angle = (index * 2 * Math.PI) / data.length - Math.PI / 2;
            const radius = (point.value / 100) * 100;
            const x = 130 + Math.cos(angle) * radius;
            const y = 130 + Math.sin(angle) * radius;
            return `${x},${y}`;
          }).join(' ')}
          fill="rgba(59, 130, 246, 0.2)"
          stroke="#3b82f6"
          strokeWidth="3"
          filter="url(#glow)"
        />
        
        {/* Center neural core */}
        <circle cx="130" cy="130" r="8" fill="#3b82f6" opacity="0.8" filter="url(#glow)"/>
      </svg>
    </div>
  );
}

// Personality trait component
function PersonalityTrait({ trait, score, description }: { trait: string; score: number; description: string }) {
  return (
    <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
      <div className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white font-medium">{trait}</span>
          <span className="text-blue-300 font-bold">{score}%</span>
        </div>
        <Progress value={score} className="h-2 mb-2" />
        <p className="text-xs text-blue-200">{description}</p>
      </div>
    </div>
  );
}

export function AnalysisResultsScreen({ onBack, onRetest, onViewHistory }: AnalysisResultsScreenProps) {
  const [revealedInsights, setRevealedInsights] = useState<number>(0);
  
  // Enhanced mock data with more intriguing metrics
  const emotionalScore = 72;
  const cognitiveScore = 68;
  const speechScore = 85;
  const neuralComplexity = 78;
  const subconscious = 64;
  
  const radarData = [
    { label: 'Emotional', value: emotionalScore, color: '#3b82f6' },
    { label: 'Cognitive', value: cognitiveScore, color: '#8b5cf6' },
    { label: 'Clarity', value: speechScore, color: '#10b981' },
    { label: 'Intuition', value: neuralComplexity, color: '#f59e0b' },
    { label: 'Depth', value: subconscious, color: '#ef4444' },
  ];

  const personalityTraits = [
    { trait: 'Analytical Thinking', score: 85, description: 'Strong pattern recognition and logical processing' },
    { trait: 'Creative Expression', score: 72, description: 'Rich imaginative and innovative tendencies' },
    { trait: 'Emotional Intelligence', score: 78, description: 'High awareness of emotional nuances' },
    { trait: 'Stress Resilience', score: 64, description: 'Moderate ability to handle cognitive pressure' }
  ];

  const hiddenInsights = [
    "Your typing rhythm suggests a highly analytical mind with creative bursts",
    "Subconscious pauses indicate deep contemplative processing",
    "Language patterns reveal above-average emotional intelligence",
    "Cognitive load distribution shows efficient mental resource allocation"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setRevealedInsights(prev => (prev < hiddenInsights.length ? prev + 1 : prev));
    }, 2000);
    return () => clearInterval(timer);
  }, [hiddenInsights.length]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-500/20 border-green-400/30';
    if (score >= 60) return 'bg-yellow-500/20 border-yellow-400/30';
    return 'bg-red-500/20 border-red-400/30';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      {/* Header */}
      <header className="p-6 border-b border-white/10 bg-black/20">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onBack}
              className="p-2 text-white hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="gradient-neurosense p-2 rounded-lg">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-white">NeuroSense AI</h1>
                <p className="text-sm text-blue-200">Neural Analysis Complete</p>
              </div>
            </div>
          </div>
          <Button
            onClick={onViewHistory}
            variant="outline"
            size="sm"
            className="border-white/20 text-white hover:bg-white/10"
          >
            View Neural History
          </Button>
        </div>
      </header>

      <main className="p-6 max-w-7xl mx-auto">
        {/* Enhanced Title */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Your Neural Profile Report
          </h2>
          <p className="text-blue-200 mb-4">
            Deep analysis completed on {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
          <div className="flex justify-center items-center gap-6 text-sm">
            <div className="flex items-center gap-2 text-blue-300">
              <Shield className="h-4 w-4" />
              <span>42 neural markers analyzed</span>
            </div>
            <div className="flex items-center gap-2 text-purple-300">
              <Target className="h-4 w-4" />
              <span>97.3% analysis confidence</span>
            </div>
            <div className="flex items-center gap-2 text-green-300">
              <Eye className="h-4 w-4" />
              <span>Subconscious patterns detected</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Enhanced Score Cards */}
          <div className="lg:col-span-2 space-y-6">
            {/* Emotional Intelligence */}
            <Card className={`p-6 border-2 ${getScoreBg(emotionalScore)} backdrop-blur-sm`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-500/30 p-3 rounded-lg border border-blue-400/50">
                    <Heart className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-lg">Emotional Intelligence Index</h3>
                    <p className="text-sm text-blue-200">Advanced sentiment & empathy analysis</p>
                  </div>
                </div>
                <Badge variant="outline" className={`${getScoreColor(emotionalScore)} border-current`}>
                  {emotionalScore >= 80 ? 'Highly Empathetic' : emotionalScore >= 60 ? 'Emotionally Aware' : 'Developing'}
                </Badge>
              </div>
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-blue-200">Emotional Processing Depth</span>
                  <span className={`font-bold ${getScoreColor(emotionalScore)}`}>{emotionalScore}/100</span>
                </div>
                <Progress value={emotionalScore} className="h-3" />
              </div>
              <p className="text-sm text-blue-100 leading-relaxed">
                Your language patterns reveal sophisticated emotional awareness with strong empathetic resonance. 
                Neural pathways suggest high emotional intelligence and nuanced social understanding.
              </p>
            </Card>

            {/* Cognitive Architecture */}
            <Card className={`p-6 border-2 ${getScoreBg(cognitiveScore)} backdrop-blur-sm`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-500/30 p-3 rounded-lg border border-purple-400/50">
                    <Zap className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-lg">Cognitive Architecture Score</h3>
                    <p className="text-sm text-blue-200">Neural efficiency & processing patterns</p>
                  </div>
                </div>
                <Badge variant="outline" className={`${getScoreColor(cognitiveScore)} border-current`}>
                  {cognitiveScore >= 80 ? 'Highly Optimized' : cognitiveScore >= 60 ? 'Efficient' : 'Developing'}
                </Badge>
              </div>
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-blue-200">Mental Processing Efficiency</span>
                  <span className={`font-bold ${getScoreColor(cognitiveScore)}`}>{cognitiveScore}/100</span>
                </div>
                <Progress value={cognitiveScore} className="h-3" />
              </div>
              <p className="text-sm text-blue-100 leading-relaxed">
                Cognitive flow analysis reveals structured thinking patterns with optimal neural resource allocation. 
                Strong analytical capabilities balanced with creative processing bursts detected.
              </p>
            </Card>

            {/* Communication Clarity */}
            <Card className={`p-6 border-2 ${getScoreBg(speechScore)} backdrop-blur-sm`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-green-500/30 p-3 rounded-lg border border-green-400/50">
                    <Waves className="h-6 w-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-lg">Neural Communication Index</h3>
                    <p className="text-sm text-blue-200">Voice patterns & expression clarity</p>
                  </div>
                </div>
                <Badge variant="outline" className={`${getScoreColor(speechScore)} border-current`}>
                  {speechScore >= 80 ? 'Exceptionally Clear' : speechScore >= 60 ? 'Articulate' : 'Developing'}
                </Badge>
              </div>
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-blue-200">Expression Coherence</span>
                  <span className={`font-bold ${getScoreColor(speechScore)}`}>{speechScore}/100</span>
                </div>
                <Progress value={speechScore} className="h-3" />
              </div>
              <p className="text-sm text-blue-100 leading-relaxed">
                Exceptional neural-linguistic coherence detected. Voice spectral analysis reveals confident expression 
                with minimal cognitive interference and strong communicative intent.
              </p>
            </Card>

            {/* Personality Insights */}
            <Card className="p-6 border border-white/20 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-6">
                <Lightbulb className="h-6 w-6 text-yellow-400" />
                <h3 className="font-semibold text-white text-lg">Hidden Personality Traits</h3>
              </div>
              <div className="space-y-4">
                {personalityTraits.map((trait, index) => (
                  <PersonalityTrait key={index} {...trait} />
                ))}
              </div>
            </Card>
          </div>

          {/* Enhanced Sidebar */}
          <div className="space-y-6">
            {/* Neural Network Visualization */}
            <Card className="p-6 border border-white/20 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm">
              <h3 className="font-semibold text-center mb-4 text-white">Neural Pattern Map</h3>
              <EnhancedRadarChart data={radarData} />
              <div className="mt-4 text-center">
                <p className="text-sm text-blue-200">
                  Multi-dimensional cognitive fingerprint analysis
                </p>
              </div>
            </Card>

            {/* Hidden Insights Reveal */}
            <Card className="p-6 border border-white/20 bg-gradient-to-b from-blue-500/20 to-purple-500/20 backdrop-blur-sm">
              <div className="flex items-start gap-3 mb-4">
                <Eye className="h-5 w-5 text-blue-400 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-white">Subconscious Insights</h3>
                  <p className="text-xs text-blue-200">Neural patterns below conscious awareness</p>
                </div>
              </div>
              <div className="space-y-3">
                {hiddenInsights.slice(0, revealedInsights).map((insight, index) => (
                  <div key={index} className="flex items-start gap-2 animate-fade-in">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-blue-100">{insight}</p>
                  </div>
                ))}
                {revealedInsights < hiddenInsights.length && (
                  <div className="flex items-center gap-2 text-blue-300">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <p className="text-sm animate-pulse">Revealing deeper patterns...</p>
                  </div>
                )}
              </div>
            </Card>

            {/* Risk Assessment */}
            <Card className="p-6 border border-white/20 bg-gradient-to-b from-orange-500/20 to-red-500/20 backdrop-blur-sm">
              <div className="flex items-start gap-3 mb-4">
                <AlertCircle className="h-5 w-5 text-orange-400 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-white">Neural Health Assessment</h3>
                </div>
              </div>
              <p className="text-sm text-orange-100 mb-4">
                Cognitive load patterns suggest mild mental fatigue. Neural pathways show healthy resilience 
                with areas for optimization through targeted mindfulness practices.
              </p>
              <div className="text-sm text-orange-200">
                <p className="font-medium mb-2">AI Recommendations:</p>
                <ul className="space-y-1 text-xs">
                  <li>• Implement 10-minute meditation breaks</li>
                  <li>• Practice cognitive load balancing techniques</li>
                  <li>• Consider neural feedback training</li>
                  <li>• Monitor stress response patterns</li>
                </ul>
              </div>
            </Card>
          </div>
        </div>

        {/* Enhanced Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mt-10">
          <Button
            variant="outline"
            className="flex items-center gap-2 border-white/20 text-white hover:bg-white/10"
          >
            <Download className="h-4 w-4" />
            Download Neural Profile
          </Button>
          <Button
            onClick={onRetest}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <RotateCcw className="h-4 w-4" />
            Reanalyze Patterns
          </Button>
          <Button
            onClick={onViewHistory}
            variant="outline"
            className="flex items-center gap-2 border-white/20 text-white hover:bg-white/10"
          >
            <TrendingUp className="h-4 w-4" />
            Track Neural Evolution
          </Button>
        </div>
      </main>
    </div>
  );
}