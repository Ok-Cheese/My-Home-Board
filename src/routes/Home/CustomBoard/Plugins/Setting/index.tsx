import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ColorIcon, GitHubIcon, SettingIcon } from 'assets/svgs';
import store from 'store';
import { cx } from 'styles';

import { isEditModeAtom, layoutAtom } from 'states/plugin';

import ColorPickModal from 'components/Modal/ColorPicker';
import ModalPortal from 'components/Modal/Potal';
import WarningModal from 'components/Modal/WarningModal';

import styles from './setting.module.scss';

const GITHUB_URL = 'https://github.com/Ok-Cheese/My-Home-Board';

const Setting = () => {
  const [isColorPickerModalOpened, setIsColorPickerModalOpened] = useState(false);
  const [isWarningModalOpened, setIsWarningModalOpened] = useState(false);
  const [isEditMode, setIsEditMode] = useRecoilState(isEditModeAtom);
  const layoutState = useRecoilValue(layoutAtom);

  const toggleColorModal = () => {
    setIsColorPickerModalOpened(true);
  };

  const toggleEditModeHandler = () => {
    if (isEditMode) {
      const overflowedItems = layoutState.filter((layout) => layout.h + layout.y > 10);

      if (overflowedItems.length) {
        setIsWarningModalOpened(true);
        return;
      }
    }

    setIsEditMode((prev) => !prev);
    store.set('layout', layoutState);
  };

  const closeWarning = () => {
    setIsWarningModalOpened(false);
  };

  const moveToGithub = () => {
    window.open(GITHUB_URL, '_blank');
  };

  const closeColorModal = () => {
    setIsColorPickerModalOpened(false);
  };

  return (
    <div className={styles.setting}>
      <button type='button' onClick={toggleColorModal}>
        <ColorIcon />
      </button>
      <button type='button' onClick={toggleEditModeHandler}>
        <SettingIcon className={cx({ [styles.active]: isEditMode })} />
      </button>

      <button type='button' onClick={moveToGithub}>
        <GitHubIcon />
      </button>
      <ModalPortal>
        {isColorPickerModalOpened && <ColorPickModal closeModal={closeColorModal} />}
        {isWarningModalOpened && (
          <WarningModal message='외부로 벗어난 플러그인이 있습니다. 다시 확인해주세요' closeEvent={closeWarning} />
        )}
      </ModalPortal>
    </div>
  );
};

export default Setting;
