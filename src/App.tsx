import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Flashcards from './components/Flashcards';
import Quiz from './components/Quiz';
import FileUpload from './components/FileUpload';
import Analytics from './components/Analytics';
import StudyTimer from './components/StudyTimer';
import Achievements from './components/Achievements';
import Materials from './components/Materials';
import SearchResults from './components/SearchResults';
import Settings from './components/Settings';
import AIChat from './components/AIChat';

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [showAIChat, setShowAIChat] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'flashcards':
        return <Flashcards />;
      case 'quiz':
        return <Quiz />;
      case 'upload':
        return <FileUpload />;
      case 'analytics':
        return <Analytics />;
      case 'study-timer':
        return <StudyTimer />;
      case 'achievements':
        return <Achievements />;
      case 'materials':
        return <Materials />;
      case 'search':
        return <SearchResults />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <ThemeProvider>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
        <Sidebar 
          activeSection={activeSection} 
          setActiveSection={setActiveSection}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        
        <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
          <Header 
            showAIChat={showAIChat} 
            setShowAIChat={setShowAIChat}
            onMenuClick={() => setSidebarOpen(true)}
          />
          
          <main className="flex-1 overflow-y-auto">
            {renderActiveSection()}
          </main>
        </div>

        {/* AI Chat Assistant */}
        <AIChat isOpen={showAIChat} onClose={() => setShowAIChat(false)} />
      </div>
    </ThemeProvider>
  );
}

export default App;