import { useRecoilState } from 'recoil';
import Slider from 'react-slick';

import { getBookmarkIcon } from './utils';
import { bookmarkAtom } from 'states/bookmark';

import styles from './bookmarks.module.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './bookmark.scss';
import { Layout } from 'react-grid-layout';
import { useState } from 'react';
import ModalPortal from 'components/Modal/Potal';
import BookmarkModal from './BookmarkModal';
import { AddIcon, CloseIcon, TrashIcon } from 'assets/svgs';

interface IProps {
  layout: Layout;
}

const Bookmarks = ({ layout }: IProps) => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [isRemoveMode, setIsRemoveMode] = useState(false);
  const [bookmarks, setBookmarks] = useRecoilState(bookmarkAtom);

  const settings = {
    className: styles.slider,
    centerMode: true,
    dots: true,
    infinite: true,
    centerPadding: '0px',
    slidesToShow: layout.w % 2 ? layout.w : layout.w - 1,
    speed: 500,
  };

  const visitBookmark = (url: string) => {
    window.open(`${url}`, '_blank');
  };

  const openModal = () => {
    setIsModalOpened(true);
  };

  const closeModal = () => {
    setIsModalOpened(false);
  };

  const toggleRemoveMode = () => {
    setIsRemoveMode((prev) => !prev);
  };

  const removeBookmark = (index: number) => {
    const newBookmarks = bookmarks.slice();
    newBookmarks.splice(index, 1);
    setBookmarks(newBookmarks);
  };

  const sliderItems = bookmarks.map((bm, index) => {
    const BookmarkIcon = getBookmarkIcon(bm.icon);
    return (
      <div key={bm.name} className={styles.bookmarkBox}>
        <button type='button' onClick={() => visitBookmark(bm.url)}>
          <BookmarkIcon />
          <span>{bm.name}</span>
        </button>
        {isRemoveMode && (
          <button type='button' className={styles.removeBookmarkButton} onClick={() => removeBookmark(index)}>
            <CloseIcon />
          </button>
        )}
      </div>
    );
  });

  return (
    <div className={styles.bookmark}>
      <Slider {...settings}>{sliderItems}</Slider>
      <div className={styles.buttonWrapper}>
        <button type='button' onClick={openModal}>
          <AddIcon />
        </button>
        <button type='button' onClick={toggleRemoveMode}>
          <TrashIcon />
        </button>
      </div>
      <ModalPortal>{isModalOpened && <BookmarkModal closeModal={closeModal} />}</ModalPortal>
    </div>
  );
};

export default Bookmarks;
