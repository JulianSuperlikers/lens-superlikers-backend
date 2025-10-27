export const transformDate = (date: string): Date => {
  const [dateString, timeString] = date.split(' ');

  const [year, month, day] = dateString.split('-').map((item) => Number(item));
  const [hours, minutes, seconds] = timeString.split(':').map((item) => Number(item));

  const transformDate = new Date(Date.UTC(year, month - 1, day, hours, minutes, seconds));

  return transformDate;
};
