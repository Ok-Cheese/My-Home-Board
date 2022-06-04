import Button from 'components/Button';
import AddSchedule from 'components/Modal/AddSchedule';
import ModalPortal from 'components/Modal/Potal';
import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { todolistState } from 'states/todolist';
import styles from './dday.module.scss';

interface IRemainTime {
  date: string;
  hour: string;
  min: string;
  sec: string;
  sign: '+' | '-';
}

export interface ISchedule {
  title: string;
  deadline: Date;
}

const Dday = () => {
  const [dday, setDday] = useState<ISchedule | null>(null);
  const [isModalOpened, setIsModalOpened] = useState(false);

  const buttonContent = dday ? '수정' : '등록';

  const modalOpen = () => {
    setIsModalOpened(true);
  };

  const modalClose = () => {
    setIsModalOpened(false);
  };

  const contents = useMemo(() => {
    if (!dday)
      return (
        <div className={styles.dday}>
          <p>일정을 등록해주세요.</p>
        </div>
      );

    const today = dayjs();
    const expired = dayjs(dday.deadline);
    const sign = Number(today.format('YYMMDDhhmmss')) - Number(expired.format('YYMMDDhhmmss')) > 0 ? '+' : '-';

    const remainTime = {
      hour: expired.diff(today, 'hour').toString().padStart(2, '0'),
      min: (expired.diff(today, 'minute') % 60).toString().padStart(2, '0'),
      sec: (expired.diff(today, 'second') % 60).toString().padStart(2, '0'),
    };

    return (
      <div className={styles.remain}>
        <p>{dday.title}</p>
        <p>{`D${sign}${expired.diff(today, 'day')}`}</p>
        <p>{`${sign}${remainTime.hour}:${remainTime.min}:${remainTime.sec}`}</p>
      </div>
    );
  }, [dday]);

  return (
    <div className={styles.dday}>
      {contents}
      <Button size='normal' onClick={modalOpen}>
        {buttonContent}
      </Button>
      <ModalPortal>
        {isModalOpened && <AddSchedule schedule={dday || undefined} setSchedule={setDday} closeModal={modalClose} />}
      </ModalPortal>
    </div>
  );
};

export default Dday;
