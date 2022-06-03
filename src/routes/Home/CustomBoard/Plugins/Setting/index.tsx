import { useState } from 'react';
import { ColorIcon, SettingIcon } from 'assets/svgs';

import styles from './setting.module.scss';
import ColorPickModal from 'components/Modal/ColorPickModal';
import ModalPortal from 'components/Modal/Potal';

const Setting = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);

  const toggleColorModal = () => {
    setIsModalOpened(true);
    console.log('hello');
  };

  return (
    <div className={styles.setting}>
      <button type='button' onClick={toggleColorModal}>
        <ColorIcon />
      </button>
      <button type='button'>
        <SettingIcon />
      </button>
      <ModalPortal>{isModalOpened && <ColorPickModal />}</ModalPortal>
    </div>
  );
};

export default Setting;
