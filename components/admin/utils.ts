import dayjs from 'dayjs';

const tzOffset = dayjs().utcOffset() / 60;

export const getLocalDate = (date: string): string => {
  return dayjs(date)
    .add(tzOffset, 'hour')
    .format('YYYY-MM-DD HH:mm');
};