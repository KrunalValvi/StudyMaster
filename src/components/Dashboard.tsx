import React from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, Award, Clock, Brain, BookOpen, Target, Flame, Calendar } from 'lucide-react';
import { studyProgressData, quizResultsData } from '../data/sampleData';

const Dashboard: React.FC = () => {
  // Prepare chart data
  const chartData = quizResultsData.map(result => ({
    date: result.date.slice(0, 5), // Show only day-month
    score: result.score,
    time: result.timeTaken
  }));

  const subjectData = studyProgressData.subjects.map(subject => ({
    name: subject.name,
    progress: subject.progress
  }));

  return (
    <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-4 lg:p-6 text-white flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div className="flex-1">
          <h1 className="text-xl lg:text-2xl font-bold mb-2">Welcome back, {studyProgressData.user.name}! 🎉</h1>
          <p className="text-blue-100 text-sm lg:text-base">Ready to continue your learning journey? You're doing amazing!</p>
        </div>
        <img 
          src="/white_circle_360x360.png" 
          alt="Bolt Logo"
          className="w-20 h-20 lg:w-[120px] lg:h-[120px] flex-shrink-0 self-center lg:self-auto"
        />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 lg:p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-3 lg:mb-4">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
              <Flame className="w-5 h-5 lg:w-6 lg:h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <TrendingUp className="w-4 h-4 lg:w-5 lg:h-5 text-green-500" />
          </div>
          <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">{studyProgressData.user.studyStreak}</h3>
          <p className="text-gray-600 dark:text-gray-400 text-xs lg:text-sm">Day Study Streak</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 lg:p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-3 lg:mb-4">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <TrendingUp className="w-4 h-4 lg:w-5 lg:h-5 text-green-500" />
          </div>
          <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">{studyProgressData.user.totalStudyHours}h</h3>
          <p className="text-gray-600 dark:text-gray-400 text-xs lg:text-sm">Total Study Time</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 lg:p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-3 lg:mb-4">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 lg:w-6 lg:h-6 text-green-600 dark:text-green-400" />
            </div>
            <TrendingUp className="w-4 h-4 lg:w-5 lg:h-5 text-green-500" />
          </div>
          <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">{studyProgressData.user.averageScore}%</h3>
          <p className="text-gray-600 dark:text-gray-400 text-xs lg:text-sm">Average Score</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 lg:p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-3 lg:mb-4">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 lg:w-6 lg:h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <TrendingUp className="w-4 h-4 lg:w-5 lg:h-5 text-green-500" />
          </div>
          <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">{studyProgressData.user.cardsReviewed}</h3>
          <p className="text-gray-600 dark:text-gray-400 text-xs lg:text-sm">Cards Reviewed</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
        {/* Performance Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 lg:p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quiz Performance</h3>
          <ResponsiveContainer width="100%" height={250} className="lg:h-[300px]">
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#6B7280" fontSize={12} />
              <YAxis stroke="#6B7280" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '14px'
                }}
              />
              <Area
                type="monotone"
                dataKey="score"
                stroke="#3B82F6"
                fill="url(#colorScore)"
                strokeWidth={2}
              />
              <defs>
                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Subject Progress */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 lg:p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Subject Progress</h3>
          <ResponsiveContainer width="100%" height={250} className="lg:h-[300px]">
            <BarChart data={subjectData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#6B7280" fontSize={12} />
              <YAxis stroke="#6B7280" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '14px'
                }}
              />
              <Bar dataKey="progress" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity & Upcoming */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 lg:p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
          <div className="space-y-3 lg:space-y-4">
            {quizResultsData.slice(0, 3).map((result, index) => (
              <div key={index} className="flex items-center gap-3 lg:gap-4">
                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-4 h-4 lg:w-5 lg:h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 dark:text-white text-sm lg:text-base truncate">{result.subject} Quiz</p>
                  <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">Score: {result.score}% • {result.date}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-base lg:text-lg font-semibold text-green-600">{result.score}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 lg:p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Achievements</h3>
          <div className="space-y-3 lg:space-y-4">
            {studyProgressData.achievements.map((achievement, index) => (
              <div key={index} className="flex items-center gap-3 lg:gap-4">
                <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  achievement.unlocked 
                    ? 'bg-yellow-100 dark:bg-yellow-900' 
                    : 'bg-gray-100 dark:bg-gray-700'
                }`}>
                  <Award className={`w-4 h-4 lg:w-5 lg:h-5 ${
                    achievement.unlocked 
                      ? 'text-yellow-600 dark:text-yellow-400' 
                      : 'text-gray-400'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-medium text-sm lg:text-base truncate ${
                    achievement.unlocked 
                      ? 'text-gray-900 dark:text-white' 
                      : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {achievement.name}
                  </p>
                  <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">
                    {achievement.unlocked ? 'Unlocked!' : 'Keep studying to unlock'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;