import { atom } from 'recoil';
import store from 'store';

import { IBackground, TDateFormat, TTimeFormat } from 'types/type';

interface ISettings {
  timeLocale: 'ko' | 'en';
  dateType: TDateFormat;
  timeType: TTimeFormat;
  background: IBackground;
  plugin: IPlugin;
}

interface IPlugin {
  color: string;
  fontColor: string;
  opacity: number;
}

const initailBackgroundColor: IBackground = {
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
