import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import store from 'store';

import Modal from 'components/Modal';
import Input from 'components/Input';
import Button from 'components/Button';

import styles from './bojModal.module.scss';

interface IProps {
  userId: string;
  setUserId: Dispatch<SetStateAction<string>>;
  closeModal: () => void;
}

const BOJModal = ({ userId, setUserId, closeModal }: IProps) => {
  const [id, setId] = useState(userId || '');

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    store.set('BOJ', id);
    setUserId(id);
    closeModal();
  };

  return (
    <Modal>
      <form className={styles.bojForm} onSubmit={submitHandler}>
        <div className={styles.inputWrapper}>
          <p>백준 아이디</p>
          <Input value={id} setValue={setId} />
        </div>
        <div className={styles.buttonWrapper}>
          <Button type='submit'>확인</Button>
          <Button type='button' onClick={() => closeModal()}>
            취소
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default BOJModal;
