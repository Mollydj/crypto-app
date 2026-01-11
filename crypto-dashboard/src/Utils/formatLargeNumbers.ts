export const formatLargeNumber = (num: number) => {
  if (Math.abs(num) >= 1_000_000_000) return (num / 1_000_000_000).toFixed(2) + 'B';
  if (Math.abs(num) >= 1_000_000)     return (num / 1_000_000).toFixed(2) + 'M';
  if (Math.abs(num) >= 1_000)         return (num / 1_000).toFixed(2) + 'K';
  return num.toFixed(2);
};