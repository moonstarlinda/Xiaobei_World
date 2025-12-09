import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Image, MessageCircle, Menu, X, PawPrint, Smile, Book } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface NavBarProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

export const NavBar: React.FC<NavBarProps> = ({ isDark, onToggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  // Uniform style for all buttons - no special styling for Home button
  const isActive = (path: string) => {
    return location.pathname === path 
      ? "bg-xiaobei-accent text-xiaobei-dark dark:bg-xiaobei-darkaccent dark:text-xiaobei-darktext" 
      : "text-xiaobei-dark hover:bg-xiaobei-accent dark:text-xiaobei-darktext dark:hover:bg-xiaobei-darkaccent";
  };

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home className="w-4 h-4 mr-2" /> },
    { name: 'Gallery', path: '/gallery', icon: <Image className="w-4 h-4 mr-2" /> },
    { name: 'Diary', path: '/diary', icon: <Book className="w-4 h-4 mr-2" /> },
    { name: 'Comics', path: '/comics', icon: <Smile className="w-4 h-4 mr-2" /> },
    { name: 'Chat', path: '/chat', icon: <MessageCircle className="w-4 h-4 mr-2" /> },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-xiaobei-light/90 backdrop-blur-sm border-b-4 border-xiaobei-dark shadow-sm h-16 dark:bg-xiaobei-darkbg/90 dark:border-xiaobei-darkaccent">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center h-full">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-xiaobei-dark group dark:text-xiaobei-darktext">
            <div className="p-1.5 bg-xiaobei-dark rounded-full text-xiaobei-light group-hover:scale-110 transition-transform dark:bg-xiaobei-accent dark:text-xiaobei-darkbg">
              <PawPrint className="w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight">Xiaobei</span>
          </Link>

          {/* Navigation Buttons, Theme Toggle, and Mobile Menu Container */}
          <div className="flex items-center ml-auto space-x-4">
            {/* Navigation Buttons - Positioned to the left of theme toggle */}
            <div className="hidden md:flex items-center">
              <div className="grid grid-cols-5 gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`flex items-center justify-center px-2 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${link.name === 'Home' && location.pathname === '/' ? 'text-xiaobei-dark hover:bg-xiaobei-accent dark:text-xiaobei-darktext dark:hover:bg-xiaobei-darkaccent' : isActive(link.path)} active:scale-90 active:shadow-inner`}
                    style={{ width: '100px', height: '40px' }}
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Theme Toggle - Always in the top right corner */}
            <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg text-xiaobei-dark hover:bg-xiaobei-accent focus:outline-none md:hidden dark:text-xiaobei-darktext dark:hover:bg-xiaobei-darkaccent"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-xiaobei-light border-b-4 border-xiaobei-dark shadow-lg dark:bg-xiaobei-darkbg dark:border-xiaobei-darkaccent">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center px-3 py-3 rounded-lg text-base font-medium transition-all duration-200 ${isActive(link.path)} active:scale-90 active:shadow-inner`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
            {/* Theme Toggle in Mobile Menu */}
            <div className="px-3 py-3 flex justify-center">
              <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};