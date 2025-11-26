import React from 'react';
import { Link } from 'react-router-dom';
import { MOCK_DIARY } from '../constants';
import { BookOpen, ArrowRight } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="space-y-12 animate-fade-in">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center gap-8 md:gap-12 py-8">
        <div className="w-48 h-48 md:w-64 md:h-64 rounded-full border-8 border-xiaobei-dark overflow-hidden flex-shrink-0 shadow-xl">
          <img
            src="https://placehold.co/400x400/F4E0C6/4A3B32?text=Xiaobei+Portrait"
            alt="Xiaobei"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-center md:text-left space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-xiaobei-dark tracking-tight">
            Hi, I'm <span className="underline decoration-wavy decoration-xiaobei-accent">Xiaobei</span>
          </h1>
          <p className="text-lg md:text-xl text-xiaobei-dark/80 max-w-lg">
            I'm a plush tiger with a big heart and a love for cozy adventures. Welcome to my little corner of the internet!
          </p>
          <div className="pt-2 flex justify-center md:justify-start gap-4">
             <Link to="/gallery" className="px-6 py-3 bg-xiaobei-dark text-xiaobei-light rounded-full font-bold hover:bg-opacity-90 transition-all transform hover:-translate-y-1 shadow-lg">
                See Photos
             </Link>
             <Link to="/chat" className="px-6 py-3 border-2 border-xiaobei-dark text-xiaobei-dark rounded-full font-bold hover:bg-xiaobei-dark hover:text-xiaobei-light transition-all">
                Say Hello
             </Link>
          </div>
        </div>
      </section>

      {/* Diary Section */}
      <section className="bg-white/50 rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-xiaobei-dark">
            <BookOpen className="w-6 h-6" />
            Recent Diary
          </h2>
        </div>

        <div className="grid gap-6">
          {MOCK_DIARY.map((entry, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl border-l-4 border-xiaobei-dark shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2">
                <h3 className="text-xl font-bold text-xiaobei-dark">{entry.title}</h3>
                <span className="text-sm font-mono text-xiaobei-dark/60 bg-xiaobei-light px-2 py-1 rounded-md">{entry.date}</span>
              </div>
              <p className="text-xiaobei-dark/90 leading-relaxed">
                {entry.content}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};