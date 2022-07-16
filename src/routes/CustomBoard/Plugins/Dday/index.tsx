import { useEffect, useState } from 'react';
import { Layout } from 'react-grid-layout';
import store from 'store';

import { calculateRemainTime } from './utlis';
import { SettingIcon } from 'assets/svgs';
import { IRemainTime } from './type';

import DdayItem from './DdayItem';
import DdayModal from './DdayModal';
import ModalPortal from 'components/Modal/Potal';
import Icon from 'components/Icon';

import styles from './dday.module.scss';

interface IProps {
  layout: Layout;
}

const savedDday = store.get('dday');
const initialRemainTime: IRemainTime = { date: '0', hour: '0', minute: '0', second: '0', sign: '-' };

const Dday = ({ layout }: IProps) => {
  const [dday, setDday] = useState(savedDday || null);
  const [remainTime, setRemainTime] = useState<IRemainTime>(initialRemainTime);
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
    date: { fontSize: `${Math.min(layout.w, layout.h) * 16}px` },
    time: { fontSize: `${Math.min(layout.w, layout.h) * 12}px` },
  };

  const content = dday ? (
    <DdayItem dday={dday} remainTime={remainTime} style={ddayStyles} />
  ) : (
    <p className={styles.noContent}>일정을 등록해주세요.</p>
  );

  return (
    <div className={styles.wrapper}>
      {content}
      <Icon position={{ top: '15px', right: '-5px' }} onClick={openModal}>
        <SettingIcon />
      </Icon>
      <ModalPortal>{isModalOpened && <DdayModal dday={dday} setDday={setDday} closeModal={closeModal} />}</ModalPortal>
    </div>
  );
};

export default Dday;
