import dayjs from 'dayjs';
import { useState } from 'react';
import store from 'store';
import styles from './today.module.scss';

const Today = () => {
  const [currentCity] = useState('Seoul');
  const [currentTemp] = useState('0');

  const currentTime = dayjs().format('hh : mm');
  const currentDate = dayjs().format('MMM DD');
  const currentDay = dayjs().format('ddd');

  const [, setCoordinate] = useState({ lat: 0, lon: 0 });

  const catchPosition = () => {
    navigator.geolocation.getCurrentPosition(getCoords);
  };

  const getCoords = (position: any) => {
    const coords = {
      lat: position.coords.latitude,
      lon: position.coords.longitude,
    };

    store.set('coordinate', coords);
    setCoordinate(coords);
  };

  catchPosition();

  /* const { data, isLoading, isError } = useQuery(['getLocaleData', coordinate], () => {
    getLocaleInform(coordinate);
  }); */

  return (
    <div className={styles.today}>
      <p className={styles.date}>{`${currentDate} / ${currentDay}`}</p>
      <p className={styles.time}>{`${currentTime}`}</p>
      <p className={styles.local}>{`${currentCity} / ${currentTemp}°C`}</p>
    </div>
  );
};

export default Today;
