import { useState, MouseEvent } from 'react';
import { cx } from 'styles';
import ColorPicker from './ColorPicker';

import styles from './colorPickerModal.module.scss';

const ColorPickModal = () => {
  const [editTarget, setEditTarget] = useState('background');

  const changeTargetToBackground = (e: MouseEvent<HTMLButtonElement>) => {
    setEditTarget('background');
  };

  const changeTargetToBlock = (e: MouseEvent<HTMLButtonElement>) => {
    setEditTarget('block');
  };

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <div className={styles.sidebar}>
          <button
            type='button'
            className={cx({ [styles.targetActive]: editTarget === 'background' })}
            onClick={changeTargetToBackground}
          >
            배경
          </button>
          <button
            type='button'
            className={cx({ [styles.targetActive]: editTarget === 'block' })}
            onClick={changeTargetToBlock}
          >
            블록
          </button>
        </div>
        <div className={styles.colorPicker}>
          <ColorPicker editTarget={editTarget} />
        </div>
      </div>
    </div>
  );
};

export default ColorPickModal;
