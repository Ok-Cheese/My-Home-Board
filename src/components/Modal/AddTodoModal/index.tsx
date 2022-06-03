import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from 'react';
import DatePicker from 'react-datepicker';

import styles from './addTodoModal.module.scss';
import 'react-datepicker/dist/react-datepicker.css';
import { ITodoItem } from 'routes/Home/CustomBoard/Plugins/Todolist';

interface IProps {
  setTodoList: Dispatch<SetStateAction<ITodoItem[]>>;
  setIsModalOpened: Dispatch<React.SetStateAction<boolean>>;
}

const AddTodoModal = ({ setTodoList, setIsModalOpened }: IProps) => {
  const [deadline, setDeadline] = useState<Date | null>(null);
  const [todoContent, setTodoContent] = useState('');

  const dateChangeHandler = (date: Date) => {
    if (!date) return;

    setDeadline(date);
  };

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTodoContent(e.currentTarget.value);
  };

  const createTodoHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setTodoList((prev) => [...prev, { id: prev.length + 1, content: todoContent, deadline, complete: false }]);

    setIsModalOpened(false);
  };

  const cancelHandler = () => {
    setIsModalOpened(false);
  };

  return (
    <div className={styles.backdrop}>
      <form className={styles.addTodoForm} onSubmit={createTodoHandler}>
        <input type='text' onChange={inputChangeHandler} value={todoContent} />
        <div className={styles.datePicker}>
          <DatePicker
            selected={deadline}
            onChange={dateChangeHandler}
            placeholderText='마감일을 선택해주세요.'
            timeInputLabel='Time:'
            dateFormat='MM/dd/yyyy h:mm aa'
            showTimeInput
          />
        </div>
        <div className={styles.buttonWrapper}>
          <button type='submit'>완료</button>
          <button type='button' onClick={cancelHandler}>
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTodoModal;
