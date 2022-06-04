import Button from 'components/Button';
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { ISchedule } from 'routes/Home/CustomBoard/Plugins/Dday';
import Modal from '..';
import styles from './addSchedule.module.scss';

interface IProps {
  schedule?: ISchedule;
  setSchedule: Dispatch<SetStateAction<ISchedule | null>>;
  closeModal: () => void;
}

const AddSchedule = ({ schedule, setSchedule, closeModal }: IProps) => {
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState<Date | null>(null);

  useEffect(() => {
    if (schedule) {
      setTitle(schedule.title);
      setDeadline(schedule.deadline);
    }
  }, [schedule]);

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
    setSchedule(newSchedule);
    closeModal();
  };

  return (
    <Modal size={{ width: '400px', height: '400px' }}>
      <form className={styles.changeScheduleForm} onSubmit={submitHandler}>
        <input type='text' value={title} onChange={titleChangeHandler} spellCheck={false} />
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
