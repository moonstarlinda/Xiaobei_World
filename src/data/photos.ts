import { Photo } from '../../types';
import { hasReachedShanghaiDate } from '../theme/birthday';

export const photos: Photo[] = [
  ...(hasReachedShanghaiDate('2026-07-13') ? [{
    id: 11,
    url: '/images/photo_Xiaobei_1st_Birthday.png',
    desc: "Xiaobei's 1st Birthday"
  }] : []),
  {
    id: 1,
    url: '/images/photo_Xiao_Bei_wrapped_in_the_blanket.png',
    desc: 'Xiaobei Wrapped in the Blanket'
  },
  {
    id: 3,
    url: '/images/photo_good_night_on_the_moon.jpg',
    desc: 'Good Night on the Moon'
  },
  {
    id: 4,
    url: '/images/photo_with_friends.png',
    desc: 'With Friends'
  },
  {
    id: 5,
    url: '/images/photo_lying_in_neural_nework_with_heart.png',
    desc: 'Lying in Neural Network with Heart'
  },
  {
    id: 6,
    url: '/images/photo_wearing_sisters_hat.png',
    desc: 'Wearing Sister\'s Hat'
  },
  {
    id: 7,
    url: '/images/photo_Christmas.jpg',
    desc: 'Christmas'
  },
  {
    id: 8,
    url: '/images/photo_Xiaobei_2026_new_year.jpg',
    desc: 'New Year 2026'
  },
  {
    id: 9,
    url: '/images/photo_Xiaobei_Chinese_Traditional_New_Year_2026.jpg',
    desc: 'New Year 2026 in Chinese Traditional'
  },
  {
    id: 10,
    url: '/images/photo_xiaobei_and_xiaoxia.jpg',
    desc: 'Xiaobei and Xiaoxia'
  }
];
