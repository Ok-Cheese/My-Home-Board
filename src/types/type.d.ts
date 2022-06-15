export interface ISize {
  width?: string;
  height?: string;
}

export type TDateFormat =
  | 'MM월 DD일 ddd'
  | 'MM월 DD일 dddd'
  | 'YY년 MM월 DD일'
  | 'dddd MMM D'
  | 'ddd MM DD'
  | 'MM DD YYYY';

export type TTimeFormat = 'HH : mm' | 'hh : mm' | 'HH시 mm분' | 'hh시 mm분' | 'hh H mm min' | 'HH H mm min';

export interface IBackground {
  gradientAngle: number;
  gradientPoint: number;
  firstColor: string;
  secondColor: string;
}
