import { WarningIcon } from 'assets/svgs';

import Modal from '..';
import Icon from 'components/Icon';
import Button from 'components/Button';

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
        <Icon size='50px'>
          <WarningIcon />
        </Icon>
        <p className={styles.message}>{message}</p>
        <Button size='fill' onClick={confirmHandler}>
          확인
        </Button>
      </div>
    </Modal>
  );
};

export default WarningModal;
