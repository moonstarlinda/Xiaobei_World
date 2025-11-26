import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Image, MessageCircle, Menu, X, PawPrint, Smile } from 'lucide-react';

export const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const isActive = (path: string) => {
    return location.pathname === path ? "bg-xiaobei-dark text-xiaobei-light" : "text-xiaobei-dark hover:bg-xiaobei-accent";
  };

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home className="w-4 h-4 mr-2" /> },
    { name: 'Gallery', path: '/gallery', icon: <Image className="w-4 h-4 mr-2" /> },
    { name: 'Comics', path: '/comics', icon: <Smile className="w-4 h-4 mr-2" /> },
    { name: 'Chat', path: '/chat', icon: <MessageCircle className="w-4 h-4 mr-2" /> },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-xiaobei-light/90 backdrop-blur-sm border-b-4 border-xiaobei-dark shadow-sm h-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-xiaobei-dark group">
            <div className="p-1.5 bg-xiaobei-dark rounded-full text-xiaobei-light group-hover:scale-110 transition-transform">
              <PawPrint className="w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight">Xiaobei</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center px-4 py-2 rounded-xl text-sm font-medium transition-colors ${isActive(link.path)}`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg text-xiaobei-dark hover:bg-xiaobei-accent focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-xiaobei-light border-b-4 border-xiaobei-dark shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center px-3 py-3 rounded-lg text-base font-medium ${isActive(link.path)}`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};