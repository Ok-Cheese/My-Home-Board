import { FormEventHandler, MouseEventHandler, ReactNode, useMemo } from 'react';

import styles from './button.module.scss';

interface IProps {
  type?: 'button' | 'submit';
  size?: 'auto' | 'fill' | string;
  disabled?: boolean;
  children: ReactNode;
  onClick?: MouseEventHandler | FormEventHandler;
}

const Button = ({ type, disabled, size, children, onClick }: IProps) => {
  const buttonStyle = useMemo(() => {
    return { width: size === 'fill' ? '100%' : size };
  }, [size]);

  return (
    <button
      type={type === 'submit' ? 'submit' : 'button'}
      className={styles.button}
      style={buttonStyle}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
