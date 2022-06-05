import dayjs from 'dayjs';

import styles from './today.module.scss';

const Today = () => {
  const currentTime = dayjs().format('hh : mm');
  const currentDate = dayjs().format('MMM DD');
  const currentDay = dayjs().format('ddd');

  return (
    <div className={styles.today}>
      <p className={styles.date}>{`${currentDate} / ${currentDay}`}</p>
      <p className={styles.time}>{`${currentTime}`}</p>
    </div>
  );
};

export default Today;
