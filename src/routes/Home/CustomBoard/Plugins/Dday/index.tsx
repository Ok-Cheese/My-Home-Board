import Button from 'components/Button';
import AddSchedule from 'components/Modal/AddSchedule';
import ModalPortal from 'components/Modal/Potal';
import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import styles from './dday.module.scss';
import store from 'store';

export interface ISchedule {
  title: string;
  deadline: Date;
}

const Dday = () => {
  const [dday, setDday] = useState<ISchedule | null>(null);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [now, setNow] = useState(dayjs());

  const buttonContent = dday ? '수정' : '등록';

  const modalOpen = () => {
    setIsModalOpened(true);
  };

  const modalClose = () => {
    setIsModalOpened(false);
  };

  useEffect(() => {
    const savedSchedule = store.get('schedule');

    if (!savedSchedule) return;

    setDday(savedSchedule);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(dayjs());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const contents = useMemo(() => {
    if (!dday)
      return (
        <div className={styles.dday}>
          <p>일정을 등록해주세요.</p>
        </div>
      );

    const expired = dayjs(dday.deadline);
    const sign = Number(now.format('YYMMDDhhmmss')) - Number(expired.format('YYMMDDhhmmss')) > 0 ? '+' : '-';

    const remainTime = {
      hour: Math.abs(expired.diff(now, 'hour')).toString().padStart(2, '0'),
      min: Math.abs(expired.diff(now, 'minute') % 60)
        .toString()
        .padStart(2, '0'),
      sec: Math.abs(expired.diff(now, 'second') % 60)
        .toString()
        .padStart(2, '0'),
    };

    return (
      <div className={styles.remain}>
        <p className={styles.title}>{dday.title}</p>
        <p className={styles.remainDate}>{`D ${sign} ${Math.abs(expired.diff(now, 'day'))}`}</p>
        <p className={styles.remainTime}>{`${sign} ${remainTime.hour}:${remainTime.min}:${remainTime.sec}`}</p>
      </div>
    );
  }, [dday, now]);

  return (
    <div className={styles.dday}>
      {contents}
      <Button size='normal' onClick={modalOpen}>
        {buttonContent}
      </Button>
      <ModalPortal>{isModalOpened && <AddSchedule setSchedule={setDday} closeModal={modalClose} />}</ModalPortal>
    </div>
  );
};

export default Dday;
