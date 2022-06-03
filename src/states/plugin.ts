import { atom } from 'recoil';

interface IPluginStandard {
  id: string;
  name: string;
  maxWidth?: number;
  minWidth?: number;
  maxHeight?: number;
  minHeight?: number;
}

export const totalPluginState = atom<IPluginStandard[]>({
  key: '#totalPluginState',
  default: [
    { id: 'BOJ', name: '백준', minWidth: 2, minHeight: 2 },
    { id: 'search', name: '검색', maxHeight: 1 },
    { id: 'bookmark', name: '즐겨찾기', minWidth: 2, minHeight: 2 },
    { id: 'dday', name: 'D-day', minWidth: 2, minHeight: 2 },
    { id: 'setting', name: '설정', minWidth: 2, minHeight: 1, maxWidth: 2, maxHeight: 1 },
    { id: 'todolist', name: 'Todo List', minWidth: 2, minHeight: 4 },
    { id: 'today', name: 'Today', minWidth: 2, minHeight: 2 },
  ],
});

interface IColorPicker {
  gradientAngle: number;
  gradientPoint: number;
  opacity: number;
  firstColor: string;
  secondColor: string;
}

export const backgroundColorState = atom<IColorPicker>({
  key: '#backgroundColorState',
  default: {
    gradientAngle: 0,
    gradientPoint: 0,
    firstColor: '#fefefe',
    secondColor: '#fefefe',
    opacity: 1,
  },
});

export const blockColorState = atom<IColorPicker>({
  key: '#blockColorState',
  default: {
    gradientAngle: 0,
    gradientPoint: 0,
    firstColor: 'red',
    secondColor: '#fefefe',
    opacity: 1,
  },
});