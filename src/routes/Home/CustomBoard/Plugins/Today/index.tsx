import axios from 'axios';
import dayjs from 'dayjs';
import { useState } from 'react';
import styles from './today.module.scss';

const Today = () => {
  const [currentCity, setCurrentCity] = useState('Seoul');
  const [currentWeather, setCurrentWeather] = useState('Clear');
  const [currentTemp, setCurrentTemp] = useState('0');

  const currentTime = dayjs().format('hh : mm');
  const currentDate = dayjs().format('MMM DD');
  const currentDay = dayjs().format('ddd');

  const catchPosition = () => {
    navigator.geolocation.getCurrentPosition(getCoords, showErrorMessage);
  };

  const getCoords = (position: any) => {
    const coords = {
      lat: position.coords.latitude,
      lon: position.coords.longitude,
    };
    console.log(coords);
    getWeather(coords);
  };

  interface ICoords {
    lat: number;
    lon: number;
  }

  const getWeather = (coords: ICoords) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${process.env.REACT_APP_WEATHER_KEY}&units=metric`;

    /* axios.get(url).then((res) => {
      setCurrentCity(res.data.name);
      setCurrentWeather(res.data.weather[0].main);
      setCurrentTemp(res.data.main.temp);
    }); */
  };

  const showErrorMessage = () => {
    console.log("I can't get your position.\nPlease reload this page.");
  };

  catchPosition();

  console.log(currentDate, currentDay, currentTime);
  console.log(currentCity, currentWeather, currentTemp);

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
