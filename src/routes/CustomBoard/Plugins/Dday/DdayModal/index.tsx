import { Dispatch, FormEvent, SetStateAction, useState } from 'react';

import { IDday } from '../type';

import Input from 'components/Input';
import Modal from 'components/Modal';
import Button from 'components/Button';
import DateInput from 'components/DateInput';

import styles from './ddayModal.module.scss';

interface IProps {
  dday: IDday;
  setDday: Dispatch<SetStateAction<IDday | null>>;
  closeModal: () => void;
}

const DdayModal = ({ dday, setDday, closeModal }: IProps) => {
  const [title, setTitle] = useState(dday ? dday.title : '');
  const [deadline, setDeadline] = useState(dday ? dday.deadline : null);

  const isDdayValid = Boolean(title && deadline);

  const cancelEditHandler = () => {
    closeModal();
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !deadline) return;

    setDday({ title, deadline });
    closeModal();
  };

  return (
    <Modal closeModal={closeModal}>
      <form className={styles.editForm} onSubmit={submitHandler}>
        <div className={styles.inputWrapper}>
          <Input label='내용' value={title} setValue={setTitle} />
        </div>
        <div className={styles.inputWrapper}>
          <DateInput label='마감일' value={deadline} setValue={setDeadline} />
        </div>
        <div className={styles.buttonWrapper}>
          <Button type='submit' size='fill' disabled={!isDdayValid}>
            확인
          </Button>
          <Button size='fill' onClick={cancelEditHandler}>
            취소
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default DdayModal;
