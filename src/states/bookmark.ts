import { atom } from 'recoil';
import store from 'store';

interface IBookmark {
  name: string;
  url: string;
  icon: string;
}

export const bookmarkPreset = [
  { name: 'Google', url: 'https://www.google.co.kr/', icon: 'google' },
  { name: 'Youtube', url: 'https://www.youtube.com/', icon: 'youtube' },
  { name: 'instagram', url: 'https://www.instagram.com/', icon: 'instagram' },
  { name: 'Netflix', url: 'https://www.netflix.com/kr/', icon: 'netflix' },
  { name: 'Naver', url: 'https://www.naver.com/', icon: 'naver' },
  { name: 'Facebook', url: 'https://facebook.com/', icon: 'facebook' },
  { name: 'Github', url: 'https://github.com/', icon: 'github' },
  { name: 'Wanted', url: 'https://www.wanted.co.kr/', icon: 'wanted' },
  { name: 'Stack-Overflow', url: 'https://stackoverflow.com/', icon: 'sof' },
];

const savedBookmarkList = store.get('bookmarkList');

export const bookmarkAtom = atom<IBookmark[]>({
  key: '#bookmark',
  default: savedBookmarkList || bookmarkPreset,
});
