import { Layout } from 'react-grid-layout';
import { atom } from 'recoil';
import store from 'store';

const totalPlugins: Layout[] = [
  { i: 'BOJ', w: 2, h: 2, x: 0, y: 0, minW: 2, minH: 2, resizeHandles: ['se', 'sw', 'nw'] },
  { i: 'search', w: 5, h: 1, x: 0, y: 0, maxH: 1, resizeHandles: ['se', 'sw', 'nw'] },
  { i: 'bookmark', w: 4, h: 3, x: 0, y: 0, minW: 4, minH: 2, maxW: 4, resizeHandles: ['se', 'sw', 'nw'] },
  { i: 'setting', w: 1, h: 1, x: 0, y: 0, resizeHandles: ['se', 'sw', 'nw'] },
  { i: 'todolist', w: 2, h: 4, x: 0, y: 0, minW: 2, minH: 6, resizeHandles: ['se', 'sw', 'nw'] },
  { i: 'today', w: 2, h: 2, x: 0, y: 0, resizeHandles: ['se', 'sw', 'nw'] },
  { i: 'fake1', w: 3, h: 1, x: 0, y: 0, minW: 2, minH: 2, resizeHandles: ['se', 'sw', 'nw'] },
  { i: 'fake2', w: 2, h: 4, x: 0, y: 0, minW: 2, minH: 4, resizeHandles: ['se', 'sw', 'nw'] },
  { i: 'fake3', w: 4, h: 3, x: 0, y: 0, minW: 2, minH: 2, resizeHandles: ['se', 'sw', 'nw'] },
  { i: 'fake4', w: 2, h: 2, x: 0, y: 0, minW: 2, minH: 2, maxW: 3, maxH: 3, resizeHandles: ['se', 'sw', 'nw'] },
  { i: 'fake5', w: 2, h: 2, x: 0, y: 0, resizeHandles: ['se', 'sw', 'nw'] },
];

const initailLayout: Layout[] = [
  { i: 'search', w: 8, h: 1, x: 0, y: 0, maxH: 1, resizeHandles: ['se', 'sw', 'nw'] },
  { i: 'setting', w: 2, h: 1, x: 8, y: 0, resizeHandles: ['se', 'sw', 'nw'] },
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

export const isEditModeAtom = atom<boolean>({
  key: '#isEditModeAtom',
  default: false,
});
