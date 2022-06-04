import { atom } from 'recoil';

interface IBookmark {
  name: string;
  url: string;
  icon: string;
}

export const bookmarkPreset = [
  { name: 'Google', url: 'https://www.google.co.kr/', icon: 'google' },
  { name: 'Youtube', url: 'https://www.youtube.com/', icon: 'youtube' },
  { name: 'Github', url: 'https://github.com/', icon: 'github' },
  { name: 'Instagram', url: 'https://www.instagram.com/', icon: 'instagram' },
  { name: 'Netflix', url: 'https://www.netflix.com/kr/', icon: 'netflix' },
  { name: 'Wanted', url: 'https://www.wanted.co.kr/', icon: 'wanted' },
  { name: 'Stack-Overflow', url: 'https://stackoverflow.com/', icon: 'sof' },
];

export const bookmarkAtom = atom<IBookmark[]>({
  key: '#bookmark',
  default: bookmarkPreset,
});
