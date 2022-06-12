export interface IDday {
  title: string;
  deadline: Date;
}

export interface IRemain {
  date: number;
  hour: number;
  minute: number;
  second: number;
  sign: '+' | '-';
}
