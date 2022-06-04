import Slider from 'react-slick';

import styles from './bookmarks.module.scss';
import './bookmark.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ModalPortal from 'components/Modal/Potal';
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { isEditModeAtom } from 'states/plugin';
import { bookmarkAtom } from 'states/bookmark';
import AddBookmarkModal from 'components/Modal/AddBookmarkModal';
import Button from 'components/Button';
import { getBookmarkIcon } from './utils';

const settings = {
  className: styles.slider,
  centerMode: true,
  infinite: true,
  centerPadding: '200px',
  slidesToShow: 1,
  speed: 500,
};

const Bookmarks = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const isEditMode = useRecoilValue(isEditModeAtom);
  const [bookmarks, setBookmarks] = useRecoilState(bookmarkAtom);

  const visitBookmark = (url: string) => {
    window.open(`${url}`, '_blank');
  };

  const sliderItems = bookmarks.map((bm) => (
    <button key={bm.name} type='button' className={styles.bookmarkBox} onClick={() => visitBookmark(bm.url)}>
      {getBookmarkIcon(bm.icon)}
      <h3>{bm.name}</h3>
      {isEditMode && <button type='button'>X</button>}
    </button>
  ));

  const openAddModal = () => {
    setIsModalOpened(true);
  };

  const closeModal = () => {
    setIsModalOpened(false);
  };

  return (
    <div className={styles.bookmark}>
      <Slider {...settings}>
        {sliderItems}
        <ModalPortal>{isModalOpened && <AddBookmarkModal closeEvent={closeModal} />}</ModalPortal>
      </Slider>
      <div className={styles.buttonWrapper}>
        <Button size='normal' onClick={openAddModal}>
          추가
        </Button>
      </div>
    </div>
  );
};

export default Bookmarks;
