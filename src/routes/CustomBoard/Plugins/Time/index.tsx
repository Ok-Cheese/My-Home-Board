import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Layout } from 'react-grid-layout';
import dayjs from 'dayjs';

import { settingAtom } from 'states/settings';

import styles from './time.module.scss';

interface IProps {
  layout: Layout;
}

const Time = ({ layout }: IProps) => {
  const [now, setNow] = useState(dayjs());
  const setting = useRecoilValue(settingAtom);

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(dayjs());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const currentTime = {
    date: now.format(setting.dateType),
    time: now.format(setting.timeType),
  };

  const pulginStyles = {
    date: { fontSize: `${Math.min(layout.w, layout.h) * 12}px` },
    time: { fontSize: `${Math.min(layout.w, layout.h) * 24}px` },
  };

  return (
    <div className={styles.wrapper}>
      <p style={pulginStyles.date}>{`${currentTime.date}`}</p>
      <p style={pulginStyles.time}>{`${currentTime.time}`}</p>
    </div>
  );
};

export default Time;
