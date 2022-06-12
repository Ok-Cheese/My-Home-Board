import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { useMount } from 'react-use';

import { IEditTarget, ITodoItem } from '../type';

import Modal from 'components/Modal';
import Button from 'components/Button';
import DateInput from 'components/DateInput';

import styles from './todoModal.module.scss';
import './datepicker.css';

interface IProps {
  type: 'add' | 'edit';
  todoList: ITodoItem[];
  setTodoList: Dispatch<SetStateAction<ITodoItem[]>>;
  closeModal: () => void;
  editTarget: IEditTarget | null;
}

const TodoModal = ({ type, todoList, setTodoList, editTarget, closeModal }: IProps) => {
  const [todoCotent, setTodoContent] = useState<string>('');
  const [todoDeadline, setTodoDeadline] = useState<Date | null>(null);

  useMount(() => {
    if (type === 'edit' && editTarget) {
      setTodoContent(editTarget.item.content);
      setTodoDeadline(editTarget.item.deadline);
    }
  });

  const changeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTodoContent(e.currentTarget.value);
  };

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
      setTodoList((prev) => [
        ...prev,
        { id: todoList.length + 1, content: todoCotent, deadline: todoDeadline, complete: false },
      ]);
      closeModal();
      return;
    }

    if (!editTarget) return;

    const newTodoItem = { ...todoList[editTarget.index], content: todoCotent, deadline: todoDeadline };
    const newTodoList = todoList.slice();
    newTodoList.splice(editTarget.index, 1, newTodoItem);
    setTodoList(newTodoList);
    closeModal();
  };

  return (
    <Modal>
      <form className={styles.todoForm} onSubmit={submitHandler}>
        <div className={styles.inputWrapper}>
          <p>내용</p>
          <input type='text' className={styles.todoInput} onChange={changeInputHandler} value={todoCotent} />
        </div>
        <div className={styles.inputWrapper}>
          <p>마감일</p>
          <DateInput value={todoDeadline} setValue={setTodoDeadline} />
        </div>
        <div className={styles.buttonWrapper}>
          <Button type='submit' disabled={!todoCotent}>
            확인
          </Button>
          {type === 'add' && <Button onClick={cancelEditHandler}>취소</Button>}
          {type === 'edit' && <Button onClick={removeTodoHandler}>삭제</Button>}
        </div>
      </form>
    </Modal>
  );
};

export default TodoModal;
