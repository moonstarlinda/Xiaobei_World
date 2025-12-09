import React from 'react';
import { MOCK_DIARY } from '../constants';
import { Book } from 'lucide-react';

export const Diary: React.FC = () => {
  // Sort diary entries by date in descending order (newest first)
  const sortedDiary = [...MOCK_DIARY].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold flex items-center justify-center gap-3 text-xiaobei-dark dark:text-xiaobei-darktext">
          <Book className="w-8 h-8" />
          My Diary
        </h2>
        <p className="text-xiaobei-dark/70 dark:text-xiaobei-darktext/70">Chronicles of my fluffy adventures.</p>
      </div>

      <div className="grid gap-6">
        {sortedDiary.map((entry, index) => (
          <div key={index} className="bg-white dark:bg-xiaobei-darkbg/80 p-6 rounded-2xl border-l-4 border-xiaobei-dark dark:border-xiaobei-darkaccent shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2">
              <h3 className="text-xl font-bold text-xiaobei-dark dark:text-xiaobei-darktext">{entry.title}</h3>
              <span className="text-sm font-mono text-xiaobei-dark/60 dark:text-xiaobei-darktext/60 bg-xiaobei-light dark:bg-xiaobei-dark/20 px-2 py-1 rounded-md">{entry.date}</span>
            </div>
            <p className="text-xiaobei-dark/90 dark:text-xiaobei-darktext/90 leading-relaxed whitespace-pre-line">
              {entry.content}
            </p>
          </div>
        ))}
      </div>

      {sortedDiary.length === 0 && (
        <div className="text-center py-12 text-xiaobei-dark/70 dark:text-xiaobei-darktext/70">
          <p>No diary entries yet. Check back soon!</p>
        </div>
      )}
    </div>
  );
};