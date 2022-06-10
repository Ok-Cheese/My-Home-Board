import { useRecoilValue } from 'recoil';
import Slider from 'react-slick';

import { getBookmarkIcon } from './utils';
import { bookmarkAtom } from 'states/bookmark';

import styles from './bookmarks.module.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './bookmark.scss';
import { Layout } from 'react-grid-layout';

interface IProps {
  layout: Layout;
}

const Bookmarks = ({ layout }: IProps) => {
  const bookmarks = useRecoilValue(bookmarkAtom);

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

  const sliderItems = bookmarks.map((bm) => (
    <button key={bm.name} type='button' className={styles.bookmarkBox} onClick={() => visitBookmark(bm.url)}>
      {getBookmarkIcon(bm.icon)}
      <span>{bm.name}</span>
    </button>
  ));

  return (
    <div className={styles.bookmark}>
      <Slider {...settings}>{sliderItems}</Slider>
    </div>
  );
};

export default Bookmarks;
