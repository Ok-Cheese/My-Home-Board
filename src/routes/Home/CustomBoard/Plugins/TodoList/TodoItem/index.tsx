import { SetterOrUpdater } from 'recoil';

import { ITodoItem } from '../type';
import { CheckCircleIcon, CircleIcon } from 'assets/svgs';

import styles from './todoItem.module.scss';

interface IProps {
  item: ITodoItem;
  index: number;
  onItemClick: (index: number, item: ITodoItem) => void;
  setTodoList: SetterOrUpdater<ITodoItem[]>;
}

const TodoItem = ({ item, index, onItemClick, setTodoList }: IProps) => {
  const itmeClickHandler = () => {
    onItemClick(index, item);
  };

  const checkItemHandler = () => {
    const editedItem = { ...item, complete: !item.complete };

    setTodoList((prev) => {
      const editedList = prev.slice();
      editedList.splice(index, 1, editedItem);

      return editedList;
    });
  };

  return (
    <li key={`${item.content}`}>
      <button type='button' className={styles.todoCheck} onClick={checkItemHandler}>
        {item.complete ? <CheckCircleIcon /> : <CircleIcon />}
      </button>
      <button type='button' className={styles.listContent} onClick={itmeClickHandler}>
        {item.content}
      </button>
    </li>
  );
};

export default TodoItem;
