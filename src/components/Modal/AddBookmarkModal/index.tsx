import { ChangeEvent, useState } from 'react';
import { getBookmarkIcon, iconIds } from 'routes/Home/CustomBoard/Plugins/Bookmarks/utils';
import { bookmarkPreset } from 'states/bookmark';
import styles from './addBookmarkModal.module.scss';

const AddBookmarkModal = () => {
  const [bookmarkName, setBookmarkName] = useState('');
  const [bookmarkUrl, setBookmarkUrl] = useState('');
  const [selectedTag, setSelectedTag] = useState('preset');

  const nameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setBookmarkName(e.currentTarget.value);
  };

  const urlChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setBookmarkUrl(e.currentTarget.value);
  };

  const changeToPreset = () => {
    setSelectedTag('preset');
    setSelectedTag('change');
  };

  const changeToCustom = () => {
    setSelectedTag('change');
  };

  const customContent = (
    <div>
      <div className={styles.logos}>
        {iconIds.map((id) => (
          <div key={id}>
            <button type='button'>{getBookmarkIcon(id)}</button>
          </div>
        ))}
      </div>
      <div className={styles.inputWrapper}>
        <input type='text' onChange={nameChangeHandler} value={bookmarkName} />
        <input type='text' onChange={urlChangeHandler} value={bookmarkUrl} />
      </div>
    </div>
  );

  const presetContent = (
    <div className={styles.logos}>
      {bookmarkPreset.map((bookmark) => (
        <div key={bookmark.icon}>
          <button type='button'>{getBookmarkIcon(bookmark.icon)}</button>
          <span>{bookmark.name}</span>
        </div>
      ))}
    </div>
  );

  const contents = selectedTag === 'preset' ? presetContent : customContent;

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <div className={styles.tag}>
          <button type='button' onClick={changeToPreset}>
            프리셋
          </button>
          <button type='button' onClick={changeToCustom}>
            로고
          </button>
          <div>{contents}</div>
        </div>
      </div>
    </div>
  );
};

export default AddBookmarkModal;
