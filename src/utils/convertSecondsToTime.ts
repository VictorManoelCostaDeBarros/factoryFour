export function convertSecondsToTime(seconds: number): string {
  const hours: number = Math.floor(seconds / 3600);
  const minutes: number = Math.floor((seconds % 3600) / 60);
  const secondsLeft: number = seconds % 60;

  const formatNumber = (num: number): string => (num < 10 ? '0' + num : num.toString());

  const formattedTime: string = `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(secondsLeft)}`;
  
  return formattedTime;
}