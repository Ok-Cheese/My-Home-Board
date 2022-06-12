import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { cx } from 'styles';

import { IBookmark } from '../type';
import { getBookmarkIcon, iconIds } from '../utils';

import Input from 'components/Input';
import Modal from 'components/Modal';
import Button from 'components/Button';

import styles from './bookmarkModal.module.scss';

interface IProps {
  setBookmarkList: Dispatch<SetStateAction<IBookmark[]>>;
  closeModal: () => void;
}

const BoomarkModal = ({ setBookmarkList, closeModal }: IProps) => {
  const [selectedIcon, setSelectedIcon] = useState('');
  const [bookmarkName, setBookmarkName] = useState('');
  const [bookmarkUrl, setBookmarkUrl] = useState('');

  const selectIconHandler = (id: string) => {
    setSelectedIcon(id);
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newBookmark = { name: bookmarkName, url: bookmarkUrl, icon: selectedIcon };
    setBookmarkList((prev) => [...prev, newBookmark]);
    closeModal();
  };

  const iconList = iconIds.map((id) => {
    const BookmarkIconPreset = getBookmarkIcon(id);

    return (
      <div key={id} className={cx(styles.iconWrapper, { [styles.selectedIcon]: id === selectedIcon })}>
        <button
          type='button'
          onClick={() => {
            selectIconHandler(id);
          }}
        >
          <BookmarkIconPreset />
        </button>
      </div>
    );
  });

  const isInputValid = Boolean(selectedIcon && bookmarkName && bookmarkUrl);

  return (
    <Modal>
      <form className={styles.bookmarkForm} onSubmit={submitHandler}>
        <div className={styles.selectIcon}>{iconList}</div>
        <div className={styles.inputWrapper}>
          <p>이름</p>
          <Input type='text' value={bookmarkName} setValue={setBookmarkName} />
        </div>
        <div className={styles.inputWrapper}>
          <p>URL</p>
          <Input type='text' value={bookmarkUrl} setValue={setBookmarkUrl} />
        </div>
        <div className={styles.buttonWrapper}>
          <Button type='submit' disabled={!isInputValid}>
            확인
          </Button>
          <Button onClick={() => closeModal()}>취소</Button>
        </div>
      </form>
    </Modal>
  );
};

export default BoomarkModal;
