import { ChangeEvent, FormEvent, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useMount } from 'react-use';

import { IEditTarget, todoListAtom } from 'states/plugin';

import Modal from 'components/Modal';
import DateInput from 'components/DateInput';

import styles from './todoModal.module.scss';
import './datepicker.css';

interface IProps {
  type: 'add' | 'edit';
  closeModal: () => void;
  editTarget: IEditTarget | null;
}

const TodoModal = ({ type, editTarget, closeModal }: IProps) => {
  const [todoCotent, setTodoContent] = useState<string>('');
  const [todoDeadline, setTodoDeadline] = useState<Date | null>(null);
  const [todoList, setTodoList] = useRecoilState(todoListAtom);

  useMount(() => {
    if (type === 'edit' && editTarget) {
      setTodoContent(editTarget.item.content);
      setTodoDeadline(editTarget.item.deadline);
    }
  });

  const changeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTodoContent(e.currentTarget.value);
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

  const cancelEditHandler = () => {
    closeModal();
  };

  const removeTodoHandler = () => {
    if (!editTarget) return;

    const newTodoList = todoList.slice();
    newTodoList.splice(editTarget.index, 1);

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
          <button type='submit'>확인</button>
          {type === 'add' && (
            <button type='button' onClick={cancelEditHandler}>
              취소
            </button>
          )}
          {type === 'edit' && (
            <button type='button' onClick={removeTodoHandler}>
              삭제
            </button>
          )}
        </div>
      </form>
    </Modal>
  );
};

export default TodoModal;
