import dayjs from 'dayjs';

const tzOffset = dayjs().utcOffset() / 60;

export const getLocalDate = (date?: string): string | undefined => {
  if (!date) {
    return;
  }
  return dayjs(date)
    .add(tzOffset, 'hour')
    .format('YYYY-MM-DD HH:mm');
};