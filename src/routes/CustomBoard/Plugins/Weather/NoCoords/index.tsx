import Button from 'components/Button';

import styles from './noCoords.module.scss';

interface IProps {
  getCoords: () => void;
}

const NoCoords = ({ getCoords }: IProps) => {
  return (
    <div className={styles.wrapper}>
      <p className={styles.message}>위치를 확인할 수 없습니다.</p>
      <Button size='auto' onClick={getCoords}>
        재확인
      </Button>
    </div>
  );
};

export default NoCoords;
