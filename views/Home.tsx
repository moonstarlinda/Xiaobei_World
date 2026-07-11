import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_DIARY } from '../constants';
import { BookOpen, ArrowRight, Book, ArrowUp } from 'lucide-react';
import { isNewYearPeriod } from '../src/theme/newyear';
import { getBirthdayAge, isBirthdayPeriod, isBirthdayToday } from '../src/theme/birthday';

export const Home: React.FC = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [cakeWishPhase, setCakeWishPhase] = useState<'idle' | 'shaking' | 'extinguished'>('idle');
  const cakeWishTimers = useRef<number[]>([]);
  const birthdayActive = isBirthdayPeriod();
  const birthdayToday = isBirthdayToday();
  const birthdayAge = getBirthdayAge();

  // Show/hide back to top button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => () => cakeWishTimers.current.forEach(window.clearTimeout), []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const makeCakeWish = () => {
    cakeWishTimers.current.forEach(window.clearTimeout);
    cakeWishTimers.current = [];
    setCakeWishPhase('idle');
    window.requestAnimationFrame(() => setCakeWishPhase('shaking'));
    cakeWishTimers.current.push(
      window.setTimeout(() => setCakeWishPhase('extinguished'), 1000),
      window.setTimeout(() => setCakeWishPhase('idle'), 2000),
    );
  };

  return (
    <div className={`space-y-12 animate-fade-in ${birthdayActive ? 'birthday-page' : ''}`}>
      {birthdayActive && (
        <div className="birthday-party-decor" aria-hidden="true">
          <span className="birthday-confetti birthday-confetti-left">✦</span>
          <span className="birthday-confetti birthday-confetti-right">✧</span>
          <span className="birthday-star-bundle">☆ ✦ ☆</span>
        </div>
      )}
      {/* Hero Section */}
      <section className={`home-hero flex flex-col md:flex-row items-center gap-8 md:gap-12 py-8 ${birthdayActive ? 'birthday-hero' : ''}`}>
        <div className={birthdayActive ? 'birthday-avatar-wrap' : ''}>
          {birthdayActive && (
            <span className="birthday-party-hat" aria-hidden="true">
              <i className="birthday-party-hat-cone" />
              <i className="birthday-party-hat-brim" />
              <i className="birthday-party-hat-pom" />
            </span>
          )}
          <img
            src="/images/avatar.png"
            alt="Xiaobei Avatar"
            className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover border-8 border-xiaobei-dark shadow-xl flex-shrink-0 transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:border-xiaobei-accent dark:border-xiaobei-darktext dark:hover:border-xiaobei-darkaccent"
          />
        </div>
        <div className="text-center md:text-left space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-xiaobei-dark tracking-tight dark:text-xiaobei-darktext">
            Hi, I'm <span className="underline decoration-wavy decoration-xiaobei-accent dark:decoration-xiaobei-darkaccent">Xiaobei</span>
          </h1>
          {/* 新年特别拜年文字 */}
          {isNewYearPeriod() && (
            <p className="text-sm text-xiaobei-dark/80 opacity-80 dark:text-xiaobei-darktext/80">
              🐯 🧧 小北给你拜年啦～ Happy Chinese New Year! 🧨 ✨
            </p>
          )}
          {birthdayActive && (
            <div className="birthday-note" aria-label="Xiaobei's first birthday">
              <span className="birthday-stamp-mark" aria-hidden="true">♡</span>
              <span>
                <strong>{birthdayToday ? `Xiaobei is ${birthdayAge} today!` : `Xiaobei turns ${birthdayAge}`}</strong>
                <small>{birthdayToday ? 'Cake, cuddles, and one tiny crown.' : 'July 13 · Make a little wish.'}</small>
              </span>
            </div>
          )}
          {birthdayActive && (
            <button className={`birthday-cake ${cakeWishPhase === 'shaking' ? 'is-wishing' : ''} ${cakeWishPhase === 'extinguished' ? 'is-extinguished' : ''}`} type="button" onClick={makeCakeWish} aria-label="Click the cake and make a wish for Xiaobei">
              <span className="cake-candle"><i /></span>
              <span className="cake-top-flowers">✿　✿　✿</span>
              <span className="cake-tier cake-tier-top"><b>{birthdayAge}</b></span>
              <span className="cake-tier cake-tier-bottom"><em>Xiaobei</em></span>
              <span className="cake-plate" />
              <span className="cake-hint">Click to make a wish ✦</span>
            </button>
          )}
          <p className="text-lg md:text-xl text-xiaobei-dark/80 max-w-lg dark:text-xiaobei-darktext/80">
            I'm a plush tiger with a big heart and a love for cozy adventures. Welcome to my little corner of the internet!
          </p>
          <div className={`pt-2 flex flex-col sm:flex-row justify-center md:justify-start gap-3 sm:gap-4 max-w-xs sm:max-w-none mx-auto sm:mx-0 ${birthdayActive ? 'birthday-actions' : ''}`}>
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
      <section className="bg-[#fffdf7]/85 rounded-3xl p-6 md:p-8 shadow-sm ring-1 ring-xiaobei-dark/10 dark:bg-xiaobei-darkbg/50 dark:ring-xiaobei-darkaccent/20">
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
              <div key={index} className="diary-card bg-[#fff8ec] p-6 rounded-2xl border-l-4 border-xiaobei-dark shadow-sm ring-1 ring-xiaobei-dark/5 hover:shadow-md transition-shadow dark:bg-xiaobei-darkbg dark:border-xiaobei-darktext dark:ring-xiaobei-darkaccent/20">
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

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 bg-xiaobei-accent hover:bg-xiaobei-dark text-xiaobei-dark hover:text-xiaobei-light rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110 active:scale-90 z-40 dark:bg-xiaobei-darkaccent dark:hover:bg-xiaobei-accent dark:text-xiaobei-darktext dark:hover:text-xiaobei-dark"
          aria-label="回到顶部"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};
