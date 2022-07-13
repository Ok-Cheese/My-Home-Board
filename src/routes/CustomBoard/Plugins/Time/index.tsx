import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Layout } from 'react-grid-layout';
import dayjs from 'dayjs';

import { settingAtom } from 'states/settings';

import styles from './time.module.scss';
import 'dayjs/locale/ko';
import 'dayjs/locale/en';

interface IProps {
  layout: Layout;
}

const Time = ({ layout }: IProps) => {
  const setting = useRecoilValue(settingAtom);
  const [now, setNow] = useState(dayjs());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(dayjs());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    dayjs.locale(setting.timeLocale);
  }, [setting.timeLocale]);

  const currentTime = {
    date: now.format(setting.dateType),
    time: now.format(setting.timeType),
  };

  const pulginStyles = {
    date: { fontSize: `${Math.min(layout.w, layout.h) * 10}px` },
    time: { fontSize: `${Math.min(layout.w, layout.h) * 20}px` },
  };

  return (
    <div className={styles.today}>
      <p className={styles.date} style={pulginStyles.date}>{`${currentTime.date}`}</p>
      <p className={styles.time} style={pulginStyles.time}>{`${currentTime.time}`}</p>
    </div>
  );
};

export default Time;
