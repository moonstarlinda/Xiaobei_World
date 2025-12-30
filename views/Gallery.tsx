import React, { useState } from 'react';
import { photos } from '../src/data/photos';
import { Camera, X, ArrowUp, ChevronLeft, ChevronRight } from 'lucide-react';

export const Gallery: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const openPhotoViewer = (id: number) => {
    setSelectedPhoto(id);
    // Disable scrolling when viewer is open
    document.body.style.overflow = 'hidden';
  };

  const closePhotoViewer = () => {
    setSelectedPhoto(null);
    // Re-enable scrolling when viewer is closed
    document.body.style.overflow = '';
  };

  const navigatePhoto = (direction: 'next' | 'prev') => {
    if (!selectedPhoto) return;
    
    const currentIndex = photos.findIndex(p => p.id === selectedPhoto);
    if (direction === 'next') {
      const nextIndex = (currentIndex + 1) % photos.length;
      setSelectedPhoto(photos[nextIndex].id);
    } else {
      const prevIndex = (currentIndex - 1 + photos.length) % photos.length;
      setSelectedPhoto(photos[prevIndex].id);
    }
  };

  // Handle keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedPhoto) return;
      
      if (e.key === 'Escape') {
        closePhotoViewer();
      } else if (e.key === 'ArrowRight') {
        navigatePhoto('next');
      } else if (e.key === 'ArrowLeft') {
        navigatePhoto('prev');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto]);

  // Show/hide back to top button based on scroll position
  React.useEffect(() => {
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

  const currentPhoto = selectedPhoto ? photos.find(p => p.id === selectedPhoto) : null;

  // Handle touch events for swipe navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      navigatePhoto('next');
    } else if (isRightSwipe) {
      navigatePhoto('prev');
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-xiaobei-dark dark:text-xiaobei-darktext flex items-center justify-center gap-3">
          <Camera className="w-8 h-8" />
          Photo Gallery
        </h2>
        <p className="text-xiaobei-dark/70 dark:text-xiaobei-darktext/70">Snapshots from my fluffy life. Click on any photo to view full size.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="group relative bg-white dark:bg-xiaobei-darkbg/80 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
            onClick={() => openPhotoViewer(photo.id)}
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={photo.url}
                alt={photo.desc}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-xiaobei-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <p className="text-xiaobei-light font-medium translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                {photo.desc}
              </p>
            </div>
            {/* Mobile-friendly caption always visible below image on touch devices */}
            <div className="p-3 bg-white dark:bg-xiaobei-darkbg/80 md:hidden">
                <p className="text-sm font-medium text-xiaobei-dark dark:text-xiaobei-darktext">{photo.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Image Viewer Modal */}
      {selectedPhoto && currentPhoto && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" 
          onClick={closePhotoViewer}
        >
          <div className="absolute top-4 right-4">
            <button 
              onClick={closePhotoViewer} 
              className="text-white p-2 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Close"
            >
              <X className="w-8 h-8" />
            </button>
          </div>
          

          
          <div 
            className="max-w-6xl max-h-[90vh] flex flex-col items-center" 
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="relative max-h-[80vh]">
              <img 
                src={currentPhoto.url} 
                alt={currentPhoto.desc}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
            </div>
            <h3 className="text-white text-xl font-medium mt-4">{currentPhoto.desc}</h3>
            <p className="text-white/60 text-sm mt-2 block md:hidden">← swipe left or right →</p>
          </div>
          
          {/* Desktop navigation buttons */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              navigatePhoto('prev');
            }}
            className="hidden md:flex absolute left-4 text-white p-3 rounded-full hover:bg-white/20 transition-all duration-200 transform hover:scale-110 active:scale-90"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              navigatePhoto('next');
            }}
            className="hidden md:flex absolute right-4 text-white p-3 rounded-full hover:bg-white/20 transition-all duration-200 transform hover:scale-110 active:scale-90"
            aria-label="Next photo"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

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