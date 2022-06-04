import { ReactNode, MouseEventHandler, FormEventHandler } from 'react';
import cx from 'classnames';

import styles from './button.module.scss';

interface Props {
  children: ReactNode;
  size: 'extraLarge' | 'large' | 'normal' | 'small' | 'xsmall';
  onClick?: MouseEventHandler | FormEventHandler;
  primary?: boolean;
  secondary?: boolean;
  type?: 'submit' | 'button';
  isActive?: boolean;
}

const Button = ({ children, size, primary, secondary, onClick, type, isActive }: Props) => {
  return (
    <button
      type={type === 'submit' ? 'submit' : 'button'}
      className={cx(
        styles.button,
        styles[size],
        { [styles.primary]: primary },
        { [styles.secondary]: secondary },
        { [styles.isActive]: isActive }
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
