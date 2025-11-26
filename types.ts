export interface Photo {
  id: number;
  url: string;
  desc: string;
}

export interface DiaryEntry {
  date: string;
  title: string;
  content: string;
}

export interface Message {
  id: string;
  role: 'user' | 'system';
  content: string;
  timestamp: Date;
}

export interface Comic {
  id: number;
  title: string;
  imageUrl: string;
  date: string;
}