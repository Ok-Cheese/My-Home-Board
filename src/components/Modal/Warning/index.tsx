import Button from 'components/Button';
import Modal from '..';

import styles from './warning.module.scss';

interface IProps {
  message: string;
  closeModal: () => void;
}

const WarningModal = ({ message, closeModal }: IProps) => {
  const confirmHandler = () => {
    closeModal();
  };

  return (
    <Modal closeModal={closeModal}>
      <div className={styles.warning}>
        <p className={styles.message}>{message}</p>
        <Button onClick={confirmHandler}>확인</Button>
      </div>
    </Modal>
  );
};

export default WarningModal;
