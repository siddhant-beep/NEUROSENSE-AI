import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Brain, Mic, MicOff, ArrowLeft, Clock, Type, BarChart3, Zap, Activity, Eye } from "lucide-react";

interface TypingInputScreenProps {
  onBack: () => void;
  onSubmitAnalysis: () => void;
}

// Real-time neural activity visualization
function NeuralActivityBar({ activity }: { activity: number }) {
  return (
    <div className="flex items-center gap-1 h-8">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className={`w-1 rounded-sm transition-all duration-200 ${
            i < activity ? 'bg-blue-500' : 'bg-gray-300'
          }`}
          style={{ height: `${Math.max(4, (i + 1) * 3)}px` }}
        />
      ))}
    </div>
  );
}

// Cognitive load indicator
function CognitiveLoadMeter({ load }: { load: number }) {
  const getLoadColor = (load: number) => {
    if (load < 30) return 'text-green-500';
    if (load < 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getLoadLabel = (load: number) => {
    if (load < 30) return 'Relaxed';
    if (load < 70) return 'Engaged';
    return 'Intense';
  };

  return (
    <div className="flex items-center gap-3">
      <div className="relative w-16 h-16">
        <svg className="w-16 h-16 transform -rotate-90">
          <circle
            cx="32"
            cy="32"
            r="28"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            className="text-gray-200"
          />
          <circle
            cx="32"
            cy="32"
            r="28"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            strokeDasharray={`${2 * Math.PI * 28}`}
            strokeDashoffset={`${2 * Math.PI * 28 * (1 - load / 100)}`}
            className={getLoadColor(load)}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-xs font-bold ${getLoadColor(load)}`}>
            {Math.round(load)}%
          </span>
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-900">{getLoadLabel(load)}</p>
        <p className="text-xs text-gray-500">Cognitive Load</p>
      </div>
    </div>
  );
}

export function TypingInputScreen({ onBack, onSubmitAnalysis }: TypingInputScreenProps) {
  const [text, setText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wordCount, setWordCount] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [cognitiveLoad, setCognitiveLoad] = useState(0);
  const [neuralActivity, setNeuralActivity] = useState(0);
  const [typingPatterns, setTypingPatterns] = useState<string[]>([]);

  // Enhanced typing analysis
  useEffect(() => {
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
    
    if (!startTime && text.length > 0) {
      setStartTime(Date.now());
    }

    // Simulate cognitive load based on typing patterns
    const recentChars = text.slice(-10);
    const pauseIndicators = recentChars.match(/[.]{2,}|[\s]{2,}/g) || [];
    const load = Math.min(100, (words.length * 2) + (pauseIndicators.length * 10) + Math.random() * 20);
    setCognitiveLoad(load);

    // Simulate neural activity
    const activity = Math.floor(Math.random() * 8) + 2;
    setNeuralActivity(activity);

    // Detect interesting patterns
    const patterns = [];
    if (text.includes('...')) patterns.push('Contemplative pauses detected');
    if (text.match(/[!]{2,}/)) patterns.push('High emotional intensity');
    if (words.length > 50 && text.match(/\b(stress|anxiety|worry)\b/i)) patterns.push('Stress indicators found');
    if (text.match(/\b(I feel|I think|I believe)\b/gi)?.length > 3) patterns.push('High introspection');
    
    setTypingPatterns(patterns);
  }, [text, startTime]);

  // Recording timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= 30) {
            setIsRecording(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setRecordingTime(0);
  };

  const handleSubmit = () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    
    const analysisSteps = [
      'Analyzing keystroke dynamics...',
      'Processing neural patterns...',
      'Evaluating cognitive markers...',
      'Detecting emotional undertones...',
      'Mapping personality indicators...',
      'Generating insights...',
      'Finalizing neural profile...'
    ];

    let stepIndex = 0;
    const progressInterval = setInterval(() => {
      setAnalysisProgress(prev => {
        const newProgress = prev + (100 / analysisSteps.length);
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            setIsAnalyzing(false);
            onSubmitAnalysis();
          }, 1000);
          return 100;
        }
        stepIndex++;
        return newProgress;
      });
    }, 800);
  };

  const typingTime = startTime ? Math.floor((Date.now() - startTime) / 1000) : 0;
  const wpm = typingTime > 0 ? Math.round((wordCount / typingTime) * 60) : 0;
  const currentAnalysisStep = Math.floor((analysisProgress / 100) * 7);
  const analysisSteps = [
    'Analyzing keystroke dynamics...',
    'Processing neural patterns...',
    'Evaluating cognitive markers...',
    'Detecting emotional undertones...',
    'Mapping personality indicators...',
    'Generating insights...',
    'Finalizing neural profile...'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      {/* Header */}
      <header className="p-6 border-b border-white/10 bg-black/20">
        <div className="flex items-center gap-4 max-w-5xl mx-auto">
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
              <p className="text-sm text-blue-200">Neural Input Capture</p>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <div className="text-xs text-blue-200 bg-blue-900/30 px-3 py-1 rounded-full border border-blue-400/30">
              <Activity className="h-3 w-3 inline mr-1" />
              Recording Active
            </div>
          </div>
        </div>
      </header>

      <main className="p-6 max-w-5xl mx-auto">
        {/* Enhanced Instructions */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-semibold text-white mb-3">
            Express Your Authentic Self
          </h2>
          <p className="text-blue-200 mb-4">
            Neural algorithms are analyzing micro-patterns as you type. Write naturally about anything - 
            thoughts, feelings, experiences, or observations.
          </p>
          <div className="flex justify-center items-center gap-4 text-sm text-blue-300">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              <span>40+ cognitive markers tracked</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              <span>Real-time neural analysis</span>
            </div>
          </div>
        </div>

        {/* Enhanced Input Area */}
        <Card className="p-8 shadow-2xl border border-white/20 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm mb-6">
          <div className="relative">
            <Textarea
              placeholder="Begin typing your thoughts... The AI will detect patterns in your keystroke rhythm, pause durations, word choices, and cognitive flow as you express yourself naturally."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-64 text-lg border-0 bg-transparent resize-none focus:ring-0 shadow-none text-white placeholder-blue-200/70"
              disabled={isAnalyzing}
            />
            
            {/* Enhanced Microphone Button */}
            <div className="absolute bottom-4 right-4">
              {isRecording ? (
                <Button
                  onClick={handleStopRecording}
                  className="bg-red-500 hover:bg-red-600 rounded-full p-4 shadow-lg animate-pulse"
                  size="sm"
                >
                  <MicOff className="h-6 w-6 text-white" />
                </Button>
              ) : (
                <Button
                  onClick={handleStartRecording}
                  variant="outline"
                  className="rounded-full p-4 border-2 border-blue-400/50 hover:bg-blue-500/20 bg-white/10 backdrop-blur-sm"
                  size="sm"
                >
                  <Mic className="h-6 w-6 text-blue-400" />
                </Button>
              )}
            </div>

            {/* Enhanced Recording Timer */}
            {isRecording && (
              <div className="absolute bottom-4 right-20 flex items-center gap-2 bg-red-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-red-400/30">
                <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-red-200">
                  {recordingTime}s / 30s
                </span>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/20">
            <span className="text-sm text-blue-200">
              Neural Voice Analysis (30 seconds)
            </span>
            <div className="text-sm text-blue-200">
              {text.length > 0 && `${text.length} characters analyzed`}
            </div>
          </div>
        </Card>

        {/* Enhanced Real-time Analytics */}
        {text.length > 0 && (
          <div className="grid md:grid-cols-4 gap-6 mb-6">
            <Card className="p-6 border border-white/20 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-500/20 p-2 rounded-lg border border-blue-400/30">
                    <Type className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-blue-200">Words</p>
                    <p className="text-2xl font-bold text-white">{wordCount}</p>
                  </div>
                </div>
              </div>
              <div className="text-xs text-blue-300">Neural lexicon mapping</div>
            </Card>

            <Card className="p-6 border border-white/20 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-500/20 p-2 rounded-lg border border-purple-400/30">
                    <Clock className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-blue-200">Duration</p>
                    <p className="text-2xl font-bold text-white">{typingTime}s</p>
                  </div>
                </div>
              </div>
              <div className="text-xs text-blue-300">Temporal analysis</div>
            </Card>

            <Card className="p-6 border border-white/20 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="bg-green-500/20 p-2 rounded-lg border border-green-400/30">
                    <BarChart3 className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm text-blue-200">WPM</p>
                    <p className="text-2xl font-bold text-white">{wpm}</p>
                  </div>
                </div>
              </div>
              <div className="text-xs text-blue-300">Cognitive velocity</div>
            </Card>

            <Card className="p-6 border border-white/20 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm">
              <CognitiveLoadMeter load={cognitiveLoad} />
            </Card>
          </div>
        )}

        {/* Neural Activity & Pattern Detection */}
        {text.length > 20 && (
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Card className="p-6 border border-white/20 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <Activity className="h-5 w-5 text-blue-400" />
                <h3 className="font-semibold text-white">Neural Activity</h3>
              </div>
              <NeuralActivityBar activity={neuralActivity} />
              <p className="text-xs text-blue-300 mt-2">Real-time cognitive pattern analysis</p>
            </Card>

            <Card className="p-6 border border-white/20 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <Brain className="h-5 w-5 text-purple-400" />
                <h3 className="font-semibold text-white">Pattern Detection</h3>
              </div>
              <div className="space-y-2">
                {typingPatterns.length > 0 ? (
                  typingPatterns.map((pattern, index) => (
                    <Badge key={index} variant="outline" className="text-xs bg-purple-500/20 text-purple-200 border-purple-400/30">
                      {pattern}
                    </Badge>
                  ))
                ) : (
                  <p className="text-xs text-blue-300">Collecting neural signatures...</p>
                )}
              </div>
            </Card>
          </div>
        )}

        {/* Enhanced Analysis Progress */}
        {isAnalyzing && (
          <Card className="p-8 border border-white/20 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm mb-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 relative">
                <div className="animate-spin rounded-full h-16 w-16 border-2 border-blue-500 border-t-transparent"></div>
                <Brain className="absolute inset-0 m-auto h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Deep Neural Analysis in Progress</h3>
              <p className="text-blue-200 text-sm mb-4">
                {analysisSteps[currentAnalysisStep] || 'Processing complete...'}
              </p>
            </div>
            <Progress value={analysisProgress} className="h-3 mb-4" />
            <div className="flex justify-between text-xs text-blue-300">
              <span>Neural Engine Processing</span>
              <span>{Math.round(analysisProgress)}% Complete</span>
            </div>
          </Card>
        )}

        {/* Enhanced Submit Button */}
        <div className="text-center">
          <Button
            onClick={handleSubmit}
            disabled={text.length < 50 || isAnalyzing}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 text-lg rounded-2xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 border border-blue-400/30 disabled:opacity-50 disabled:transform-none"
          >
            <Zap className="h-5 w-5 mr-2" />
            {isAnalyzing ? 'Analyzing Neural Patterns...' : 'Begin Deep Analysis'}
          </Button>
          {text.length < 50 && (
            <p className="text-sm text-blue-300 mt-3">
              🧠 Minimum 50 characters required for accurate neural pattern analysis
            </p>
          )}
        </div>
      </main>
    </div>
  );
}