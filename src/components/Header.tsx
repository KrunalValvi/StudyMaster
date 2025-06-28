import React from 'react';
import { Search, Bell, Moon, Sun, MessageCircle, Menu } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { studyProgressData } from '../data/sampleData';

interface HeaderProps {
  showAIChat: boolean;
  setShowAIChat: (show: boolean) => void;
  onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ showAIChat, setShowAIChat, onMenuClick }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 lg:px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg touch-manipulation"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search */}
        <div className="flex-1 max-w-md mx-4 lg:mx-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search materials, notes, or ask AI..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm lg:text-base"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2 lg:gap-4">
          {/* AI Chat Toggle */}
          <button
            onClick={() => setShowAIChat(!showAIChat)}
            className={`p-2 rounded-lg transition-colors touch-manipulation ${
              showAIChat 
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' 
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <MessageCircle className="w-5 h-5" />
          </button>

          {/* Notifications */}
          <button className="relative p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg touch-manipulation">
            <Bell className="w-5 h-5" />
            <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></div>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg touch-manipulation"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-2 lg:gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                {studyProgressData.user.name}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Level {studyProgressData.user.level} • {studyProgressData.user.xpPoints} XP
              </div>
            </div>
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium text-sm lg:text-base">
              {studyProgressData.user.name.split(' ').map(n => n[0]).join('')}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;