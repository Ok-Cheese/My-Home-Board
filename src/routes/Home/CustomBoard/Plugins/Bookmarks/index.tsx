import Slider from 'react-slick';

import styles from './bookmarks.module.scss';
import './bookmark.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useRecoilValue } from 'recoil';
import { bookmarkAtom } from 'states/bookmark';
import { getBookmarkIcon } from './utils';

const settings = {
  className: styles.slider,
  centerMode: true,
  infinite: true,
  centerPadding: '250px',
  slidesToShow: 1,
  speed: 500,
};

const Bookmarks = () => {
  const bookmarks = useRecoilValue(bookmarkAtom);

  const visitBookmark = (url: string) => {
    window.open(`${url}`, '_blank');
  };

  const sliderItems = bookmarks.map((bm) => (
    <button key={bm.name} type='button' className={styles.bookmarkBox} onClick={() => visitBookmark(bm.url)}>
      {getBookmarkIcon(bm.icon)}
      <h3>{bm.name}</h3>
    </button>
  ));

  return (
    <div className={styles.bookmark}>
      <Slider {...settings}>{sliderItems}</Slider>
    </div>
  );
};

export default Bookmarks;
