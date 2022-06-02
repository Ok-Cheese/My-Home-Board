import axios from 'axios';
import dayjs from 'dayjs';
import { useState } from 'react';
import styles from './today.module.scss';

const Today = () => {
  const [currentCity, setCurrentCity] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [currentTemp, setCurrentTemp] = useState(null);

  const currentTime = dayjs().format('mm시 ss분');
  const currentDate = dayjs().format('MM월 DD일');
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

  return <div>today</div>;
};

export default Today;
