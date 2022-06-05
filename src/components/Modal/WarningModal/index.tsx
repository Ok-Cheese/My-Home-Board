import Button from 'components/Button';
import Modal from '..';

import styles from './warningModal.module.scss';

interface IProps {
  message: string;
  closeEvent: () => void;
}

const WarningModal = ({ message, closeEvent }: IProps) => {
  const confirmHandler = () => {
    closeEvent();
  };

  return (
    <Modal>
      <div className={styles.warning}>
        <p className={styles.message}>{message}</p>
        <Button size='normal' onClick={confirmHandler}>
          확인
        </Button>
      </div>
    </Modal>
  );
};

export default WarningModal;
