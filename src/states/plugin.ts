import { Layout } from 'react-grid-layout';
import { atom } from 'recoil';
import store from 'store';

const totalPlugins: Layout[] = [
  { i: 'BOJ', w: 2, h: 2, x: 0, y: 0, minW: 2, minH: 2, resizeHandles: ['se'] },
  { i: 'search', w: 5, h: 1, x: 0, y: 0, minH: 1, resizeHandles: ['se'] },
  { i: 'bookmark', w: 2, h: 2, x: 0, y: 0, minW: 2, minH: 2, resizeHandles: ['se'] },
  { i: 'dday', w: 2, h: 2, x: 0, y: 0, minW: 2, minH: 2, resizeHandles: ['se'] },
  { i: 'setting', w: 1, h: 1, x: 0, y: 0, resizeHandles: ['se'] },
  { i: 'todolist', w: 2, h: 4, x: 0, y: 0, minW: 2, minH: 4, resizeHandles: ['se'] },
  { i: 'today', w: 2, h: 2, x: 0, y: 0, minW: 2, minH: 2, resizeHandles: ['se'] },
  { i: 'github', w: 3, h: 3, x: 7, y: 1, minW: 3, minH: 3, resizeHandles: ['se'] },
];

const initailLayout: Layout[] = [
  { i: 'search', w: 8, h: 1, x: 0, y: 0, minH: 1, resizeHandles: ['se'] },
  { i: 'setting', w: 1, h: 1, x: 8, y: 0, resizeHandles: ['se'] },
  { i: 'bookmark', w: 5, h: 4, x: 0, y: 1, minW: 2, minH: 2, resizeHandles: ['se'] },
  { i: 'github', w: 3, h: 3, x: 7, y: 1, minW: 3, minH: 3, resizeHandles: ['se'] },
  { i: 'todolist', w: 5, h: 5, x: 0, y: 5, minW: 2, minH: 4, resizeHandles: ['se'] },
  { i: 'today', w: 5, h: 2, x: 5, y: 5, minW: 2, minH: 2, resizeHandles: ['se'] },
  { i: 'dday', w: 5, h: 3, x: 5, y: 7, minW: 2, minH: 2, resizeHandles: ['se'] },
];

const storedLayout: Layout[] = store.get('layout');

const defaultLayout = storedLayout || initailLayout;

const idOfLayout = defaultLayout.map((layout) => layout.i);

const toolBoxDefault = totalPlugins.filter(({ i }) => !idOfLayout.find((id) => id === i));

export const toolBoxAtom = atom<Layout[]>({
  key: '#toolBoxAtom',
  default: toolBoxDefault,
});

export const layoutAtom = atom<Layout[]>({
  key: '#layoutAtom',
  default: defaultLayout,
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

export const isEditModeAtom = atom<boolean>({
  key: '#isEditModeAtom',
  default: false,
});
