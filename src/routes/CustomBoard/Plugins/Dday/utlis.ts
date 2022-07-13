import dayjs from 'dayjs';
import { IRemain } from './type';

const makeDoubleAndPositive = (num: number) => {
  return Math.abs(num).toString().padStart(2, '0');
};

export const calculateRemainTime = (deadline: Date): IRemain => {
  return {
    date: Math.abs(dayjs(deadline).diff(dayjs(), 'day')).toString(),
    hour: makeDoubleAndPositive(dayjs(deadline).diff(dayjs(), 'hour')),
    minute: makeDoubleAndPositive(Number(dayjs(deadline).diff(dayjs(), 'minute')) % 60),
    second: makeDoubleAndPositive(Number(dayjs(deadline).diff(dayjs(), 'second')) % 60),
    sign: Number(dayjs(deadline).format('YYMMDDHHmmss')) - Number(dayjs().format('YYMMDDHHmmss')) > 0 ? '-' : '+',
  };
};
