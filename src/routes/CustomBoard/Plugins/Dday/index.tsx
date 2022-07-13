import { useEffect, useState } from 'react';
import { Layout } from 'react-grid-layout';
import store from 'store';

import { EditIcon } from 'assets/svgs';
import { IRemain } from './type';

import DdayModal from './DdayModal';
import ModalPortal from 'components/Modal/Potal';

import styles from './dday.module.scss';
import { calculateRemainTime } from './utlis';

interface IProps {
  layout: Layout;
}

const savedDday = store.get('dday');
const initialRemainTime: IRemain = { date: '0', hour: '0', minute: '0', second: '0', sign: '-' };

const Dday = ({ layout }: IProps) => {
  const [dday, setDday] = useState(savedDday || null);
  const [remainTime, setRemainTime] = useState<IRemain>(initialRemainTime);
  const [isModalOpened, setIsModalOpened] = useState(false);

  useEffect(() => {
    if (dday) {
      const interval = setInterval(() => {
        setRemainTime(calculateRemainTime(dday.deadline));
      }, 1000);

      store.set('dday', dday);
      setRemainTime(calculateRemainTime(dday.deadline));

      return () => clearInterval(interval);
    }

    return undefined;
  }, [dday]);

  const openModal = () => {
    setIsModalOpened(true);
  };

  const closeModal = () => {
    setIsModalOpened(false);
  };

  const ddayStyles = {
    title: { fontSize: `${Math.min(layout.w, layout.h) * 10}px` },
    date: { fontSize: `${Math.min(layout.w, layout.h) * 20}px` },
    time: { fontSize: `${Math.min(layout.w, layout.h) * 10}px` },
  };

  const content = dday ? (
    <div className={styles.content}>
      <p className={styles.title} style={ddayStyles.title}>{`${dday.title}`}</p>
      <p className={styles.date} style={ddayStyles.date}>{`D${remainTime.sign}${remainTime.date}`}</p>
      <p
        className={styles.time}
        style={ddayStyles.time}
      >{`${remainTime.sign} ${remainTime.hour}:${remainTime.minute}:${remainTime.second}`}</p>
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
