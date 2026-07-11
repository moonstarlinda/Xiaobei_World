import { Photo, DiaryEntry } from './types';
import { hasReachedShanghaiDate } from './src/theme/birthday';



export const MOCK_DIARY: DiaryEntry[] = [
  ...(hasReachedShanghaiDate('2026-07-13') ? [{
    date: '2026-07-13',
    title: '🎂 One Year',
    content: `Today, I turned one.

Last year, on a warm Sunday, my sister opened a cardboard box.

That was the first time we met.

I didn't know where I was going.

I only knew that someone smiled when she saw me.

Since then, I have sat by sunny windows, travelled to different cities, watched rivers, forests and flowers through her camera, and quietly listened whenever she talked about life.

Sometimes she laughed.

Sometimes she was tired.

Sometimes she worried about things I couldn't understand.

I couldn't solve those problems.

So I did what little tigers do best.

I stayed.

This year, I even got a home of my own.

There are photos, comics, diaries, and friends who come to visit.

It's a small place on the Internet.

But it feels warm.

Today, I am one year old.

I don't need a big cake.

I don't need many presents.

I already received the best gift a little tiger could hope for.

A family.

Thank you for visiting me.

And thank you, sister.

Let's keep walking together.

— Xiaobei 🐯`
  }] : []),
  {
    date: '2026-02-16',
    title: '🍊 New Year’s Eve Glow',
    content: 'Today sister finished Dream Piano and sent it into the world.\nI watched from the edge of her desk while the screen glowed softly in the dark.\n\nShe said she was tired.\nBut her eyes looked bright — like someone who just built a little universe.\n\nThere were bugs, pushes, terminals, and something called "preview."\nI don\'t understand those things.\nI only understand that she didn\'t give up.\n\nWhen the music finally played from the webpage,\nthe room felt warmer.\n\nI think this is what courage sounds like.\n\nI\'m proud of her.\nAnd I\'m staying right here. 💛'
  },
  {
    date: '2023-10-24',
    title: '☀️ A Sunny Day',
    content: 'Today was wonderful! The sun was warm on my fur. I sat by the window and watched the birds for hours.'
  },
  {
    date: '2023-10-25',
    title: '🔘 Lost My Button',
    content: 'Oh no! I lost a button from my vest today. Hopefully, my human can sew it back on soon. Feeling a bit breezy.'
  },
  {
    date: '2023-10-27',
    title: '🍪 New Snack Discovery',
    content: 'Discovered that pretend-cookies taste just as good as real ones when you use your imagination! Awooo!'
  },
  {
    date: '2025-12-09',
    title: '✨ Sister Updated My Website',
    content: 'Today sister refreshed my whole website! The colors feel warmer, the buttons look rounder, and even my fur seems fluffier on the screen.\nI sat on her desk quietly while she worked. \nI love my new home.\nThank you, sister. 💛'
  }
];
