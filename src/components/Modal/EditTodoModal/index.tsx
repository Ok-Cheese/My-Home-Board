import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { IEditTarget, ITodoItem } from 'routes/Home/CustomBoard/Plugins/Todolist';
import DatePicker from 'react-datepicker';
import styles from './editTodoModal.module.scss';
import 'react-datepicker/dist/react-datepicker.css';

interface IProps {
  editTarget: IEditTarget;
  setTodoList: Dispatch<SetStateAction<ITodoItem[]>>;
  setIsEditModalOpened: Dispatch<SetStateAction<boolean>>;
}

const EditTodoModal = ({ editTarget, setTodoList, setIsEditModalOpened }: IProps) => {
  const [deadline, setDeadline] = useState<Date | null>(editTarget.item.deadline);
  const [todoContent, setTodoContent] = useState(editTarget.item.content);

  const dateChangeHandler = (date: Date) => {
    if (!date) return;

    setDeadline(date);
  };

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTodoContent(e.currentTarget.value);
  };

  const createTodoHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const editedItem = { id: editTarget.item.id, content: todoContent, deadline, complete: editTarget.item.complete };

    setTodoList((prev) => {
      const editedList = prev.slice();
      editedList.splice(editTarget.index, 1, editedItem);

      return editedList;
    });

    setIsEditModalOpened(false);
  };

  const deleteHandler = () => {
    setTodoList((prev) => {
      const editedList = prev.slice();
      editedList.splice(editTarget.index, 1);

      return editedList;
    });
    setIsEditModalOpened(false);
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
          <button type='button' onClick={deleteHandler}>
            삭제
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTodoModal;
