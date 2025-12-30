import React from 'react';
import { Link } from 'react-router-dom';
import { MOCK_DIARY } from '../constants';
import { BookOpen, ArrowRight, Book } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="space-y-12 animate-fade-in">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center gap-8 md:gap-12 py-8">
        <img 
          src="/images/avatar.png" 
          alt="Xiaobei Avatar" 
          className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover border-8 border-xiaobei-dark shadow-xl flex-shrink-0 transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:border-xiaobei-accent dark:border-xiaobei-darktext dark:hover:border-xiaobei-darkaccent"
        />
        <div className="text-center md:text-left space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-xiaobei-dark tracking-tight dark:text-xiaobei-darktext">
            Hi, I'm <span className="underline decoration-wavy decoration-xiaobei-accent dark:decoration-xiaobei-darkaccent">Xiaobei</span>
          </h1>
          <p className="text-lg md:text-xl text-xiaobei-dark/80 max-w-lg dark:text-xiaobei-darktext/80">
            I'm a plush tiger with a big heart and a love for cozy adventures. Welcome to my little corner of the internet!
          </p>
          <div className="pt-2 flex flex-col sm:flex-row justify-center md:justify-start gap-3 sm:gap-4 max-w-xs sm:max-w-none mx-auto sm:mx-0">
             <Link to="/gallery" className="px-4 py-3 w-full sm:w-40 border-2 border-xiaobei-dark text-xiaobei-dark rounded-full font-bold hover:bg-xiaobei-dark hover:text-xiaobei-light transition-all duration-200 transform hover:-translate-y-1 shadow-lg hover:shadow-xl text-center active:scale-90 active:shadow-inner dark:border-xiaobei-darktext dark:text-xiaobei-darktext dark:hover:bg-xiaobei-darktext dark:hover:text-xiaobei-light">
                See Photos
             </Link>
             <Link to="/comics" className="px-4 py-3 w-full sm:w-40 border-2 border-xiaobei-dark text-xiaobei-dark rounded-full font-bold hover:bg-xiaobei-dark hover:text-xiaobei-light transition-all duration-200 transform hover:-translate-y-1 shadow-lg hover:shadow-xl text-center active:scale-90 active:shadow-inner dark:border-xiaobei-darktext dark:text-xiaobei-darktext dark:hover:bg-xiaobei-darktext dark:hover:text-xiaobei-light">
                Read Comics
             </Link>
             <Link to="/chat" className="px-4 py-3 w-full sm:w-40 border-2 border-xiaobei-dark text-xiaobei-dark rounded-full font-bold hover:bg-xiaobei-dark hover:text-xiaobei-light transition-all duration-200 transform hover:-translate-y-1 shadow-lg hover:shadow-xl text-center active:scale-90 active:shadow-inner dark:border-xiaobei-darktext dark:text-xiaobei-darktext dark:hover:bg-xiaobei-darktext dark:hover:text-xiaobei-light">
                Say Hello
             </Link>
          </div>
        </div>
      </section>

      {/* Diary Section */}
      <section className="bg-white/50 rounded-3xl p-6 md:p-8 shadow-sm dark:bg-xiaobei-darkbg/50">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-xiaobei-dark dark:text-xiaobei-darktext">
            <BookOpen className="w-6 h-6" />
            Recent Diary
          </h2>
          <Link 
            to="/diary" 
            className="flex items-center gap-1 text-sm font-medium text-xiaobei-dark hover:text-xiaobei-accent transition-all active:scale-95 dark:text-xiaobei-darktext dark:hover:text-xiaobei-darkaccent"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid gap-6">
          {/* Sort diary by date (newest first) and show only the first 3 entries */}
          {[...MOCK_DIARY]
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 3)
            .map((entry, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl border-l-4 border-xiaobei-dark shadow-sm hover:shadow-md transition-shadow dark:bg-xiaobei-darkbg dark:border-xiaobei-darktext">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2">
                  <h3 className="text-xl font-bold text-xiaobei-dark dark:text-xiaobei-darktext">{entry.title}</h3>
                  <span className="text-sm font-mono text-xiaobei-dark/60 bg-xiaobei-light px-2 py-1 rounded-md dark:text-xiaobei-darktext/60 dark:bg-xiaobei-darkbg">{entry.date}</span>
                </div>
                <p className="text-xiaobei-dark/90 leading-relaxed dark:text-xiaobei-darktext/90 whitespace-pre-line">
                  {entry.content}
                </p>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};