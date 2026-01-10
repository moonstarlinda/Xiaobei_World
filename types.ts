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

export type Role = 'system' | 'user' | 'assistant';

export interface Message {
  id: string;
  role: Role;
  content: string;
  timestamp: Date;
}

export type ChatMessage = {
  role: Role;
  content: string;
};

export interface Comic {
  id: number;
  title: string;
  imageUrl: string;
  date: string;
}