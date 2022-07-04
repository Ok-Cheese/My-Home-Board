import { useMemo, useState } from 'react';
import { useQuery } from 'react-query';

import BoxOfficeItem from './boxOfficeItem';

import { getBoxOffice } from './utils';

import styles from './boxOffice.module.scss';

const BoxOffice = () => {
  const [targetRange, setTargetRange] = useState('daily');

  const getApiData = () => {
    return getBoxOffice(targetRange);
  };

  const { data } = useQuery(['#boxOffice', targetRange], getApiData);

  const toggleTargetRange = () => {
    setTargetRange((prev) => (prev === 'daily' ? 'weekly' : 'daily'));
  };

  const boxOfficeContent = useMemo(() => {
    if (!data) return [];

    return data.map((el) => <BoxOfficeItem key={el.rank} item={el} />);
  }, [data]);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        박스 오피스
        <button type='button'>targetRange</button>
      </div>
      <ul className={styles.boxOffice}>{boxOfficeContent}</ul>
    </div>
  );
};

export default BoxOffice;
