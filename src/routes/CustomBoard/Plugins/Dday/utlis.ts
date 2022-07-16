import dayjs from 'dayjs';
import { IRemainTime } from './type';

const setTimeFormat = (num: number) => {
  return Math.abs(num).toString().padStart(2, '0');
};

export const calcRemainTime = (deadline: Date): IRemainTime => {
  return {
    date: Math.abs(dayjs(deadline).diff(dayjs(), 'day')).toString(),
    hour: setTimeFormat(dayjs(deadline).diff(dayjs(), 'hour')),
    minute: setTimeFormat(Number(dayjs(deadline).diff(dayjs(), 'minute')) % 60),
    second: setTimeFormat(Number(dayjs(deadline).diff(dayjs(), 'second')) % 60),
    sign: Number(dayjs(deadline).format('YYMMDDHHmmss')) - Number(dayjs().format('YYMMDDHHmmss')) > 0 ? '-' : '+',
  };
};
