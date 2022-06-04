import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ColorIcon, SettingIcon } from 'assets/svgs';
import store from 'store';

import styles from './setting.module.scss';
import ColorPickModal from 'components/Modal/ColorPickModal';
import ModalPortal from 'components/Modal/Potal';
import { useRecoilState, useRecoilValue } from 'recoil';
import { isEditModeAtom, layoutAtom } from 'states/plugin';
import { cx } from 'styles';
import WarningModal from 'components/Modal/WarningModal';

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

  return (
    <div className={styles.setting}>
      <button type='button' onClick={toggleColorModal}>
        <ColorIcon />
      </button>
      <button type='button' onClick={toggleEditModeHandler}>
        <SettingIcon className={cx({ [styles.active]: isEditMode })} />
      </button>
      <ModalPortal>
        {isColorPickerModalOpened && <ColorPickModal />}
        {isWarningModalOpened && (
          <WarningModal message='외부로 벗어난 플러그인이 있습니다. 다시 확인해주세요' closeEvent={closeWarning} />
        )}
      </ModalPortal>
    </div>
  );
};

export default Setting;
