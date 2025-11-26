import { Photo, DiaryEntry } from './types';

export const MOCK_PHOTOS: Photo[] = [
  { id: 1, url: 'https://placehold.co/600x400/F4E0C6/4A3B32?text=Xiaobei+Napping', desc: 'Nap time in the sun' },
  { id: 2, url: 'https://placehold.co/600x600/F4E0C6/4A3B32?text=Xiaobei+Eating', desc: 'Enjoying a big meal' },
  { id: 3, url: 'https://placehold.co/600x800/F4E0C6/4A3B32?text=Xiaobei+Adventure', desc: 'Exploring the backyard' },
  { id: 4, url: 'https://placehold.co/600x400/F4E0C6/4A3B32?text=Xiaobei+Coding', desc: 'Helping with code' },
  { id: 5, url: 'https://placehold.co/800x600/F4E0C6/4A3B32?text=Xiaobei+Friends', desc: 'With the plushie gang' },
  { id: 6, url: 'https://placehold.co/600x400/F4E0C6/4A3B32?text=Xiaobei+Travel', desc: 'On a train trip' },
];

export const MOCK_DIARY: DiaryEntry[] = [
  {
    date: '2023-10-24',
    title: 'A Sunny Day',
    content: 'Today was wonderful! The sun was warm on my fur. I sat by the window and watched the birds for hours.'
  },
  {
    date: '2023-10-25',
    title: 'Lost My Button',
    content: 'Oh no! I lost a button from my vest today. Hopefully, my human can sew it back on soon. Feeling a bit breezy.'
  },
  {
    date: '2023-10-27',
    title: 'New Snack Discovery',
    content: 'Discovered that pretend-cookies taste just as good as real ones when you use your imagination! Awooo!'
  }
];