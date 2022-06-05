import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { IEditTarget, ITodoItem } from 'routes/Home/CustomBoard/Plugins/Todolist';
import styles from './editTodoModal.module.scss';
import Modal from '..';

interface IProps {
  editTarget: IEditTarget;
  setTodoList: Dispatch<SetStateAction<ITodoItem[]>>;
  setIsEditModalOpened: Dispatch<SetStateAction<boolean>>;
}

const EditTodoModal = ({ editTarget, setTodoList, setIsEditModalOpened }: IProps) => {
  const [todoContent, setTodoContent] = useState(editTarget.item.content);

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTodoContent(e.currentTarget.value);
  };

  const createTodoHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const editedItem = { id: editTarget.item.id, content: todoContent, complete: editTarget.item.complete };

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
    <Modal>
      <form className={styles.addTodoForm} onSubmit={createTodoHandler}>
        <input type='text' onChange={inputChangeHandler} value={todoContent} />
        <div className={styles.buttonWrapper}>
          <button type='submit'>완료</button>
          <button type='button' onClick={deleteHandler}>
            삭제
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditTodoModal;
