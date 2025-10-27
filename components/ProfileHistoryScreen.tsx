import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import { Progress } from "./ui/progress";
import { 
  Brain, 
  ArrowLeft, 
  Calendar, 
  TrendingUp, 
  TrendingDown,
  Bell,
  Clock,
  Heart,
  Zap,
  MessageCircle,
  Target,
  Award,
  Activity,
  Eye,
  Waves
} from "lucide-react";

interface ProfileHistoryScreenProps {
  onBack: () => void;
  onStartNewTest: () => void;
}

// Enhanced session data with more psychological insights
const sessionHistory = [
  {
    id: 1,
    date: '2024-01-15',
    time: '14:30',
    emotional: 72,
    cognitive: 68,
    speech: 85,
    neuralComplexity: 78,
    stressLevel: 32,
    type: ['typing', 'voice'],
    trend: 'up',
    insights: ['High creativity burst', 'Emotional clarity'],
    mood: 'Focused & Creative'
  },
  {
    id: 2,
    date: '2024-01-08',
    time: '09:15',
    emotional: 65,
    cognitive: 71,
    speech: 82,
    neuralComplexity: 74,
    stressLevel: 45,
    type: ['typing'],
    trend: 'stable',
    insights: ['Analytical thinking dominant', 'Mild cognitive load'],
    mood: 'Analytical & Calm'
  },
  {
    id: 3,
    date: '2024-01-01',
    time: '16:45',
    emotional: 58,
    cognitive: 64,
    speech: 78,
    neuralComplexity: 69,
    stressLevel: 58,
    type: ['typing', 'voice'],
    trend: 'down',
    insights: ['Stress indicators present', 'Reduced flow state'],
    mood: 'Contemplative & Tense'
  },
  {
    id: 4,
    date: '2023-12-25',
    time: '11:20',
    emotional: 71,
    cognitive: 69,
    speech: 80,
    neuralComplexity: 72,
    stressLevel: 28,
    type: ['typing'],
    trend: 'up',
    insights: ['Holiday positivity', 'Relaxed cognitive state'],
    mood: 'Joyful & Relaxed'
  }
];

// Enhanced trend chart with multiple neural metrics
function AdvancedTrendChart() {
  return (
    <div className="h-64 p-6">
      <svg viewBox="0 0 400 180" className="w-full h-full">
        <defs>
          <linearGradient id="emotionalGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{stopColor:"#3b82f6", stopOpacity:0.4}} />
            <stop offset="100%" style={{stopColor:"#3b82f6", stopOpacity:0}} />
          </linearGradient>
          <linearGradient id="cognitiveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{stopColor:"#8b5cf6", stopOpacity:0.4}} />
            <stop offset="100%" style={{stopColor:"#8b5cf6", stopOpacity:0}} />
          </linearGradient>
          <linearGradient id="stressGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{stopColor:"#ef4444", stopOpacity:0.4}} />
            <stop offset="100%" style={{stopColor:"#ef4444", stopOpacity:0}} />
          </linearGradient>
        </defs>
        
        {/* Grid */}
        {[30, 60, 90, 120, 150].map(y => (
          <line key={y} x1="40" y1={y} x2="360" y2={y} stroke="#374151" strokeWidth="1" opacity="0.3" />
        ))}
        
        {/* Emotional trend area */}
        <path
          d="M60,140 L120,125 L180,145 L240,130 L300,120 L300,180 L60,180 Z"
          fill="url(#emotionalGradient)"
        />
        
        {/* Cognitive trend area */}
        <path
          d="M60,135 L120,120 L180,138 L240,132 L300,125 L300,180 L60,180 Z"
          fill="url(#cognitiveGradient)"
        />
        
        {/* Stress indicators (inverted) */}
        <path
          d="M60,160 L120,150 L180,170 L240,155 L300,165 L300,180 L60,180 Z"
          fill="url(#stressGradient)"
        />
        
        {/* Emotional trend line */}
        <polyline
          fill="none"
          stroke="#3b82f6"
          strokeWidth="3"
          points="60,140 120,125 180,145 240,130 300,120"
        />
        
        {/* Cognitive trend line */}
        <polyline
          fill="none"
          stroke="#8b5cf6"
          strokeWidth="3"
          points="60,135 120,120 180,138 240,132 300,125"
        />
        
        {/* Speech clarity line */}
        <polyline
          fill="none"
          stroke="#10b981"
          strokeWidth="3"
          points="60,100 120,105 180,103 240,107 300,95"
        />
        
        {/* Data points with enhanced styling */}
        {[60, 120, 180, 240, 300].map((x, index) => {
          const emotionalY = [140, 125, 145, 130, 120][index];
          const cognitiveY = [135, 120, 138, 132, 125][index];
          const speechY = [100, 105, 103, 107, 95][index];
          
          return (
            <g key={index}>
              <circle cx={x} cy={emotionalY} r="4" fill="#3b82f6" stroke="#1e293b" strokeWidth="2" />
              <circle cx={x} cy={cognitiveY} r="4" fill="#8b5cf6" stroke="#1e293b" strokeWidth="2" />
              <circle cx={x} cy={speechY} r="4" fill="#10b981" stroke="#1e293b" strokeWidth="2" />
            </g>
          );
        })}
        
        {/* Neural complexity overlay */}
        <polyline
          fill="none"
          stroke="#f59e0b"
          strokeWidth="2"
          strokeDasharray="5,5"
          points="60,130 120,115 180,135 240,125 300,118"
        />
      </svg>
    </div>
  );
}

