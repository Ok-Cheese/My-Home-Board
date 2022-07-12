import { useCallback, useEffect, useState } from 'react';
import { Layout } from 'react-grid-layout';
import Slider from 'react-slick';
import store from 'store';

import { IBookmark } from './type.d';
import { bookmarkPreset, getBookmarkIcon } from './utils';
import { AddIcon, CloseIcon, TrashIcon } from 'assets/svgs';

import BookmarkModal from './BookmarkModal';
import Button from 'components/Button';
import ModalPortal from 'components/Modal/Potal';

import styles from './bookmarks.module.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './bookmark.scss';

interface IProps {
  layout: Layout;
}

const savedBookmark = store.get('bookmarkList');

const Bookmarks = ({ layout }: IProps) => {
  const [bookmarkList, setBookmarkList] = useState<IBookmark[]>(savedBookmark || bookmarkPreset);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [isRemoveMode, setIsRemoveMode] = useState(false);

  const settings = {
    className: styles.slider,
    centerMode: true,
    dots: true,
    infinite: true,
    centerPadding: '0px',
    slidesToShow: layout.w % 2 ? layout.w : layout.w - 1,
    speed: 500,
  };

  useEffect(() => {
    store.set('bookmarkList', bookmarkList);
  }, [bookmarkList]);

  const openBookmark = (url: string) => {
    window.open(`${url}`, '_blank');
  };

  const openModal = useCallback(() => {
    setIsModalOpened(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpened(false);
  }, []);

  const toggleRemoveMode = () => {
    setIsRemoveMode((prev) => !prev);
  };

  const removeBookmark = (index: number) => {
    const newBookmarks = bookmarkList.slice();
    newBookmarks.splice(index, 1);
    setBookmarkList(newBookmarks);
  };

  const sliderItems = bookmarkList.map((bookmark, index) => {
    const BookmarkIcon = getBookmarkIcon(bookmark.icon);
    const removeIcon = isRemoveMode && (
      <button type='button' className={styles.removeIcon} onClick={() => removeBookmark(index)}>
        <CloseIcon />
      </button>
    );

    return (
      <div key={bookmark.name} className={styles.bookmarkBox}>
        <button type='button' className={styles.bookmarkIcon} onClick={() => openBookmark(bookmark.url)}>
          <BookmarkIcon />
          <span>{bookmark.name}</span>
        </button>
        {removeIcon}
      </div>
    );
  });

  return (
    <div className={styles.bookmark}>
      <Slider {...settings}>{sliderItems}</Slider>
      <div className={styles.buttonWrapper}>
        <Button type='button' onClick={openModal}>
          <AddIcon />
        </Button>
        <Button type='button' onClick={toggleRemoveMode}>
          <TrashIcon />
        </Button>
      </div>
      <ModalPortal>
        {isModalOpened && <BookmarkModal setBookmarkList={setBookmarkList} closeModal={closeModal} />}
      </ModalPortal>
    </div>
  );
};

export default Bookmarks;
