import { useMemo, useState } from 'react';
import { Layout } from 'react-grid-layout';
import { useMount } from 'react-use';
import { useQuery } from 'react-query';
import store from 'store';

import { ICoords } from './weather';
import { ReloadIcon } from 'assets/svgs';
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

  const updateCoords = async () => {
    const currentCoords = await getCoords();
    setCoords(currentCoords);
  };

  const reloadHandler = () => {
    store.remove('coordinates');
    updateCoords();
  };

  useMount(async () => {
    const savedCoords = store.get('coords');
    if (savedCoords) {
      setCoords(savedCoords);
    }

    updateCoords();
  });

  const { data, isLoading, isError } = useQuery(['getWeather', coords], () => {
    if (!coords) {
      setIsNoWeatherData(true);
      return null;
    }

    return getWeahterData(coords);
  });

  const loadingSize = `${Math.min(layout.w, layout.h) * 30}px`;

  const contents = useMemo(() => {
    if (data) return <WeatherContent data={data.data} layout={layout} />;

    if (isLoading) return <Loading size={loadingSize} />;

    return <NoCoords getCoords={getCoords} isError={isError} />;
  }, [layout, data, isLoading, loadingSize, isError]);

  return (
    <div className={styles.weather}>
      {contents}
      <button className={styles.reload} type='button' onClick={reloadHandler}>
        <ReloadIcon />
      </button>
    </div>
  );
};

export default Weather;
