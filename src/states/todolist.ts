import { atom } from 'recoil';
import store from 'store';

interface ITodoList {
  id: number;
  content: string;
  complete: boolean;
}

const savedTodoList = store.get('todolist');

export const todolistState = atom<ITodoList[]>({
  key: '#todolistState',
  default: savedTodoList || [],
});
