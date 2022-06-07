import { atom } from 'recoil';

interface ISettings {
  clockType: 'ko' | 'en';
}

export const settingAtom = atom<ISettings>({
  key: '#settingAtom',
  default: { clockType: 'en' },
});
