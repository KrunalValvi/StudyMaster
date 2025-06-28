import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Clock, 
  Coffee, 
  Brain, 
  Target,
  Settings,
  Volume2,
  VolumeX,
  Bell,
  CheckCircle
} from 'lucide-react';

interface Session {
  type: 'focus' | 'break' | 'longBreak';
  duration: number;
  completed: boolean;
}

const StudyTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [currentSession, setCurrentSession] = useState<'focus' | 'break' | 'longBreak'>('focus');
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [customDurations, setCustomDurations] = useState({
    focus: 25,
    shortBreak: 5,
    longBreak: 15
  });
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [dailyGoal, setDailyGoal] = useState(8); // sessions
  const [totalStudyTime, setTotalStudyTime] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const sessions: Session[] = [
    { type: 'focus', duration: customDurations.focus * 60, completed: false },
    { type: 'break', duration: customDurations.shortBreak * 60, completed: false },
    { type: 'focus', duration: customDurations.focus * 60, completed: false },
    { type: 'break', duration: customDurations.shortBreak * 60, completed: false },
    { type: 'focus', duration: customDurations.focus * 60, completed: false },
    { type: 'break', duration: customDurations.shortBreak * 60, completed: false },
    { type: 'focus', duration: customDurations.focus * 60, completed: false },
    { type: 'longBreak', duration: customDurations.longBreak * 60, completed: false },
  ];

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleSessionComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  const handleSessionComplete = () => {
    setIsRunning(false);
    if (soundEnabled && audioRef.current) {
      audioRef.current.play();
    }

    if (currentSession === 'focus') {
      setSessionsCompleted(prev => prev + 1);
      setTotalStudyTime(prev => prev + customDurations.focus);
      setCurrentStreak(prev => prev + 1);
    }

    // Auto-advance to next session
    const nextSessionIndex = sessionsCompleted % sessions.length;
    const nextSession = sessions[nextSessionIndex];
    setCurrentSession(nextSession.type);
    setTimeLeft(nextSession.duration);
  };

  const toggleTimer = () => {
    setIsRunning(prev => !prev);
  };

  const resetTimer = () => {
    setIsRunning(false);
    const sessionDuration = currentSession === 'focus' 
      ? customDurations.focus * 60
      : currentSession === 'break'
        ? customDurations.shortBreak * 60
        : customDurations.longBreak * 60;
    setTimeLeft(sessionDuration);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgress = () => {
    const totalDuration = currentSession === 'focus' 
      ? customDurations.focus * 60
      : currentSession === 'break'
        ? customDurations.shortBreak * 60
        : customDurations.longBreak * 60;
    return ((totalDuration - timeLeft) / totalDuration) * 100;
  };

  const getSessionColor = () => {
    switch (currentSession) {
      case 'focus': return 'from-blue-500 to-purple-600';
      case 'break': return 'from-green-500 to-blue-500';
      case 'longBreak': return 'from-orange-500 to-red-500';
      default: return 'from-blue-500 to-purple-600';
    }
  };

  const getSessionIcon = () => {
    switch (currentSession) {
      case 'focus': return <Brain className="w-8 h-8" />;
      case 'break': return <Coffee className="w-8 h-8" />;
      case 'longBreak': return <Coffee className="w-8 h-8" />;
      default: return <Brain className="w-8 h-8" />;
    }
  };

  const handleDurationChange = (type: keyof typeof customDurations, value: number) => {
    setCustomDurations(prev => ({ ...prev, [type]: value }));
    if (type === 'focus' && currentSession === 'focus') {
      setTimeLeft(value * 60);
    } else if (type === 'shortBreak' && currentSession === 'break') {
      setTimeLeft(value * 60);
    } else if (type === 'longBreak' && currentSession === 'longBreak') {
      setTimeLeft(value * 60);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Focus Timer</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Use the Pomodoro Technique to boost your productivity
          </p>
        </div>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Timer Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Focus Duration (minutes)
                </label>
                <input
                  type="number"
                  min="1"
                  max="60"
                  value={customDurations.focus}
                  onChange={(e) => handleDurationChange('focus', parseInt(e.target.value) || 25)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Short Break (minutes)
                </label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={customDurations.shortBreak}
                  onChange={(e) => handleDurationChange('shortBreak', parseInt(e.target.value) || 5)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Long Break (minutes)
                </label>
                <input
                  type="number"
                  min="1"
                  max="60"
                  value={customDurations.longBreak}
                  onChange={(e) => handleDurationChange('longBreak', parseInt(e.target.value) || 15)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="flex items-center gap-2 text-gray-600 dark:text-gray-400"
                >
                  {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  <span className="text-sm">Sound Notifications</span>
                </button>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-700 dark:text-gray-300">Daily Goal:</label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={dailyGoal}
                  onChange={(e) => setDailyGoal(parseInt(e.target.value) || 8)}
                  className="w-16 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">sessions</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Timer */}
      <div className="flex justify-center">
        <div className="relative">
          {/* Progress Ring */}
          <svg className="w-80 h-80 transform -rotate-90" viewBox="0 0 320 320">
            <circle
              cx="160"
              cy="160"
              r="140"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-gray-200 dark:text-gray-700"
            />
            <circle
              cx="160"
              cy="160"
              r="140"
              stroke="url(#gradient)"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={`${2 * Math.PI * 140}`}
              strokeDashoffset={`${2 * Math.PI * 140 * (1 - getProgress() / 100)}`}
              className="transition-all duration-1000 ease-in-out"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={currentSession === 'focus' ? '#3B82F6' : currentSession === 'break' ? '#10B981' : '#F59E0B'} />
                <stop offset="100%" stopColor={currentSession === 'focus' ? '#8B5CF6' : currentSession === 'break' ? '#3B82F6' : '#EF4444'} />
              </linearGradient>
            </defs>
          </svg>

          {/* Timer Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              key={currentSession}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`w-16 h-16 bg-gradient-to-r ${getSessionColor()} rounded-full flex items-center justify-center text-white mb-4`}
            >
              {getSessionIcon()}
            </motion.div>
            
            <div className="text-5xl font-mono font-bold text-gray-900 dark:text-white mb-2">
              {formatTime(timeLeft)}
            </div>
            
            <div className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-6">
              {currentSession === 'focus' ? 'Focus Time' : 
               currentSession === 'break' ? 'Short Break' : 'Long Break'}
            </div>

            <div className="flex gap-4">
              <button
                onClick={toggleTimer}
                className={`w-16 h-16 bg-gradient-to-r ${getSessionColor()} text-white rounded-full flex items-center justify-center hover:scale-105 transition-transform duration-200 shadow-lg`}
              >
                {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
              </button>
              
              <button
                onClick={resetTimer}
                className="w-16 h-16 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full flex items-center justify-center hover:scale-105 transition-transform duration-200"
              >
                <RotateCcw className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Session Progress */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Today's Progress</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{sessionsCompleted}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Sessions Completed</div>
          </div>
          <div className="text-center p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{Math.floor(totalStudyTime / 60)}h {totalStudyTime % 60}m</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Study Time</div>
          </div>
          <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{currentStreak}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Current Streak</div>
          </div>
          <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/30 rounded-lg">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{Math.round((sessionsCompleted / dailyGoal) * 100)}%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Daily Goal</div>
          </div>
        </div>

        {/* Session Timeline */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Session Timeline:</span>
        </div>
        <div className="flex gap-2">
          {sessions.map((session, index) => (
            <div
              key={index}
              className={`flex-1 h-3 rounded-full ${
                index < sessionsCompleted
                  ? session.type === 'focus'
                    ? 'bg-blue-500'
                    : 'bg-green-500'
                  : index === sessionsCompleted
                    ? session.type === 'focus'
                      ? 'bg-blue-300'
                      : 'bg-green-300'
                    : 'bg-gray-200 dark:bg-gray-700'
              }`}
            />
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
          <span>Focus</span>
          <span>Break</span>
          <span>Focus</span>
          <span>Break</span>
          <span>Focus</span>
          <span>Break</span>
          <span>Focus</span>
          <span>Long Break</span>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Target className="w-5 h-5" />
          Pomodoro Tips
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h4 className="font-medium mb-1">Stay Focused</h4>
            <p className="text-sm text-indigo-100">
              During focus sessions, avoid all distractions. Put your phone away and close unnecessary tabs.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-1">Take Real Breaks</h4>
            <p className="text-sm text-indigo-100">
              Use break time to rest your mind. Stand up, stretch, or take a short walk.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-1">Track Progress</h4>
            <p className="text-sm text-indigo-100">
              Review your daily sessions to identify patterns and optimize your study schedule.
            </p>
          </div>
        </div>
      </div>

      {/* Hidden audio element for notifications */}
      <audio
        ref={audioRef}
        preload="auto"
      >
        <source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhJGZBnp2Q4K2Ae3w=" type="audio/wav" />
      </audio>
    </div>
  );
};

export default StudyTimer;