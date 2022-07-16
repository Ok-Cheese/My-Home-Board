import { useMemo } from 'react';
import { useQuery } from 'react-query';

import BoxOfficeItem from './boxOfficeItem';

import { getBoxOffice } from './utils';

import styles from './boxOffice.module.scss';

const targetRange = 'daily';

const BoxOffice = () => {
  const getApiData = () => {
    return getBoxOffice(targetRange);
  };

  const { data } = useQuery(['#boxOffice', targetRange], getApiData);

  const boxOfficeContent = useMemo(() => {
    if (!data) return [];

    return data.map((el) => <BoxOfficeItem key={el.rank} item={el} />);
  }, [data]);

  return (
    <div className={styles.container}>
      <div className={styles.top}>박스 오피스</div>
      <ul className={styles.boxOffice}>{boxOfficeContent}</ul>
    </div>
  );
};

export default BoxOffice;
