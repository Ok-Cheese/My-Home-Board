import { FormEventHandler, MouseEventHandler, ReactNode } from 'react';
import styles from './button.module.scss';

interface ISize {
  width: string;
  height: string;
}

interface IProps {
  type?: 'button' | 'submit';
  size?: ISize;
  children: ReactNode;
  onClick: MouseEventHandler | FormEventHandler;
}

const Button = ({ type, size, children, onClick }: IProps) => {
  return (
    <button type={type === 'submit' ? 'submit' : 'button'} className={styles.button} style={size} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
