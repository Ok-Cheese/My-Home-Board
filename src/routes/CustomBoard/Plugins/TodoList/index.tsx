import { useEffect, useState } from 'react';
import store from 'store';

import { ITodoItem } from './type';
import { AddIcon } from 'assets/svgs';

import ModalPortal from 'components/Modal/Potal';
import Icon from 'components/Icon';
import TodoModal from './TodoModal';
import TodoItem from './TodoItem';

import styles from './todoList.module.scss';

const savedTodoList = store.get('todoList');

const TodoList = () => {
  const [todoList, setTodoList] = useState<ITodoItem[]>(savedTodoList || []);
  const [isModalOpened, setIsModalOpened] = useState(false);

  const openModal = () => {
    setIsModalOpened(true);
  };

  const closeModal = () => {
    setIsModalOpened(false);
  };

  useEffect(() => {
    store.set('todoList', todoList);
  }, [todoList]);

  const todoItems = todoList.map((item, index) => {
    return <TodoItem key={`${item.id}`} item={item} index={index} todoList={todoList} setTodoList={setTodoList} />;
  });

  return (
    <div className={styles.wrapper}>
      <p className={styles.pluginName}>Todo List</p>
      <ul className={styles.todoList}>{todoItems}</ul>
      <Icon size='30px' position={{ bottom: '5px', right: '5px' }} onClick={openModal}>
        <AddIcon />
      </Icon>
      <ModalPortal>
        {isModalOpened && (
          <TodoModal type='add' todoList={todoList} setTodoList={setTodoList} closeModal={closeModal} />
        )}
      </ModalPortal>
    </div>
  );
};

export default TodoList;
