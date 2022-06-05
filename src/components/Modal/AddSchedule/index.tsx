import Button from 'components/Button';
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { ISchedule } from 'routes/Home/CustomBoard/Plugins/Dday';
import Modal from '..';
import styles from './addSchedule.module.scss';
import store from 'store';
import Input from 'components/Input';

interface IProps {
  setSchedule: Dispatch<SetStateAction<ISchedule | null>>;
  closeModal: () => void;
}

const AddSchedule = ({ setSchedule, closeModal }: IProps) => {
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState<Date | null>(null);

  const titleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const dateChangeHandler = (date: Date) => {
    setDeadline(date);
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !deadline) {
      closeModal();
      return;
    }

    const newSchedule = { title, deadline };
    store.set('schedule', newSchedule);
    setSchedule(newSchedule);
    closeModal();
  };

  return (
    <Modal>
      <form className={styles.changeScheduleForm} onSubmit={submitHandler}>
        <Input value={title} setValue={titleChangeHandler} placeholder='일정을 입력하세요.' />
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
          <Button size='normal' type='submit'>
            확인
          </Button>
          <Button size='normal' onClick={closeModal}>
            취소
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddSchedule;
