import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { useMount } from 'react-use';

import { IEditTarget, ITodoItem } from '../type';

import Modal from 'components/Modal';
import Button from 'components/Button';
import Input from 'components/Input';

import styles from './todoModal.module.scss';

interface IProps {
  type: 'add' | 'edit';
  todoList: ITodoItem[];
  setTodoList: Dispatch<SetStateAction<ITodoItem[]>>;
  closeModal: () => void;
  editTarget?: IEditTarget;
}

const TodoModal = ({ type, todoList, setTodoList, editTarget, closeModal }: IProps) => {
  const [todoCotent, setTodoContent] = useState<string>('');

  useMount(() => {
    if (type === 'edit' && editTarget) {
      setTodoContent(editTarget.item.content);
    }
  });

  const removeTodoHandler = () => {
    if (!editTarget) return;

    const newTodoList = todoList.slice();
    newTodoList.splice(editTarget.index, 1);

    setTodoList(newTodoList);
    closeModal();
  };

  const cancelEditHandler = () => {
    closeModal();
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (type === 'add') {
      setTodoList((prev) => [...prev, { id: todoList.length + 1, content: todoCotent, complete: false }]);
      closeModal();
      return;
    }

    if (!editTarget) return;

    const newTodoItem = { ...todoList[editTarget.index], content: todoCotent };
    const newTodoList = todoList.slice();
    newTodoList.splice(editTarget.index, 1, newTodoItem);
    setTodoList(newTodoList);
    closeModal();
  };

  return (
    <Modal closeModal={closeModal}>
      <form className={styles.todoForm} onSubmit={submitHandler}>
        <Input label='내용' setValue={setTodoContent} value={todoCotent} />
        <div className={styles.buttonWrapper}>
          <Button type='submit' size='50%' disabled={!todoCotent}>
            확인
          </Button>
          {type === 'add' && (
            <Button size='50%' onClick={cancelEditHandler}>
              취소
            </Button>
          )}
          {type === 'edit' && (
            <Button size='50%' onClick={removeTodoHandler}>
              삭제
            </Button>
          )}
        </div>
      </form>
    </Modal>
  );
};

export default TodoModal;
