import axios from 'axios';

import { weatherIconList } from './iconList';
import { UnknownWeatherIcon } from 'assets/svgs/weather';

import { ICoords } from './weather';

interface IPosition {
  coords: GeolocationCoordinates;
  timestamp: number;
}

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
  weatherIcon = weatherIconList[id];

  if (!weatherIcon) weatherIcon = UnknownWeatherIcon;

  return weatherIcon;
};

export const getCoords = async () => {
  const getPosition = (): Promise<IPosition> =>
    new Promise((resolve, reject) => {
      navigator.geolocation.watchPosition(resolve, reject);
    });

  const position = await getPosition();
  const coords = { lat: position.coords.latitude, lon: position.coords.longitude };

  return coords;
};
