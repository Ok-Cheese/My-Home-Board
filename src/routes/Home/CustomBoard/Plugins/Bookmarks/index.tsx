import Slider from 'react-slick';

import styles from './bookmarks.module.scss';
import './indirectStyle.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ModalPortal from 'components/Modal/Potal';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { isEditModeAtom } from 'states/plugin';
import { bookmarkAtom } from 'states/bookmark';
import AddBookmarkModal from 'components/Modal/AddBookmarkModal';

const settings = {
  className: styles.slider,
  centerMode: true,
  infinite: true,
  centerPadding: '100px',
  slidesToShow: 3,
  swipeToSlide: true,
  speed: 500,
};

const Bookmarks = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const isEditMode = useRecoilState(isEditModeAtom);
  const [bookmarks, setBookmarks] = useRecoilState(bookmarkAtom);

  const sliderItems = bookmarks.map((bm) => (
    <div key={bm.name} className={styles.bookmarkBox}>
      {bm.icon}
      <h3>{bm.name}</h3>
      {isEditMode && <button type='button'>X</button>}
    </div>
  ));

  const openAddModal = () => {
    setIsModalOpened(true);
  };

  return (
    <Slider {...settings}>
      <button type='button' className={styles.addBookamrk} onClick={openAddModal}>
        추가
      </button>
      {sliderItems}
      <ModalPortal>{isModalOpened && <AddBookmarkModal />}</ModalPortal>
    </Slider>
  );
};

export default Bookmarks;
