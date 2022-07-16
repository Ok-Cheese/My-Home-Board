import dayjs from 'dayjs';

import { TDateFormat, TTimeFormat } from 'types/type';

interface IDatePreset {
  format: TDateFormat;
  ex: string;
}

interface ITimePreset {
  format: TTimeFormat;
  ex: string;
}

export const datePresets: IDatePreset[] = [
  { format: 'MM월 DD일 ddd', ex: dayjs().format('MM월 DD일 ddd') },
  { format: 'MM월 DD일 dddd', ex: dayjs().format('MM월 DD일 dddd') },
  { format: 'YY년 MM월 DD일', ex: dayjs().format('YY년 MM월 DD일') },
  { format: 'dddd MMM D', ex: dayjs().format('dddd MMM D') },
  { format: 'ddd MM DD', ex: dayjs().format('ddd MM DD') },
  { format: 'MM DD YYYY', ex: dayjs().format('MM DD YYYY') },
];

export const timePresets: ITimePreset[] = [
  { format: 'HH : mm', ex: dayjs().format('HH : mm') },
  { format: 'hh : mm', ex: dayjs().format('hh : mm') },
  { format: 'HH시 mm분', ex: dayjs().format('HH시 mm분') },
  { format: 'hh시 mm분', ex: dayjs().format('hh시 mm분') },
];
