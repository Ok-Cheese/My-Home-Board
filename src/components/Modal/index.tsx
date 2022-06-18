import { ReactNode, useRef } from 'react';
import { useClickAway } from 'react-use';

import { ISize } from 'types/type';

import styles from './modal.module.scss';

interface IProps {
  children: ReactNode;
  size?: ISize;
  closeModal: () => void;
}

const Modal = ({ children, size, closeModal }: IProps) => {
  const modalRef = useRef(null);

  useClickAway(modalRef, () => {
    closeModal();
  });

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal} ref={modalRef} style={size}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
