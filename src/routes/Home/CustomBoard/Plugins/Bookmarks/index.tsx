import Slider from 'react-slick';
import { GoogleIcon, YoutubeIcon } from 'assets/svgs';
import styles from './bookmarks.module.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const bookmarkData = [
  { name: 'Google', url: 'https://www.google.co.kr/', icon: <GoogleIcon /> },
  { name: 'Youtube', url: 'https://www.youtube.com/', icon: <YoutubeIcon /> },
  { name: 'Youtube', url: 'https://www.youtube.com/', icon: <YoutubeIcon /> },
  { name: 'Google', url: 'https://www.google.co.kr/', icon: <GoogleIcon /> },
  { name: 'Youtube', url: 'https://www.youtube.com/', icon: <YoutubeIcon /> },
  { name: 'Google', url: 'https://www.google.co.kr/', icon: <GoogleIcon /> },
];

const settings = {
  className: styles.slider,
  centerMode: true,
  infinite: true,
  centerPadding: '100px',
  slidesToShow: 3,
  swipeToSlide: true,
  speed: 500,
};

const sliderItems = bookmarkData.map((bm) => (
  <div key={bm.name} className={styles.bookmarkBox}>
    {bm.icon}
    <h3>{bm.name}</h3>
  </div>
));

const Bookmarks = () => {
  return <Slider {...settings}>{sliderItems}</Slider>;
};

export default Bookmarks;
