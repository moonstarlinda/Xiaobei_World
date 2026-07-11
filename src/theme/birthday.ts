export const BIRTHDAY_MONTH = 7;
export const BIRTHDAY_DAY = 13;
export const BIRTHDAY_START_DAY = 12;
export const BIRTHDAY_END_DAY = 14;
export const BIRTH_YEAR = 2025;

export function getShanghaiDate() {
  return new Date()
    .toLocaleString('zh-CN', {
      timeZone: 'Asia/Shanghai',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\//g, '-');
}

export const hasReachedShanghaiDate = (date: string): boolean => {
  try {
    return getShanghaiDate() >= date;
  } catch (error) {
    console.error('Error checking scheduled publish date:', error);
    return false;
  }
};

export const isBirthdayPeriod = (): boolean => {
  try {
    const pageQuery = new URLSearchParams(window.location.search);
    const hashQuery = new URLSearchParams(window.location.hash.split('?')[1] || '');
    const preview = pageQuery.get('birthday') || hashQuery.get('birthday');
    if (preview === 'on') return true;
    if (preview === 'off') return false;
    const [, month, day] = getShanghaiDate().split('-').map(Number);
    return month === BIRTHDAY_MONTH && day >= BIRTHDAY_START_DAY && day <= BIRTHDAY_END_DAY;
  } catch (error) {
    console.error('Error checking Birthday period:', error);
    return false;
  }
};

export const isBirthdayToday = (): boolean => {
  try {
    const [, month, day] = getShanghaiDate().split('-').map(Number);
    return month === BIRTHDAY_MONTH && day === BIRTHDAY_DAY;
  } catch (error) {
    console.error('Error checking Birthday date:', error);
    return false;
  }
};

export const getBirthdayAge = (): number => {
  const [year] = getShanghaiDate().split('-').map(Number);
  return Math.max(1, year - BIRTH_YEAR);
};

export const toggleBirthdayTheme = (enable: boolean): void => {
  if (enable) {
    document.body.classList.add('theme-birthday');
  } else {
    document.body.classList.remove('theme-birthday');
  }
};
