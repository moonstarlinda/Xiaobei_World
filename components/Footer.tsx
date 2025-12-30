import React from 'react';
import { Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-6 mt-8 bg-xiaobei-dark text-xiaobei-light dark:bg-xiaobei-darkbg dark:text-xiaobei-darktext dark:border-t-2 dark:border-xiaobei-darkaccent">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <p className="flex items-center justify-center gap-2 text-sm font-medium">
          Made with <Heart className="w-4 h-4 fill-xiaobei-light text-xiaobei-light animate-pulse dark:fill-xiaobei-darktext dark:text-xiaobei-darktext" /> by Xiaobei's Best Friend
        </p>
        <p className="text-xs mt-2 opacity-75">
          &copy; {new Date().getFullYear()} Xiaobei's World. All roars reserved.
        </p>
      </div>
    </footer>
  );
};