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
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <p className={styles.message}>{message}</p>
        <button type='button' onClick={confirmHandler}>
          확인
        </button>
      </div>
    </div>
  );
};

export default WarningModal;
