import { FormEventHandler, MouseEventHandler, ReactNode, useEffect, useState } from 'react';

import styles from './icon.module.scss';

interface IButtonStyle {
  width: string;
  height: string;
  position: 'static' | 'relative' | 'absolute';
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  transform?: string;
}

interface IPosition {
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
}

interface IProps {
  children: ReactNode;
  onClick?: MouseEventHandler | FormEventHandler;
  type?: 'button' | 'submit';
  size?: 'horizontal' | 'vertical' | string;
  position?: IPosition;
}

const IconButton = ({ children, onClick, type, size, position }: IProps) => {
  const [buttonStyle, setButtonStyle] = useState<IButtonStyle>({
    width: '20px',
    height: '20px',
    position: 'static',
  });

  useEffect(() => {
    if (size === undefined) return;

    if (size === 'horizontal') {
      setButtonStyle((prev) => {
        return { ...prev, width: '100%' };
      });
      return;
    }

    if (size === 'vertical') {
      setButtonStyle((prev) => {
        return { ...prev, height: '100%' };
      });
      return;
    }

    setButtonStyle((prev) => {
      return { ...prev, width: size, height: size };
    });
  }, [size]);

  useEffect(() => {
    if (position === undefined) return;

    setButtonStyle((prev) => {
      return {
        ...prev,
        position: 'absolute',
        top: position.top || '',
        right: position.right || '',
        bottom: position.bottom || '',
        left: position.left || '',
        transform: 'translate(-50%, -50%)',
      };
    });
  }, [position]);

  return (
    <button
      className={styles.button}
      type={type === 'button' ? 'button' : 'submit'}
      style={buttonStyle}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default IconButton;
