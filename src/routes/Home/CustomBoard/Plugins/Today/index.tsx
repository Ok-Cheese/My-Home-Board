import axios from 'axios';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import store from 'store';
import { useQuery } from 'react-query';
import styles from './today.module.scss';
import { getLocaleInform } from './utils';

const Today = () => {
  const [currentCity, setCurrentCity] = useState('Seoul');
  const [currentWeather, setCurrentWeather] = useState('Clear');
  const [currentTemp, setCurrentTemp] = useState('0');

  const currentTime = dayjs().format('hh : mm');
  const currentDate = dayjs().format('MMM DD');
  const currentDay = dayjs().format('ddd');

  const [coordinate, setCoordinate] = useState({ lat: 0, lon: 0 });

  const catchPosition = () => {
    navigator.geolocation.getCurrentPosition(getCoords, showErrorMessage);
  };

  const getCoords = (position: any) => {
    const coords = {
      lat: position.coords.latitude,
      lon: position.coords.longitude,
    };

    store.set('coordinate', coords);
    setCoordinate(coords);
  };

  const showErrorMessage = () => {
    console.log("I can't get your position.\nPlease reload this page.");
  };

  catchPosition();

  const { data, isLoading, isError } = useQuery(['getLocaleData', coordinate], () => {
    getLocaleInform(coordinate);
  });

  return (
    <div>
      <div className={styles.date}>
        <p>{`${currentDate} / ${currentDay}`}</p>
      </div>
      <div className={styles.date}>
        <p>{`${currentTime}`}</p>
      </div>
      <div className={styles.date}>
        <p>{`${currentCity} / ${currentTemp}°C`}</p>
      </div>
    </div>
  );
};

export default Today;
