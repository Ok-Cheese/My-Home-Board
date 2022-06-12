import { FormEventHandler, MouseEventHandler, ReactNode } from 'react';
import { cx } from 'styles';

import styles from './button.module.scss';

interface ISize {
  width?: string;
  height?: string;
}

interface IProps {
  type?: 'button' | 'submit';
  isIcon?: boolean;
  size?: ISize;
  disabled?: boolean;
  children: ReactNode;
  onClick?: MouseEventHandler | FormEventHandler;
}

const Button = ({ type, isIcon, disabled, size, children, onClick }: IProps) => {
  return (
    <button
      type={type === 'submit' ? 'submit' : 'button'}
      className={cx({ [styles.button]: !isIcon }, { [styles.icon]: isIcon })}
      style={size}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