// Neural achievement component
function NeuralAchievement({ title, description, progress, icon: Icon }: {
  title: string;
  description: string;
  progress: number;
  icon: React.ElementType;
}) {
  return (
    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg border border-white/10">
      <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-2 rounded-lg">
        <Icon className="h-5 w-5 text-white" />
      </div>
      <div className="flex-1">
        <h4 className="font-medium text-white">{title}</h4>
        <p className="text-xs text-blue-200 mb-2">{description}</p>
        <Progress value={progress} className="h-1" />
      </div>
      <span className="text-sm font-bold text-blue-300">{progress}%</span>
    </div>
  );
}

export function ProfileHistoryScreen({ onBack, onStartNewTest }: ProfileHistoryScreenProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d');
  
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-400" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-400" />;
      default:
        return <div className="h-4 w-4 bg-blue-400 rounded-full"></div>;
    }
  };

  const getScoreBadgeColor = (score: number) => {
    if (score >= 80) return 'bg-green-500/20 text-green-300 border-green-400/30';
    if (score >= 60) return 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30';
    return 'bg-red-500/20 text-red-300 border-red-400/30';
  };

  const getMoodColor = (mood: string) => {
    if (mood.includes('Creative') || mood.includes('Joyful')) return 'text-green-300';
    if (mood.includes('Tense') || mood.includes('Stress')) return 'text-red-300';
    return 'text-blue-300';
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
                <p className="text-sm text-blue-200">Neural Evolution Tracking</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs text-blue-200 bg-blue-900/30 px-3 py-1 rounded-full border border-blue-400/30">
              <Activity className="h-3 w-3" />
              <span>Neural Score: 74.2</span>
            </div>
            <Button
              onClick={onStartNewTest}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              New Neural Scan
            </Button>
          </div>
        </div>
      </header>

      <main className="p-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Enhanced Trends Chart */}
            <Card className="p-6 border border-white/20 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Neural Evolution Timeline</h2>
                <div className="flex gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-blue-200">Emotional</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="text-purple-200">Cognitive</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-green-200">Clarity</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full border-dashed border-2 border-yellow-500"></div>
                    <span className="text-yellow-200">Complexity</span>
                  </div>
                </div>
              </div>
              <AdvancedTrendChart />
            </Card>

            {/* Enhanced Session History */}
            <Card className="p-6 border border-white/20 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm">
              <h2 className="text-xl font-semibold text-white mb-6">Neural Session Archive</h2>
              <div className="space-y-4">
                {sessionHistory.map((session) => (
                  <div key={session.id} className="p-5 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-200">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-blue-400" />
                          <div className="text-sm">
                            <p className="font-medium text-white">{new Date(session.date).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric',
                              year: 'numeric'
                            })}</p>
                            <p className="text-blue-200">{session.time}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {session.type.includes('typing') && (
                            <Badge variant="outline" className="bg-blue-500/20 text-blue-300 border-blue-400/30 text-xs">
                              Neural Typing
                            </Badge>
                          )}
                          {session.type.includes('voice') && (
                            <Badge variant="outline" className="bg-purple-500/20 text-purple-300 border-purple-400/30 text-xs">
                              Voice Pattern
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-medium ${getMoodColor(session.mood)}`}>
                          {session.mood}
                        </span>
                        {getTrendIcon(session.trend)}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Heart className="h-3 w-3 text-blue-400" />
                          <span className="text-xs text-blue-200">Emotional</span>
                        </div>
                        <Badge className={getScoreBadgeColor(session.emotional)}>
                          {session.emotional}
                        </Badge>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Zap className="h-3 w-3 text-purple-400" />
                          <span className="text-xs text-purple-200">Cognitive</span>
                        </div>
                        <Badge className={getScoreBadgeColor(session.cognitive)}>
                          {session.cognitive}
                        </Badge>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Waves className="h-3 w-3 text-green-400" />
                          <span className="text-xs text-green-200">Clarity</span>
                        </div>
                        <Badge className={getScoreBadgeColor(session.speech)}>
                          {session.speech}
                        </Badge>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Eye className="h-3 w-3 text-yellow-400" />
                          <span className="text-xs text-yellow-200">Complexity</span>
                        </div>
                        <Badge className={getScoreBadgeColor(session.neuralComplexity)}>
                          {session.neuralComplexity}
                        </Badge>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Target className="h-3 w-3 text-red-400" />
                          <span className="text-xs text-red-200">Stress</span>
                        </div>
                        <Badge className={getScoreBadgeColor(100 - session.stressLevel)}>
                          {100 - session.stressLevel}
                        </Badge>
                      </div>
                    </div>

                    <div className="text-xs">
                      <p className="text-blue-200 mb-1">Neural Insights:</p>
                      <div className="flex flex-wrap gap-2">
                        {session.insights.map((insight, index) => (
                          <span key={index} className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded border border-blue-400/30">
                            {insight}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Enhanced Sidebar */}
          <div className="space-y-6">
            {/* Neural Dashboard */}
            <Card className="p-6 border border-white/20 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm">
              <h3 className="font-semibold mb-4 text-white">Neural Dashboard</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-200">Total Scans</span>
                  <span className="font-bold text-white">{sessionHistory.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-200">Peak Neural Score</span>
                  <Badge className="bg-green-500/20 text-green-300">85</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-200">30-day Average</span>
                  <span className="font-bold text-white">74.2</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-200">Evolution Trend</span>
                  <div className="flex items-center gap-1 text-green-400">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm font-medium">Ascending</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-200">Neural Stability</span>
                  <span className="font-bold text-blue-300">92%</span>
                </div>
              </div>
            </Card>

            {/* Neural Achievements */}
            <Card className="p-6 border border-white/20 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <Award className="h-5 w-5 text-yellow-400" />
                <h3 className="font-semibold text-white">Neural Achievements</h3>
              </div>
              
              <div className="space-y-4">
                <NeuralAchievement
                  title="Consistency Master"
                  description="Complete 10 neural scans"
                  progress={40}
                  icon={Target}
                />
                <NeuralAchievement
                  title="Emotional Intelligence"
                  description="Achieve 80+ emotional score"
                  progress={85}
                  icon={Heart}
                />
                <NeuralAchievement
                  title="Cognitive Flow State"
                  description="Maintain high cognitive scores"
                  progress={65}
                  icon={Zap}
                />
              </div>
            </Card>

            {/* Enhanced Notifications */}
            <Card className="p-6 border border-white/20 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white">Neural Monitoring</h3>
                <Bell className="h-5 w-5 text-blue-400" />
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-200">Weekly neural scans</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-200">Mood pattern alerts</span>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-200">Cognitive load warnings</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-200">Achievement notifications</span>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="flex items-center gap-2 text-sm text-blue-200">
                  <Clock className="h-4 w-4" />
                  <span>Next optimal scan time: Tomorrow 2:00 PM</span>
                </div>
              </div>
            </Card>

            {/* AI Insights */}
            <Card className="p-6 border border-white/20 bg-gradient-to-b from-purple-500/20 to-blue-500/20 backdrop-blur-sm">
              <h3 className="font-semibold mb-3 text-white">AI Neural Insights</h3>
              <p className="text-sm text-blue-100 mb-4 leading-relaxed">
                Your neural patterns show a 23% improvement in emotional regulation over the past month. 
                The AI detected increased creative bursts during afternoon sessions.
              </p>
              <Button variant="outline" size="sm" className="w-full border-white/20 text-white hover:bg-white/10">
                Generate Detailed Report
              </Button>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}