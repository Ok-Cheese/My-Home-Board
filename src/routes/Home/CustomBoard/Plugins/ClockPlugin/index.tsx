import { useState, useEffect } from 'react';
import Clock from 'react-clock';

import styles from './clock.module.scss';
import 'react-clock/dist/Clock.css';

const ClockPlugin = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.clockWrapper}>
      <Clock className={styles.clock} value={currentTime} />
    </div>
  );
};

export default ClockPlugin;
