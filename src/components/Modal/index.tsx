import { ReactNode, useRef } from 'react';
import { useClickAway } from 'react-use';

import styles from './modal.module.scss';

interface IProps {
  children: ReactNode;
  closeModal: () => void;
}

const Modal = ({ children, closeModal }: IProps) => {
  const modalRef = useRef(null);

  useClickAway(modalRef, () => {
    closeModal();
  });

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal} ref={modalRef}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
