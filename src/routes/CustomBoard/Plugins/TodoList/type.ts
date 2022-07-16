export interface ITodoItem {
  id: number;
  content: string;
  complete: boolean;
}

export interface IEditTarget {
  index: number;
  item: ITodoItem;
}

export type TModalType = 'add' | 'edit';
