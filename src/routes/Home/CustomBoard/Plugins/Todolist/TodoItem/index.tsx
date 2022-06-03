import { BlankBoxIcon, CheckboxIcon } from 'assets/svgs';
import dayjs from 'dayjs';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { cx } from 'styles';
import { IEditTarget, ITodoItem } from 'routes/Home/CustomBoard/Plugins/Todolist/index';
import styles from './todoItem.module.scss';
import { SetterOrUpdater } from 'recoil';

interface IProps {
  item: ITodoItem;
  index: number;
  setTodolist: SetterOrUpdater<ITodoItem[]>;
  setIsEditModalOpened: Dispatch<SetStateAction<boolean>>;
  setEditTarget: Dispatch<SetStateAction<IEditTarget>>;
}

const TodoItem = ({ ...props }: IProps) => {
  const [isWarning, setIsWarning] = useState(false);

  const openEditModal = () => {
    props.setIsEditModalOpened(true);
    props.setEditTarget({ index: props.index, item: props.item });
  };

  const checkItemHandler = () => {
    const editedItem = { ...props.item, complete: !props.item.complete };

    props.setTodolist((prev) => {
      const editedList = prev.slice();
      editedList.splice(props.index, 1, editedItem);

      return editedList;
    });
  };

  useEffect(() => {
    const beforeThreeHour = Number(dayjs(props.item.deadline).subtract(3, 'hour').format('YYMMDDhhmm'));
    const now = Number(dayjs().format('YYMMDDhhmm'));

    const interval = setInterval(() => {
      if (beforeThreeHour < now && !props.item.complete) {
        setIsWarning(true);
        return;
      }

      setIsWarning(false);
    }, 10_000);

    return () => {
      clearInterval(interval);
    };
  }, [props.item.complete, props.item.deadline]);

  return (
    <li
      key={`${props.item.content}`}
      className={cx({
        [styles.warning]: isWarning,
      })}
    >
      <button type='button' className={styles.todoCheck} onClick={checkItemHandler}>
        {props.item.complete ? <CheckboxIcon /> : <BlankBoxIcon />}
      </button>
      <button type='button' onClick={openEditModal}>
        {props.item.content}
      </button>
    </li>
  );
};

export default TodoItem;
