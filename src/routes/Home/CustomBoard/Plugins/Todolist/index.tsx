import AddTodoModal from 'components/Modal/AddTodoModal';
import EditTodoModal from 'components/Modal/EditTodoModal';
import ModalPortal from 'components/Modal/Potal';
import { Dispatch, SetStateAction, useState } from 'react';
import { useRecoilState } from 'recoil';
import { todolistState } from 'states/todolist';
import TodoItem from './TodoItem';
import styles from './todolist.module.scss';

export interface ITodoItem {
  id: number;
  content: string;
  deadline: Date | null;
  complete: boolean;
}

export interface IEditTarget {
  index: number;
  item: ITodoItem;
}

const Todolist = () => {
  const [todolist, setTodolist] = useRecoilState<ITodoItem[]>(todolistState);
  const [isAddModalOpened, setIsAddModalOpened] = useState(false);
  const [isEditMidalOpened, setIsEditModalOpened] = useState(false);
  const [editTarget, setEditTarget] = useState<IEditTarget | null>();

  const todoItems = todolist.map((item, index) => {
    return (
      <TodoItem
        key={`${item.content}${item.id}`}
        item={item}
        index={index}
        setTodolist={setTodolist}
        setIsEditModalOpened={setIsEditModalOpened}
        setEditTarget={setEditTarget as Dispatch<SetStateAction<IEditTarget>>}
      />
    );
  });

  const openAddTodoModal = () => {
    setIsAddModalOpened(true);
  };

  return (
    <div className={styles.todolist}>
      <ul>{todoItems}</ul>
      <button type='button' className={styles.createButton} onClick={openAddTodoModal}>
        +
      </button>
      <ModalPortal>
        {isAddModalOpened && <AddTodoModal setTodoList={setTodolist} setIsModalOpened={setIsAddModalOpened} />}
        {isEditMidalOpened && (
          <EditTodoModal
            editTarget={editTarget as IEditTarget}
            setTodoList={setTodolist}
            setIsEditModalOpened={setIsEditModalOpened}
          />
        )}
      </ModalPortal>
    </div>
  );
};

export default Todolist;
