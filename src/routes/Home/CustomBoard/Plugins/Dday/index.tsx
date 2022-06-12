import { EditIcon } from 'assets/svgs';
import ModalPortal from 'components/Modal/Potal';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import styles from './dday.module.scss';
import DdayModal from './DdayModal';
import { IRemain } from './DdayModal/type';
import store from 'store';

const savedDday = store.get('dday');

const Dday = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [dday, setDday] = useState(savedDday || null);
  const [remainTime, setRemainTime] = useState<IRemain>({ date: 0, hour: 0, minute: 0, second: 0, sign: '-' });

  useEffect(() => {
    store.set('dday', dday);

    const interval = setInterval(() => {
      if (!dday) return;

      const sign = Number(dayjs(dday.deadline).format()) - Number(dayjs().format) > 0 ? '+' : '-';

      setRemainTime({
        date: dayjs(dday.deadline).diff(dayjs(), 'day'),
        hour: dayjs(dday.deadline).diff(dayjs(), 'hour'),
        minute: Number(dayjs(dday.deadline).diff(dayjs(), 'minute')) % 60,
        second: Number(dayjs(dday.deadline).diff(dayjs(), 'second')) % 60,
        sign,
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [dday]);

  const openModal = () => {
    setIsModalOpened(true);
  };

  const closeModal = () => {
    setIsModalOpened(false);
  };

  const content = dday ? (
    <div className={styles.content}>
      <p className='title'>{`${dday.title}`}</p>
      <p>{`D ${remainTime.sign} ${remainTime.date}`}</p>
      <p>{`${remainTime.sign} ${remainTime.hour}:${remainTime.minute}:${remainTime.second}`}</p>
    </div>
  ) : (
    <p>일정을 등록해주세요.</p>
  );

  return (
    <div className={styles.dday}>
      <div className={styles.content}>{content}</div>
      <button type='button' className={styles.openModalButton} onClick={openModal}>
        <EditIcon />
      </button>
      <ModalPortal>{isModalOpened && <DdayModal dday={dday} setDday={setDday} closeModal={closeModal} />}</ModalPortal>
    </div>
  );
};

export default Dday;
