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
}

const savedSetting = store.get('setting');

const basicSetting: ISettings = {
  timeLocale: 'en',
  dateType: 'dddd MMM D',
  timeType: 'HH : mm',
};

const initalSetting = savedSetting || basicSetting;

export const settingAtom = atom<ISettings>({
  key: '#settingAtom',
  default: initalSetting,
});

export const tempSettingAtom = atom<ISettings>({
  key: '#tempSettingAtom',
  default: initalSetting,
});
