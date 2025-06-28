import React from 'react';
import { 
  Home, 
  BookOpen, 
  Brain, 
  BarChart3, 
  Upload, 
  Timer, 
  Trophy, 
  Settings,
  GraduationCap,
  FileText,
  Search,
  X,
  Menu
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection, isOpen = true, onClose }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'flashcards', label: 'Flashcards', icon: Brain },
    { id: 'quiz', label: 'Quizzes', icon: BookOpen },
    { id: 'upload', label: 'Upload', icon: Upload },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'study-timer', label: 'Study Timer', icon: Timer },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'materials', label: 'Materials', icon: FileText },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleItemClick = (itemId: string) => {
    setActiveSection(itemId);
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 lg:z-auto
        w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 
        min-h-screen flex flex-col transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo */}
        <div className="flex items-center justify-between gap-3 p-4 lg:p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">StudyMaster</span>
          </div>
          
          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="lg:hidden p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 lg:p-4 space-y-1 lg:space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`w-full flex items-center gap-3 px-3 lg:px-4 py-3 rounded-lg text-left transition-all duration-200 touch-manipulation ${
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-700'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Upgrade Section */}
        <div className="p-3 lg:p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg p-4 text-white">
            <h3 className="font-semibold mb-2 text-sm lg:text-base">Upgrade to Pro</h3>
            <p className="text-xs lg:text-sm text-blue-100 mb-3">Unlock advanced AI features and unlimited storage</p>
            <button className="w-full bg-white text-blue-600 rounded-lg py-2 text-sm font-medium hover:bg-blue-50 transition-colors touch-manipulation">
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;