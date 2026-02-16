// 新年主题常量配置
// 可修改以下日期来调整新年皮肤的启用时间段
export const NEWYEAR_START_DATE = "2026-02-16";
// 结束日期（包含）
export const NEWYEAR_END_DATE = "2026-03-03";

/**
 * 判断当前是否处于新年期间（以上海时区为准）
 * @returns boolean - 是否处于新年期间
 */
export const isNewYearPeriod = (): boolean => {
  try {
    // 获取上海时区的当前日期（YYYY-MM-DD 格式）
    const now = new Date();
    const shanghaiDate = now.toLocaleString('zh-CN', {
      timeZone: 'Asia/Shanghai',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).replace(/\//g, '-');

    // 比较日期
    return shanghaiDate >= NEWYEAR_START_DATE && shanghaiDate <= NEWYEAR_END_DATE;
  } catch (error) {
    console.error('Error checking New Year period:', error);
    return false;
  }
};

/**
 * 手动切换新年主题
 * @param enable - 是否启用新年主题
 */
export const toggleNewYearTheme = (enable: boolean): void => {
  if (enable) {
    document.body.classList.add('theme-newyear');
  } else {
    document.body.classList.remove('theme-newyear');
  }
};
