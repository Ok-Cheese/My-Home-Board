import { Layout } from 'react-grid-layout';

import { IWeather } from '../weather';
import { getWeatherIcon } from '../utils';

import styles from './weatherContent.module.scss';

interface IProps {
  data: IWeather;
  layout: Layout;
}

const WeatherContent = ({ data, layout }: IProps) => {
  const temperature = Math.round(data.main.temp * 10) / 10;
  const WeatherIcon = getWeatherIcon(data.weather[0].icon);

  const weatherStyles = {
    city: { fontSize: `${Math.min(layout.w, layout.h) * 10}px` },
    temperature: { fontSize: `${Math.min(layout.w, layout.h) * 16}px` },
  };

  return (
    <div className={styles.wrapper}>
      <WeatherIcon className={styles.icon} />
      <div className={styles.content}>
        <p style={weatherStyles.city} className={styles.item}>
          {data.name}
        </p>
        <p style={weatherStyles.temperature} className={styles.item}>
          {temperature}°C
        </p>
      </div>
    </div>
  );
};

export default WeatherContent;
