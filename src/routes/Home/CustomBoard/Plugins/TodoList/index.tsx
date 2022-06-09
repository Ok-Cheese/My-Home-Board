import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import store from 'store';

import ModalPortal from 'components/Modal/Potal';
import { AddIcon, ArrowIcon } from 'assets/svgs';
import { IEditTarget, ITodoItem, todoListAtom } from 'states/plugin';

import TodoItem from './TodoItem';
import TodoModal from './TodoModal';

import styles from './todoList.module.scss';

const TodoList = () => {
  const [editTarget, setEditTarget] = useState<IEditTarget | null>(null);
  const [modalType, setModalType] = useState<'add' | 'edit'>('add');
  const [todoList, setTodoList] = useRecoilState<ITodoItem[]>(todoListAtom);
  const [isModalOpened, setIsModalOpened] = useState(false);

  const scrollRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    store.set('todoList', todoList);
  }, [todoList]);

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

  const clickAddHandler = () => {
    setModalType('add');
    setIsModalOpened(true);
  };

  const closeTodoModal = () => {
    setIsModalOpened(false);
  };

  const scrollToBottom = () => {
    if (!scrollRef.current) return;

    const listHeight = scrollRef.current.offsetHeight;
    scrollRef.current.scrollBy({ top: listHeight, behavior: 'smooth' });
  };

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
      <button type='button' className={styles.createButton} onClick={clickAddHandler}>
        <AddIcon />
      </button>

      <ModalPortal>
        {isModalOpened && <TodoModal type={modalType} closeModal={closeTodoModal} editTarget={editTarget || null} />}
      </ModalPortal>
    </div>
  );
};

export default TodoList;
