import { atom } from 'recoil';

interface ITodoList {
  id: number;
  content: string;
  complete: boolean;
}

export const todolistState = atom<ITodoList[]>({
  key: '#todolistState',
  default: [],
});
