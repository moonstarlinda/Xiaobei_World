import React, { useState, useEffect } from 'react';
import { comics } from '../src/data/comics';
import { Comic } from '../types';
import { Smile, X, Book, ArrowUp } from 'lucide-react';

export const Comics: React.FC = () => {
  const [selectedComic, setSelectedComic] = useState<Comic | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedComic) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedComic]);

  // Show/hide back to top button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-xiaobei-dark/95 animate-fade-in pb-20 -mt-6 pt-10">
      
      {/* Header */}
      <div className="text-center pb-16 space-y-3 px-4">
        <h2 className="text-4xl font-bold text-xiaobei-dark dark:text-xiaobei-darktext flex items-center justify-center gap-3 drop-shadow-sm">
          <Book className="w-10 h-10" />
          The Comic Shelf
        </h2>
        <p className="text-xiaobei-dark/80 dark:text-xiaobei-darktext/80 font-medium text-lg">
          Flip through the pages of my daily adventures.
        </p>
      </div>

      {/* Bookshelf Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-0 gap-y-20">
          {comics.map((comic) => (
            <div
              key={comic.id}
              onClick={() => setSelectedComic(comic)}
              className="group relative flex flex-col items-center justify-end px-2 cursor-pointer"
            >
              
              {/* The Comic Book (Physical Object) */}
              {/* Added z-20 to ensure it sits 'above' the shelf visually if there's overlap, though flex column handles layout */}
              <div className="relative z-20 w-3/4 max-w-[180px] aspect-[4/5] transition-all duration-300 ease-out transform group-hover:-translate-y-3 group-hover:rotate-2 group-hover:scale-105">
                
                {/* White Border/Frame & Shadow */}
                <div className="absolute inset-0 bg-white shadow-xl rounded-sm rotate-0 ring-1 ring-gray-200 dark:ring-gray-700"></div>
                
                {/* Inner Image Container */}
                <div className="absolute inset-2 overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <img
                    src={comic.imageUrl}
                    alt={comic.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Book Spine Shadow (Left side) */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-r from-black/20 to-transparent z-10 rounded-l-sm"></div>
              </div>

              {/* The Wood Shelf Segment */}
              <div className="absolute bottom-0 left-0 right-0 h-6 bg-[#5D4037] shadow-[0_10px_15px_-3px_rgba(0,0,0,0.3)] z-0">
                 {/* 3D Top Edge Highlight (Lighter Wood) */}
                 <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#8D6E63] border-b border-black/10"></div>
              </div>
              
              {/* Title & Date (The Label) - Positioned below the shelf */}
              <div className="z-10 mt-8 mb-4 text-center w-full px-2">
                <div className="h-12 flex items-center justify-center mb-1">
                  <h3 className="text-xiaobei-dark dark:text-xiaobei-darktext font-bold text-xl md:text-lg leading-snug group-hover:text-xiaobei-accent dark:group-hover:text-xiaobei-darkaccent transition-colors line-clamp-2 text-center w-full">
                    {comic.title}
                  </h3>
                </div>
                <p className="text-xiaobei-dark/70 dark:text-xiaobei-darktext/70 text-xs font-mono">
                  {comic.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedComic && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedComic(null)}
        >
          {/* Close Button */}
          <button 
            onClick={() => setSelectedComic(null)}
            className="absolute top-6 right-6 p-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors z-50 group"
          >
            <X className="w-8 h-8 group-hover:scale-110 transition-transform" />
          </button>

          {/* Content Container */}
          <div 
            className="relative max-w-[95vw] max-h-[95vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedComic.imageUrl} 
              alt={selectedComic.title} 
              className="max-w-full max-h-[80vh] object-contain rounded-sm shadow-2xl bg-white p-1"
            />
            <div className="mt-6 text-center text-white">
                <h3 className="text-2xl font-bold tracking-wide">{selectedComic.title}</h3>
                <p className="text-white/60 text-sm font-mono mt-2">{selectedComic.date}</p>
            </div>
          </div>
        </div>
      )}

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