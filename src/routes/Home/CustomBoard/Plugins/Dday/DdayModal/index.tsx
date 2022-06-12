import DatePicker from 'react-datepicker';
import Modal from 'components/Modal';
import styles from './ddayModal.module.scss';
import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import Input from 'components/Input';
import { IDday } from './type';
import DateInput from 'components/DateInput';

interface IProps {
  dday: IDday;
  setDday: Dispatch<SetStateAction<IDday | null>>;
  closeModal: () => void;
}

const DdayModal = ({ dday, setDday, closeModal }: IProps) => {
  const [title, setTitle] = useState(dday ? dday.title : '');
  const [deadline, setDeadline] = useState(dday ? dday.deadline : null);

  const changeDeadlineHandler = (date: Date) => {
    setDeadline(date);
  };

  const cancelEditHandler = () => {
    closeModal();
  };

  const ddaySubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !deadline) return;

    setDday({ title, deadline });
    closeModal();
  };

  return (
    <Modal>
      <form className={styles.editForm} onSubmit={ddaySubmitHandler}>
        <div className={styles.inputWrapper}>
          <p>내용</p>
          <Input value={title} setValue={setTitle} />
        </div>
        <div className={styles.inputWrapper}>
          <p>마감일</p>
          <DateInput value={deadline} setValue={setDeadline} />
        </div>
        <div className={styles.buttonWrapper}>
          <button type='submit'>확인</button>
          <button type='button' onClick={cancelEditHandler}>
            취소
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default DdayModal;
