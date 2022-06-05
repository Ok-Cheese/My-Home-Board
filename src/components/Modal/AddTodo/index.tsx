import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from 'react';

import Modal from '..';
import { ITodoItem } from 'routes/Home/CustomBoard/Plugins/Todolist';
import Button from 'components/Button';

import styles from './addTodo.module.scss';

interface IProps {
  setTodoList: Dispatch<SetStateAction<ITodoItem[]>>;
  setIsModalOpened: Dispatch<React.SetStateAction<boolean>>;
}

const AddTodoModal = ({ setTodoList, setIsModalOpened }: IProps) => {
  const [todoContent, setTodoContent] = useState('');

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTodoContent(e.currentTarget.value);
  };

  const createTodoHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setTodoList((prev) => [...prev, { id: prev.length + 1, content: todoContent, complete: false }]);

    setIsModalOpened(false);
  };

  const cancelHandler = () => {
    setIsModalOpened(false);
  };

  return (
    <Modal>
      <form className={styles.addTodoForm} onSubmit={createTodoHandler}>
        <input type='text' onChange={inputChangeHandler} value={todoContent} />
        <div className={styles.buttonWrapper}>
          <Button type='submit' size='normal'>
            완료
          </Button>
          <Button type='button' size='normal' onClick={cancelHandler}>
            취소
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddTodoModal;
