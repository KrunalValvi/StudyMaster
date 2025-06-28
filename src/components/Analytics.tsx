import React from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { TrendingUp, TrendingDown, Calendar, Clock, Target, Brain, BookOpen, Award, Zap, Users } from 'lucide-react';

const Analytics: React.FC = () => {
  // Sample data for charts
  const studyProgressData = [
    { date: '01/06', hours: 2.5, efficiency: 85, score: 78 },
    { date: '02/06', hours: 3.2, efficiency: 88, score: 82 },
    { date: '03/06', hours: 1.8, efficiency: 82, score: 75 },
    { date: '04/06', hours: 4.1, efficiency: 91, score: 88 },
    { date: '05/06', hours: 3.5, efficiency: 89, score: 85 },
    { date: '06/06', hours: 2.9, efficiency: 87, score: 83 },
    { date: '07/06', hours: 3.8, efficiency: 93, score: 91 }
  ];

  const subjectPerformance = [
    { subject: 'Psychology', completed: 75, accuracy: 88, timeSpent: 45 },
    { subject: 'Biology', completed: 62, accuracy: 82, timeSpent: 38 },
    { subject: 'History', completed: 89, accuracy: 91, timeSpent: 52 },
    { subject: 'Mathematics', completed: 58, accuracy: 76, timeSpent: 41 },
    { subject: 'Physics', completed: 71, accuracy: 84, timeSpent: 47 }
  ];

  const studyMethodData = [
    { method: 'Flashcards', value: 35, color: '#3B82F6' },
    { method: 'Quizzes', value: 28, color: '#10B981' },
    { method: 'Reading', value: 20, color: '#8B5CF6' },
    { method: 'Videos', value: 17, color: '#F59E0B' }
  ];

  const skillRadarData = [
    { skill: 'Memory', current: 85, target: 90 },
    { skill: 'Analysis', current: 78, target: 85 },
    { skill: 'Comprehension', current: 92, target: 95 },
    { skill: 'Speed', current: 74, target: 80 },
    { skill: 'Accuracy', current: 88, target: 90 },
    { skill: 'Retention', current: 81, target: 85 }
  ];

  const weeklyGoals = [
    { day: 'Mon', target: 3, achieved: 3.2 },
    { day: 'Tue', target: 3, achieved: 2.8 },
    { day: 'Wed', target: 3, achieved: 3.5 },
    { day: 'Thu', target: 3, achieved: 2.9 },
    { day: 'Fri', target: 3, achieved: 3.1 },
    { day: 'Sat', target: 4, achieved: 4.2 },
    { day: 'Sun', target: 4, achieved: 3.8 }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Study Analytics</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track your learning progress and performance insights
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
          <Brain className="w-4 h-4" />
          <span>AI-Powered Insights</span>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex items-center text-green-500">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span className="text-sm">+12%</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">23.8h</h3>
          <p className="text-gray-600 dark:text-gray-400">Weekly Study Time</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="flex items-center text-green-500">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span className="text-sm">+5%</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">88.5%</h3>
          <p className="text-gray-600 dark:text-gray-400">Average Accuracy</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="flex items-center text-red-500">
              <TrendingDown className="w-4 h-4 mr-1" />
              <span className="text-sm">-2%</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">342</h3>
          <p className="text-gray-600 dark:text-gray-400">Cards Reviewed</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="flex items-center text-green-500">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span className="text-sm">+1</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">15</h3>
          <p className="text-gray-600 dark:text-gray-400">Day Streak</p>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Study Progress Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Study Progress Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={studyProgressData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Area
                type="monotone"
                dataKey="hours"
                stroke="#3B82F6"
                fill="url(#colorHours)"
                strokeWidth={2}
              />
              <defs>
                <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Subject Performance */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Subject Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={subjectPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="subject" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Bar dataKey="accuracy" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Study Methods Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Study Methods</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={studyMethodData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
              >
                {studyMethodData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {studyMethodData.map((method, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: method.color }}
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {method.method}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Radar */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Skills Assessment</h3>
          <ResponsiveContainer width="100%" height={250}>
            <RadarChart data={skillRadarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="skill" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar
                name="Current"
                dataKey="current"
                stroke="#3B82F6"
                fill="#3B82F6"
                fillOpacity={0.3}
              />
              <Radar
                name="Target"
                dataKey="target"
                stroke="#10B981"
                fill="#10B981"
                fillOpacity={0.1}
              />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Weekly Goals */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Weekly Goals</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={weeklyGoals}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="day" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Bar dataKey="target" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="achieved" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Insights & Recommendations */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Brain className="w-5 h-5" />
          AI-Powered Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/10 rounded-lg p-4">
            <h4 className="font-medium mb-2">Peak Performance</h4>
            <p className="text-sm text-blue-100">
              Your best study hours are 2-4 PM with 93% efficiency. Consider scheduling challenging topics during this time.
            </p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <h4 className="font-medium mb-2">Improvement Area</h4>
            <p className="text-sm text-blue-100">
              Mathematics needs attention. Your accuracy dropped 8% this week. Recommend more practice sessions.
            </p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <h4 className="font-medium mb-2">Study Method</h4>
            <p className="text-sm text-blue-100">
              Flashcards show highest retention (94%). Consider increasing flashcard usage for difficult concepts.
            </p>
          </div>
        </div>
      </div>

      {/* Detailed Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Learning Velocity */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Learning Velocity</h3>
          <div className="space-y-4">
            {subjectPerformance.map((subject, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{subject.subject}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{subject.completed}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${subject.completed}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Study Streaks */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Achievement Timeline</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                <Award className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">15-Day Study Streak</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Achieved today</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <Target className="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">90% Quiz Master</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">2 days ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">1000 Cards Reviewed</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">1 week ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;