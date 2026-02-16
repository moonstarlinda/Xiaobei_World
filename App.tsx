import React, { useEffect, useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { Footer } from './components/Footer';
import { Home } from './views/Home';
import { Gallery } from './views/Gallery';
import { Chat } from './views/Chat';
import { Comics } from './views/Comics';
import { Diary } from './views/Diary';
import { isNewYearPeriod, toggleNewYearTheme } from './src/theme/newyear';
// 导入新年主题样式
import './src/styles/newyear.css';

const App: React.FC = () => {
  // Theme toggle state
  const [isDark, setIsDark] = useState(false);

  // Toggle theme function
  const toggleTheme = () => {
    setIsDark(!isDark);
    localStorage.setItem('theme', !isDark ? 'dark' : 'light');
  };

  // Check local storage for saved theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    // Always default to light mode if no saved theme, ignoring system preference
    const initialTheme = savedTheme || 'light';
    
    const isDarkMode = initialTheme === 'dark';
    setIsDark(isDarkMode);
    
    // Apply theme class to document
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Check if it's New Year period and apply theme
    const isNewYear = isNewYearPeriod();
    toggleNewYearTheme(isNewYear);
    console.log('New Year theme:', isNewYear ? 'enabled' : 'disabled');
  }, []);

  // Update theme when isDark changes
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen font-sans bg-gradient-to-br from-[#f7ead6] via-[#f0e0c0] to-[#e8d2b8] bg-[radial-gradient(circle_at_50%_0%,rgba(210,170,130,0.3)_0%,transparent_70%)] dark:bg-xiaobei-darkbg dark:bg-[radial-gradient(circle_at_50%_0%,rgba(139,115,85,0.2)_0%,transparent_70%)]">
        <NavBar isDark={isDark} onToggleTheme={toggleTheme} />
        <main className="flex-grow w-full max-w-5xl mx-auto px-4 py-6 sm:px-6 lg:px-8 mt-16 text-xiaobei-dark dark:text-xiaobei-darktext">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/comics" element={<Comics />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/diary" element={<Diary />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;