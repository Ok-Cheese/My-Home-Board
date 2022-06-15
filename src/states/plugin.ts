import { atom } from 'recoil';
import { Layout } from 'react-grid-layout';
import store from 'store';

const totalPlugins: Layout[] = [
  { i: 'BOJ', w: 2, h: 2, x: 0, y: 0, minW: 2, minH: 2, resizeHandles: ['se', 'sw', 'nw'] },
  { i: 'search', w: 3, h: 1, x: 0, y: 0, maxH: 1, resizeHandles: ['se', 'sw', 'nw'] },
  { i: 'bookmark', w: 3, h: 3, x: 0, y: 0, minW: 2, minH: 3, resizeHandles: ['se', 'sw', 'nw'] },
  { i: 'setting', w: 1, h: 1, x: 0, y: 0, resizeHandles: [] },
  { i: 'todoList', w: 2, h: 4, x: 0, y: 0, minW: 2, minH: 4, resizeHandles: ['se', 'sw', 'nw'] },
  { i: 'time', w: 2, h: 2, x: 0, y: 0, minW: 2, minH: 2, resizeHandles: ['se', 'sw', 'nw'] },
  { i: 'clock', w: 2, h: 4, x: 0, y: 0, minW: 2, minH: 4, maxW: 2, maxH: 4 },
  { i: 'weather', w: 2, h: 2, x: 0, y: 0, minW: 2, minH: 2, resizeHandles: ['se', 'sw', 'nw'] },
  { i: 'dday', w: 2, h: 2, x: 0, y: 0, minW: 2, minH: 2, resizeHandles: ['se', 'sw', 'nw'] },
  { i: 'github', w: 4, h: 3, x: 0, y: 0, minW: 4, minH: 3, resizeHandles: ['se', 'sw', 'nw'] },
];

const initialLayoutList: Layout[] = [
  { i: 'search', w: 8, h: 1, x: 0, y: 0, maxH: 1, resizeHandles: ['se', 'sw', 'nw'] },
  { i: 'setting', w: 2, h: 1, x: 8, y: 0, resizeHandles: ['se', 'sw', 'nw'] },
];

const storedLayoutList: Layout[] = store.get('layout');
const defaultLayoutList = storedLayoutList || initialLayoutList;
const idOfLayout = defaultLayoutList.map((layout) => layout.i);
const toolBoxDefault = totalPlugins.filter(({ i }) => !idOfLayout.find((id) => id === i));

export const toolBoxAtom = atom<Layout[]>({
  key: '#toolBoxAtom',
  default: toolBoxDefault,
});

export const layoutAtom = atom<Layout[]>({
  key: '#layoutAtom',
  default: defaultLayoutList,
});

export const isEditModeAtom = atom<boolean>({
  key: '#isEditModeAtom',
  default: false,
});
