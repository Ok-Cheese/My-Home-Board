import { useCallback, useEffect, useMemo, useState } from 'react';
import { Layout } from 'react-grid-layout';
import HorizontalScroll from 'react-scroll-horizontal';
import store from 'store';

import { IBookmark } from './type.d';
import { bookmarkPreset } from './utils';
import { AddIcon, TrashIcon } from 'assets/svgs';

import BookmarkModal from './BookmarkModal';
import BookmarkItem from './BookmarkItem';
import ModalPortal from 'components/Modal/Potal';
import Icon from 'components/Icon';

import styles from './bookmarks.module.scss';

const savedBookmark = store.get('bookmarkList');

const Bookmarks = () => {
  const [bookmarkList, setBookmarkList] = useState<IBookmark[]>(savedBookmark || bookmarkPreset);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [isRemoveMode, setIsRemoveMode] = useState(false);

  useEffect(() => {
    store.set('bookmarkList', bookmarkList);
  }, [bookmarkList]);

  const openModal = useCallback(() => {
    setIsModalOpened(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpened(false);
  }, []);

  const toggleRemoveMode = () => {
    setIsRemoveMode((prev) => !prev);
  };

  const bookmarkItems = useMemo(
    () =>
      bookmarkList.map((bookmark, index) => (
        <BookmarkItem
          key={bookmark.name}
          bookmark={bookmark}
          index={index}
          isRemoveMode={isRemoveMode}
          bookmarkList={bookmarkList}
          setBookmarkList={setBookmarkList}
        />
      )),
    [bookmarkList, isRemoveMode]
  );

  return (
    <div className={styles.wrapper}>
      <HorizontalScroll reverseScroll>{bookmarkItems}</HorizontalScroll>
      <div className={styles.buttonWrapper}>
        <Icon size='30px' onClick={openModal}>
          <AddIcon />
        </Icon>
        <Icon size='30px' onClick={toggleRemoveMode}>
          <TrashIcon />
        </Icon>
      </div>
      <ModalPortal>
        {isModalOpened && <BookmarkModal setBookmarkList={setBookmarkList} closeModal={closeModal} />}
      </ModalPortal>
    </div>
  );
};

export default Bookmarks;
