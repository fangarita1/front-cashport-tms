export const calculateMinutesDifference = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();

  const diffInMilliseconds = now.getTime() - date.getTime();
  const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60)) || 0;

  return diffInMinutes >= 0 ? diffInMinutes : 0;
};