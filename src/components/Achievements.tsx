import React from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Award, 
  Star, 
  Target, 
  Flame, 
  Brain, 
  Clock, 
  BookOpen,
  Zap,
  Crown,
  Medal,
  Shield,
  Lock
} from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  category: 'study' | 'quiz' | 'streak' | 'time' | 'special';
  unlockedDate?: string;
  xpReward: number;
}

const Achievements: React.FC = () => {
  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'First Steps',
      description: 'Complete your first study session',
      icon: <BookOpen className="w-6 h-6" />,
      unlocked: true,
      progress: 1,
      maxProgress: 1,
      rarity: 'common',
      category: 'study',
      unlockedDate: '2025-06-15',
      xpReward: 100
    },
    {
      id: '2',
      title: 'Quiz Master',
      description: 'Score 90% or higher on 10 quizzes',
      icon: <Brain className="w-6 h-6" />,
      unlocked: true,
      progress: 10,
      maxProgress: 10,
      rarity: 'rare',
      category: 'quiz',
      unlockedDate: '2025-06-20',
      xpReward: 250
    },
    {
      id: '3',
      title: 'Study Streak',
      description: 'Study for 7 consecutive days',
      icon: <Flame className="w-6 h-6" />,
      unlocked: true,
      progress: 7,
      maxProgress: 7,
      rarity: 'rare',
      category: 'streak',
      unlockedDate: '2025-06-22',
      xpReward: 300
    },
    {
      id: '4',
      title: 'Time Warrior',
      description: 'Complete 50 hours of focused study',
      icon: <Clock className="w-6 h-6" />,
      unlocked: false,
      progress: 23,
      maxProgress: 50,
      rarity: 'epic',
      category: 'time',
      xpReward: 500
    },
    {
      id: '5',
      title: 'Flashcard Hero',
      description: 'Review 1000 flashcards',
      icon: <Zap className="w-6 h-6" />,
      unlocked: false,
      progress: 342,
      maxProgress: 1000,
      rarity: 'epic',
      category: 'study',
      xpReward: 400
    },
    {
      id: '6',
      title: 'Perfect Score',
      description: 'Achieve 100% on any quiz',
      icon: <Star className="w-6 h-6" />,
      unlocked: false,
      progress: 0,
      maxProgress: 1,
      rarity: 'rare',
      category: 'quiz',
      xpReward: 200
    },
    {
      id: '7',
      title: 'Marathon Learner',
      description: 'Study for 30 consecutive days',
      icon: <Shield className="w-6 h-6" />,
      unlocked: false,
      progress: 15,
      maxProgress: 30,
      rarity: 'epic',
      category: 'streak',
      xpReward: 750
    },
    {
      id: '8',
      title: 'Knowledge Emperor',
      description: 'Complete all available courses',
      icon: <Crown className="w-6 h-6" />,
      unlocked: false,
      progress: 2,
      maxProgress: 5,
      rarity: 'legendary',
      category: 'special',
      xpReward: 1000
    },
    {
      id: '9',
      title: 'Speed Demon',
      description: 'Complete a quiz in under 2 minutes',
      icon: <Zap className="w-6 h-6" />,
      unlocked: false,
      progress: 0,
      maxProgress: 1,
      rarity: 'rare',
      category: 'quiz',
      xpReward: 250
    },
    {
      id: '10',
      title: 'Dedication Medal',
      description: 'Study for 100 total hours',
      icon: <Medal className="w-6 h-6" />,
      unlocked: false,
      progress: 67,
      maxProgress: 100,
      rarity: 'legendary',
      category: 'time',
      xpReward: 1500
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'from-gray-400 to-gray-600';
      case 'rare': return 'from-blue-400 to-blue-600';
      case 'epic': return 'from-purple-400 to-purple-600';
      case 'legendary': return 'from-yellow-400 to-orange-500';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-300 dark:border-gray-600';
      case 'rare': return 'border-blue-300 dark:border-blue-600';
      case 'epic': return 'border-purple-300 dark:border-purple-600';
      case 'legendary': return 'border-yellow-300 dark:border-yellow-600';
      default: return 'border-gray-300 dark:border-gray-600';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'study': return <BookOpen className="w-4 h-4" />;
      case 'quiz': return <Brain className="w-4 h-4" />;
      case 'streak': return <Flame className="w-4 h-4" />;
      case 'time': return <Clock className="w-4 h-4" />;
      case 'special': return <Crown className="w-4 h-4" />;
      default: return <Target className="w-4 h-4" />;
    }
  };

  const totalAchievements = achievements.length;
  const unlockedAchievements = achievements.filter(a => a.unlocked).length;
  const totalXP = achievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.xpReward, 0);
  const overallProgress = (unlockedAchievements / totalAchievements) * 100;

  const categories = ['all', 'study', 'quiz', 'streak', 'time', 'special'];
  const [selectedCategory, setSelectedCategory] = React.useState('all');

  const filteredAchievements = selectedCategory === 'all' 
    ? achievements 
    : achievements.filter(a => a.category === selectedCategory);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Achievements</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track your learning milestones and unlock rewards
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-yellow-600 dark:text-yellow-400">
          <Trophy className="w-4 h-4" />
          <span>{totalXP} XP Earned</span>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
              <Trophy className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{unlockedAchievements}</h3>
          <p className="text-gray-600 dark:text-gray-400">Achievements Unlocked</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{Math.round(overallProgress)}%</h3>
          <p className="text-gray-600 dark:text-gray-400">Overall Progress</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{totalXP}</h3>
          <p className="text-gray-600 dark:text-gray-400">Total XP</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            {achievements.filter(a => a.rarity === 'legendary' && a.unlocked).length}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">Legendary Unlocked</p>
        </div>
      </div>

      {/* Category Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {category !== 'all' && getCategoryIcon(category)}
              <span className="capitalize">{category}</span>
              <span className="text-xs opacity-75">
                ({category === 'all' ? achievements.length : achievements.filter(a => a.category === category).length})
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAchievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-white dark:bg-gray-800 rounded-xl p-6 border-2 ${getRarityBorder(achievement.rarity)} relative overflow-hidden ${
              achievement.unlocked ? '' : 'opacity-75'
            }`}
          >
            {/* Rarity Background */}
            <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${getRarityColor(achievement.rarity)} opacity-10 rounded-bl-3xl`} />
            
            {/* Lock Overlay for Locked Achievements */}
            {!achievement.unlocked && (
              <div className="absolute inset-0 bg-black/5 dark:bg-black/20 rounded-xl flex items-center justify-center">
                <div className="w-12 h-12 bg-gray-400 dark:bg-gray-600 rounded-full flex items-center justify-center">
                  <Lock className="w-6 h-6 text-white" />
                </div>
              </div>
            )}

            <div className="relative">
              {/* Achievement Icon */}
              <div className={`w-16 h-16 bg-gradient-to-br ${getRarityColor(achievement.rarity)} rounded-xl flex items-center justify-center text-white mb-4 ${
                achievement.unlocked ? '' : 'grayscale'
              }`}>
                {achievement.icon}
              </div>

              {/* Achievement Info */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900 dark:text-white">{achievement.title}</h4>
                  <div className="flex items-center gap-1">
                    {getCategoryIcon(achievement.category)}
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      achievement.rarity === 'legendary' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' :
                      achievement.rarity === 'epic' ? 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200' :
                      achievement.rarity === 'rare' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' :
                      'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                    }`}>
                      {achievement.rarity}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {achievement.description}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Progress
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {achievement.progress}/{achievement.maxProgress}
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className={`bg-gradient-to-r ${getRarityColor(achievement.rarity)} h-2 rounded-full transition-all duration-300`}
                    style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                  />
                </div>
              </div>

              {/* Reward & Date */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {achievement.xpReward} XP
                  </span>
                </div>
                {achievement.unlocked && achievement.unlockedDate && (
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Unlocked {achievement.unlockedDate}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Achievement Tips */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Trophy className="w-5 h-5" />
          Achievement Tips
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h4 className="font-medium mb-1">Stay Consistent</h4>
            <p className="text-sm text-blue-100">
              Daily study sessions help unlock streak-based achievements faster.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-1">Challenge Yourself</h4>
            <p className="text-sm text-blue-100">
              Take on difficult quizzes to unlock rare and epic achievements.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-1">Explore All Features</h4>
            <p className="text-sm text-blue-100">
              Use flashcards, timers, and different study methods for varied achievements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievements;