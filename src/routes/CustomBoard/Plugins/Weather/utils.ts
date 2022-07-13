import axios from 'axios';

import { ICoords } from './weather';
import {
  Weather01dIcon,
  Weather01nIcon,
  Weather02dIcon,
  Weather02nIcon,
  Weather03dIcon,
  Weather03nIcon,
  Weather04dIcon,
  Weather04nIcon,
  Weather09dIcon,
  Weather09nIcon,
  Weather10dIcon,
  Weather10nIcon,
  Weather11dIcon,
  Weather11nIcon,
  Weather13dIcon,
  Weather13nIcon,
  Weather50dIcon,
  Weather50nIcon,
  UnknownWeatherIcon,
} from 'assets/svgs/weather';

export const getWeahterData = (coords: ICoords) => {
  const url = 'https://api.openweathermap.org/data/2.5/weather';

  return axios.get(url, {
    params: {
      lat: coords.lat,
      lon: coords.lon,
      appid: process.env.REACT_APP_WEATHER_KEY,
      units: 'metric',
    },
  });
};

export const getWeatherIcon = (id: string) => {
  let weatherIcon;

  weatherIcon = {
    '01d': Weather01dIcon,
    '01n': Weather01nIcon,
    '02d': Weather02dIcon,
    '02n': Weather02nIcon,
    '03d': Weather03dIcon,
    '03n': Weather03nIcon,
    '04d': Weather04dIcon,
    '04n': Weather04nIcon,
    '09d': Weather09dIcon,
    '09n': Weather09nIcon,
    '10d': Weather10dIcon,
    '10n': Weather10nIcon,
    '11d': Weather11dIcon,
    '11n': Weather11nIcon,
    '13d': Weather13dIcon,
    '13n': Weather13nIcon,
    '50d': Weather50dIcon,
    '50n': Weather50nIcon,
  }[id];

  if (!weatherIcon) weatherIcon = UnknownWeatherIcon;

  return weatherIcon;
};
