import { atom } from 'recoil';

interface ITodoList {
  id: number;
  content: string;
  deadline: Date | null;
  complete: boolean;
}

export const todolistState = atom<ITodoList[]>({
  key: '#todolistState',
  default: [],
});
