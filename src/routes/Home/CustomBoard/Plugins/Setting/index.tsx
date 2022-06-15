import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import store from 'store';
import { cx } from 'styles';

import { isEditModeAtom, layoutAtom } from 'states/plugin';
import { HelpIcon, LayoutIcon, SettingIcon } from 'assets/svgs';

import ModalPortal from 'components/Modal/Potal';
import WarningModal from 'components/Modal/Warning';
import Preference from 'routes/Home/CustomBoard/Plugins/Setting/Preference';

import styles from './setting.module.scss';

const ManualURL = 'https://metal-lantern-ee6.notion.site/My-Home-Board-Manual-625814f7ce2f4dd7810cad7c2c1239fb';

const Setting = () => {
  const [isSettingOpened, setIsSettingOpened] = useState(false);
  const [isWarningModalOpened, setIsWarningModalOpened] = useState(false);
  const [isEditMode, setIsEditMode] = useRecoilState(isEditModeAtom);
  const layoutState = useRecoilValue(layoutAtom);

  const toggleSetting = () => {
    setIsSettingOpened(true);
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
    window.open(ManualURL, '_blank');
  };

  const closeSetting = () => {
    setIsSettingOpened(false);
  };

  return (
    <div className={styles.setting}>
      <button type='button' onClick={toggleEditModeHandler}>
        <LayoutIcon className={cx({ [styles.active]: isEditMode })} />
      </button>
      <button type='button' onClick={toggleSetting}>
        <SettingIcon />
      </button>
      <button type='button' onClick={moveToGithub}>
        <HelpIcon />
      </button>
      <ModalPortal>
        {isSettingOpened && <Preference closeModal={closeSetting} />}
        {isWarningModalOpened && (
          <WarningModal message='외부로 벗어난 플러그인이 있습니다. 다시 확인해주세요' closeEvent={closeWarning} />
        )}
      </ModalPortal>
    </div>
  );
};

export default Setting;
