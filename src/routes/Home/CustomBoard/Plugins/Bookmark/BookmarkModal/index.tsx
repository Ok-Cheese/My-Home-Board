import Input from 'components/Input';
import Modal from 'components/Modal';
import { FormEvent, useState } from 'react';
import { useRecoilState } from 'recoil';
import { bookmarkAtom } from 'states/bookmark';
import { cx } from 'styles';
import { getBookmarkIcon, iconIds } from '../utils';

import styles from './bookmarkModal.module.scss';

interface IProps {
  closeModal: () => void;
}

const BoomarkModal = ({ closeModal }: IProps) => {
  const [selectedIcon, setSelectedIcon] = useState('');
  const [bookmarkName, setBookmarkName] = useState('');
  const [bookmarkUrl, setBookmarkUrl] = useState('');
  const [bookmark, setBookmark] = useRecoilState(bookmarkAtom);

  const selectIconHandler = (id: string) => {
    setSelectedIcon(id);
  };

  const submitBookmarkHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (bookmark.find(({ icon }) => icon === selectedIcon)) return;

    const newBookmark = { name: bookmarkName, url: bookmarkUrl, icon: selectedIcon };
    setBookmark((prev) => [...prev, newBookmark]);
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

  return (
    <Modal>
      <form className={styles.bookmarkForm} onSubmit={submitBookmarkHandler}>
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
          <button type='submit'>확인</button>
          <button type='button' onClick={() => closeModal()}>
            취소
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default BoomarkModal;
