import { useMemo, useState } from 'react';
import { Layout } from 'react-grid-layout';
import { useMount } from 'react-use';
import { useQuery } from 'react-query';
import store from 'store';

import { ICoords } from './weather';
import { getCoords, getWeahterData } from './utils';

import NoCoords from './NoCoords';
import WeatherContent from './WeatherContent';
import Loading from 'components/Loading';

import styles from './weather.module.scss';

interface IProps {
  layout: Layout;
}

const Weather = ({ layout }: IProps) => {
  const [coords, setCoords] = useState<ICoords | null>(null);
  const [, setIsNoWeatherData] = useState(false);

  useMount(async () => {
    const savedCoords = store.get('coords');
    if (savedCoords) {
      setCoords(savedCoords);
    }

    const currentCoords = await getCoords();
    setCoords(currentCoords);
  });

  const { data, isLoading } = useQuery(['getWeather', coords], () => {
    if (!coords) {
      setIsNoWeatherData(true);
      return null;
    }

    return getWeahterData(coords);
  });

  const contents = useMemo(() => {
    if (data) return <WeatherContent data={data.data} layout={layout} />;
    if (isLoading) return <Loading size='30px' />;

    return <NoCoords getCoords={getCoords} />;
  }, [layout, data, isLoading]);

  return <div className={styles.weather}>{contents}</div>;
};

export default Weather;
