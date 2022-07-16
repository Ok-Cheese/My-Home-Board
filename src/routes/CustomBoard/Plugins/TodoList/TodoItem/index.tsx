import { useState } from 'react';
import { SetterOrUpdater } from 'recoil';

import { ITodoItem } from '../type';
import { CheckCircleIcon, CircleIcon } from 'assets/svgs';

import TodoModal from '../TodoModal';
import ModalPortal from 'components/Modal/Potal';
import Icon from 'components/Icon';

import styles from './todoItem.module.scss';

interface IProps {
  item: ITodoItem;
  index: number;
  todoList: ITodoItem[];
  setTodoList: SetterOrUpdater<ITodoItem[]>;
}

const TodoItem = ({ item, index, todoList, setTodoList }: IProps) => {
  const [isModalOpened, setIsModalOpened] = useState(false);

  const checkItemHandler = () => {
    const editedItem = { ...item, complete: !item.complete };

    setTodoList((prev) => {
      const editedList = prev.slice();
      editedList.splice(index, 1, editedItem);

      return editedList;
    });
  };

  const openModal = () => {
    setIsModalOpened(true);
  };

  const closeModal = () => {
    setIsModalOpened(false);
  };

  return (
    <li key={`${item.content}`} className={styles.todoItem}>
      <Icon type='button' size='30px' onClick={checkItemHandler}>
        {item.complete ? <CheckCircleIcon /> : <CircleIcon />}
      </Icon>
      <button type='button' className={styles.content} onClick={openModal}>
        {item.content}
      </button>
      <ModalPortal>
        {isModalOpened && (
          <TodoModal
            type='edit'
            todoList={todoList}
            setTodoList={setTodoList}
            closeModal={closeModal}
            editTarget={{ item, index }}
          />
        )}
      </ModalPortal>
    </li>
  );
};

export default TodoItem;
