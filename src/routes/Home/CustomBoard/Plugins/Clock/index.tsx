import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { Layout } from 'react-grid-layout';
import dayjs from 'dayjs';

import { settingAtom } from 'states/settings';

import styles from './clock.module.scss';
import 'dayjs/locale/ko';
import 'dayjs/locale/en';

interface IProps {
  layout: Layout;
}

const Clock = ({ layout }: IProps) => {
  const setting = useRecoilValue(settingAtom);

  useEffect(() => {
    dayjs.locale(setting.clockLocale);
  }, [setting.clockLocale]);

  const currentTime = {
    date: dayjs().format(setting.dateType),
    time: dayjs().format(setting.timeType),
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

export default Clock;
