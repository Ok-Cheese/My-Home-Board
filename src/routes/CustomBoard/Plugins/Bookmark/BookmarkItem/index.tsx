import { Dispatch } from 'react';

import { IBookmark } from '../type.d';
import { getBookmarkIcon } from '../utils';
import { CloseIcon } from 'assets/svgs';

import Icon from 'components/Icon';

import styles from './bookmarkItem.module.scss';

interface IProps {
  bookmark: IBookmark;
  bookmarkList: IBookmark[];
  setBookmarkList: Dispatch<React.SetStateAction<IBookmark[]>>;
  index: number;
  isRemoveMode: boolean;
}

const BookmarkItem = ({ bookmark, bookmarkList, setBookmarkList, index, isRemoveMode }: IProps) => {
  const removeBookmark = (targetIndex: number) => {
    const newBookmarks = bookmarkList.slice();
    newBookmarks.splice(targetIndex, 1);
    setBookmarkList(newBookmarks);
  };

  const BookmarkIcon = getBookmarkIcon(bookmark.icon);
  const removeIcon = isRemoveMode && (
    <Icon position={{ top: '0', left: '100%' }} onClick={() => removeBookmark(index)}>
      <CloseIcon />
    </Icon>
  );

  const openBookmark = () => {
    window.open(`${bookmark.url}`, '_blank');
  };

  return (
    <div key={bookmark.name} className={styles.wrapper}>
      <div className={styles.bookmarkIcon}>
        <Icon size='75px' onClick={openBookmark}>
          <BookmarkIcon />
        </Icon>
        <p className={styles.name}>{bookmark.name}</p>
      </div>
      {removeIcon}
    </div>
  );
};

export default BookmarkItem;
