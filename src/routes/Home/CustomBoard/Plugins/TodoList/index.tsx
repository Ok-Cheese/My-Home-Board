import { useEffect, useRef, useState } from 'react';
import store from 'store';

import { TModalType, IEditTarget, ITodoItem } from './type';
import { AddIcon, ArrowIcon } from 'assets/svgs';

import TodoItem from './TodoItem';
import TodoModal from './TodoModal';
import ModalPortal from 'components/Modal/Potal';

import styles from './todoList.module.scss';

const savedTodoList = store.get('todoList');

const TodoList = () => {
  const [todoList, setTodoList] = useState<ITodoItem[]>(savedTodoList || []);
  const [editTarget, setEditTarget] = useState<IEditTarget | null>(null);
  const [modalType, setModalType] = useState<TModalType>('add');
  const [isModalOpened, setIsModalOpened] = useState(false);

  const scrollRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    store.set('todoList', todoList);
  }, [todoList]);

  const openModal = () => {
    setModalType('add');
    setIsModalOpened(true);
  };

  const closeModal = () => {
    setIsModalOpened(false);
  };

  const scrollToBottom = () => {
    if (!scrollRef.current) return;

    const listHeight = scrollRef.current.offsetHeight;
    scrollRef.current.scrollBy({ top: listHeight, behavior: 'smooth' });
  };

  const onItemClick = (index: number, item: ITodoItem) => {
    setModalType('edit');
    setIsModalOpened(true);
    setEditTarget({ index, item });
  };

  const todoItems = todoList.map((item, index) => {
    return (
      <TodoItem
        key={`${item.content}${item.id}`}
        item={item}
        index={index}
        onItemClick={onItemClick}
        setTodoList={setTodoList}
      />
    );
  });

  return (
    <div className={styles.todoList}>
      <div className={styles.title}>
        <p>Todo List</p>
      </div>
      <ul ref={scrollRef}>
        {todoItems}
        <button type='button' className={styles.scrollButton} onClick={scrollToBottom}>
          <ArrowIcon />
        </button>
      </ul>
      <button type='button' className={styles.createButton} onClick={openModal}>
        <AddIcon />
      </button>
      <ModalPortal>
        {isModalOpened && (
          <TodoModal
            type={modalType}
            todoList={todoList}
            setTodoList={setTodoList}
            closeModal={closeModal}
            editTarget={editTarget || null}
          />
        )}
      </ModalPortal>
    </div>
  );
};

export default TodoList;
