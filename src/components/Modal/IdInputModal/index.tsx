import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from 'react';
import store from 'store';

import Modal from '..';
import Button from 'components/Button';

import styles from './idInputModal.module.scss';

interface IProps {
  type: 'github' | 'BOJ';
  setUserId: Dispatch<SetStateAction<string>>;
  setIsModalOpened: Dispatch<SetStateAction<boolean>>;
}

const IdInputModal = ({ type, setUserId, setIsModalOpened }: IProps) => {
  const [idInput, setIdInput] = useState('');

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setIdInput(e.currentTarget.value);
  };

  const changeUserId = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (idInput === '') {
      setIsModalOpened(false);
      return;
    }

    type === 'github' ? store.set('github_id', idInput) : store.set('BOJ_id', idInput);

    setUserId(idInput);
    setIsModalOpened(false);
  };

  const closeModal = () => {
    setIsModalOpened(false);
  };

  return (
    <Modal size={{ width: '300px', height: '200px' }}>
      <form className={styles.changeIdForm} onSubmit={changeUserId}>
        <input type='text' onChange={inputHandler} spellCheck={false} />
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

export default IdInputModal;
