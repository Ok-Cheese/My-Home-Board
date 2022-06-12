import { useCallback, useMemo, useState } from 'react';
import { Layout } from 'react-grid-layout';
import { useMount } from 'react-use';
import { useQuery } from 'react-query';
import store from 'store';

import { ICoords } from './weather';
import { ReloadIcon } from 'assets/svgs';
import { getWeahterData } from './utils';

import NoCoords from './NoCoords';
import WeatherContent from './WeatherContent';
import Loading from 'components/Loading';

import styles from './weather.module.scss';

interface IProps {
  layout: Layout;
}

const Weather = ({ layout }: IProps) => {
  const [coordiantes, setCoordinates] = useState<ICoords | null>(null);
  const [, setIsNoWeatherData] = useState(false);

  useMount(() => {
    const savedCoords = store.get('coords');

    if (savedCoords) {
      setCoordinates(savedCoords);
      return;
    }

    getCoordinates();
  });

  const getCoordinates = useCallback(() => {
    navigator.geolocation.getCurrentPosition(getWeather);
  }, []);

  const getWeather = (position: GeolocationPosition) => {
    const coords = {
      lat: position.coords.latitude,
      lon: position.coords.longitude,
    };

    store.set('coords', coords);
    setCoordinates(coords);
  };

  const reloadHandler = () => {
    store.remove('coordinates');
    getCoordinates();
  };

  const { data, isLoading, isError } = useQuery(
    ['getWeather', coordiantes],
    () => {
      if (!coordiantes) {
        setIsNoWeatherData(true);
        return null;
      }

      return getWeahterData(coordiantes);
    },
    {
      staleTime: 5 * 100 * 60,
      cacheTime: 5 * 100 * 60,
    }
  );

  const loadingSize = `${Math.min(layout.w, layout.h) * 30}px`;

  const contents = useMemo(() => {
    if (data) return <WeatherContent data={data.data} layout={layout} />;

    if (isLoading) return <Loading size={loadingSize} />;

    return <NoCoords getCoordinates={getCoordinates} isError={isError} />;
  }, [layout, data, isLoading, loadingSize, isError, getCoordinates]);

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
