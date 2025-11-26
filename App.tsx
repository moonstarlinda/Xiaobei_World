import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { Footer } from './components/Footer';
import { Home } from './views/Home';
import { Gallery } from './views/Gallery';
import { Chat } from './views/Chat';
import { Comics } from './views/Comics';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen font-sans">
        <NavBar />
        <main className="flex-grow w-full max-w-5xl mx-auto px-4 py-6 sm:px-6 lg:px-8 mt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/comics" element={<Comics />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;