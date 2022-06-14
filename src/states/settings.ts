import { atom } from 'recoil';
import store from 'store';

export type TDateFormat =
  | 'MM월 DD일 ddd'
  | 'MM월 DD일 dddd'
  | 'YY년 MM월 DD일'
  | 'dddd MMM D'
  | 'ddd MM DD'
  | 'MM DD YYYY';
export type TTimeFormat = 'HH : mm' | 'hh : mm' | 'HH시 mm분' | 'hh시 mm분' | 'hh H mm min' | 'HH H mm min';

interface ISettings {
  timeLocale: 'ko' | 'en';
  dateType: TDateFormat;
  timeType: TTimeFormat;
  background: IBackground;
}

export interface IBackground {
  gradientAngle: number;
  gradientPoint: number;
  opacity: number;
  firstColor: string;
  secondColor: string;
}

export const initailColor: IBackground = {
  gradientAngle: 0,
  gradientPoint: 0,
  firstColor: '#bbdfff',
  secondColor: '#bbdfff',
  opacity: 1,
};

const basicSetting: ISettings = {
  timeLocale: 'en',
  dateType: 'dddd MMM D',
  timeType: 'HH : mm',
  background: initailColor,
};

const savedSetting = store.get('setting');
const initalSetting = savedSetting || basicSetting;

export const settingAtom = atom<ISettings>({
  key: '#settingAtom',
  default: initalSetting,
});

export const tempSettingAtom = atom<ISettings>({
  key: '#tempSettingAtom',
  default: initalSetting,
});
