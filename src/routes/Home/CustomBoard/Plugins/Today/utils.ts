import axios from 'axios';

const url = `https://api.openweathermap.org/data/2.5/weather`;

interface ICoords {
  lat: number;
  lon: number;
}

export const getLocaleInform = (coords: ICoords) => {
  return axios.get(url, {
    params: { lat: coords.lat, lon: coords.lon, appid: process.env.REACT_APP_WEATHER_KEY, units: 'metric' },
  });
};

// ?lat=${coordinate.lat}&lon=${coordinate.lon}&appid=${process.env.REACT_APP_WEATHER_KEY}&units=metric
