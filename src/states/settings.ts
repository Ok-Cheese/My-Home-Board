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
  plugin: IPlugin;
}

export interface IBackground {
  gradientAngle: number;
  gradientPoint: number;
  firstColor: string;
  secondColor: string;
}

interface IPlugin {
  color: string;
  fontColor: string;
  opacity: number;
}

export const initailBackgroundColor: IBackground = {
  gradientAngle: 0,
  gradientPoint: 0,
  firstColor: '#bbdfff',
  secondColor: '#bbdfff',
};

const initialPluginColor: IPlugin = {
  color: '#fefefe',
  fontColor: '#1d1d1f',
  opacity: 80,
};

const basicSetting: ISettings = {
  timeLocale: 'en',
  dateType: 'dddd MMM D',
  timeType: 'HH : mm',
  background: initailBackgroundColor,
  plugin: initialPluginColor,
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
