import React from 'react';
import { MOCK_PHOTOS } from '../constants';
import { Camera } from 'lucide-react';

export const Gallery: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-xiaobei-dark flex items-center justify-center gap-3">
          <Camera className="w-8 h-8" />
          Photo Gallery
        </h2>
        <p className="text-xiaobei-dark/70">Snapshots from my fluffy life.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_PHOTOS.map((photo) => (
          <div
            key={photo.id}
            className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
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
            {/* Mobile-friendly caption always visible below image on touch devices if hover isn't standard, 
                but for aesthetics we usually keep it hidden or put it below. Let's add a small caption bar below for non-hover users */}
            <div className="p-3 bg-white md:hidden">
                <p className="text-sm font-medium text-xiaobei-dark">{photo.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};