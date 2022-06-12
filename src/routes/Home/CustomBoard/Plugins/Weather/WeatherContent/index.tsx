import { Layout } from 'react-grid-layout';
import { getWeatherIcon } from '../utils';
import { IWeather } from '../weather';
import styles from './weatherContent.module.scss';

interface IProps {
  data: IWeather;
  layout: Layout;
}

const WeatherContent = ({ data, layout }: IProps) => {
  const temperature = Math.round(data.main.temp * 10) / 10;
  const WeatherIcon = getWeatherIcon(data.weather[0].icon);

  const pulginStyles = {
    city: { fontSize: `${Math.min(layout.w, layout.h) * 8}px` },
    temperature: { fontSize: `${Math.min(layout.w, layout.h) * 12}px` },
  };

  return (
    <div className={styles.content}>
      <WeatherIcon />
      <div className={styles.inform}>
        <p style={pulginStyles.city} className={styles.city}>
          {data.name}
        </p>
        <p style={pulginStyles.temperature} className={styles.temperature}>
          {temperature}°C
        </p>
      </div>
    </div>
  );
};

export default WeatherContent;
