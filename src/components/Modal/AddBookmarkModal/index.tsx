import Button from 'components/Button';
import { title } from 'process';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { getBookmarkIcon, iconIds } from 'routes/Home/CustomBoard/Plugins/Bookmarks/utils';
import { bookmarkAtom, bookmarkPreset } from 'states/bookmark';
import Modal from '..';
import styles from './addBookmarkModal.module.scss';

interface IProps {
  closeEvent: () => void;
}

const AddBookmarkModal = ({ closeEvent }: IProps) => {
  const [bookmarkName, setBookmarkName] = useState('');
  const [bookmarkUrl, setBookmarkUrl] = useState('');
  const [bookamarkIcon, setBookmarkIcon] = useState('');
  const setBookmark = useSetRecoilState(bookmarkAtom);

  const nameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setBookmarkName(e.currentTarget.value);
  };

  const urlChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setBookmarkUrl(e.currentTarget.value);
  };

  const selectIcon = (id: string) => {
    setBookmarkIcon(id);
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!bookmarkName || !bookmarkUrl || !bookamarkIcon) {
      closeEvent();
      return;
    }

    const newBookmark = { name: bookmarkName, url: bookmarkUrl, icon: bookamarkIcon };

    setBookmark((prev) => [...prev, newBookmark]);
    closeEvent();
  };

  return (
    <Modal size={{ width: '600px', height: '600px' }}>
      (
      <form className={styles.bookmarkModalForm} onSubmit={submitHandler}>
        <div className={styles.logos}>
          {iconIds.map((id) => (
            <div key={id}>
              <button type='button' onClick={() => selectIcon(id)}>
                {getBookmarkIcon(id)}
              </button>
            </div>
          ))}
        </div>
        <div className={styles.inputWrapper}>
          <input type='text' onChange={nameChangeHandler} value={bookmarkName} />
          <input type='text' onChange={urlChangeHandler} value={bookmarkUrl} />
        </div>
        <div className={styles.buttonWrapper}>
          <Button size='normal' type='submit'>
            확인
          </Button>
          <Button size='normal' onClick={() => closeEvent()}>
            취소
          </Button>
        </div>
      </form>
      )
    </Modal>
  );
};

export default AddBookmarkModal;
