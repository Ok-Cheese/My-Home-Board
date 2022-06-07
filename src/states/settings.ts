import { atom } from 'recoil';
import store from 'store';

interface ISettings {
  clockType: 'ko' | 'en';
}

const savedSetting = store.get('setting');

const basicSetting: ISettings = {
  clockType: 'en',
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
