import { ReactNode } from 'react';

import { ISize } from 'types/type';

import styles from './modal.module.scss';

interface IProps {
  children: ReactNode;
  size?: ISize;
}

const Modal = ({ children, size }: IProps) => {
  return (
    <div className={styles.backdrop}>
      <div className={styles.modal} style={size}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
