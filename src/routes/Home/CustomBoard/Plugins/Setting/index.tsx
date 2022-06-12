import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ColorIcon, HelpIcon, LayoutIcon, SettingIcon } from 'assets/svgs';
import { GitHubIcon } from 'assets/svgs/presets';
import store from 'store';
import { cx } from 'styles';

import { isEditModeAtom, layoutAtom } from 'states/plugin';

import ModalPortal from 'components/Modal/Potal';
import Preference from 'routes/Home/CustomBoard/Plugins/Setting/Preference';
import WarningModal from 'components/Modal/WarningModal';

import styles from './setting.module.scss';

const GITHUB_URL = 'https://github.com/Ok-Cheese/My-Home-Board';

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
    window.open(GITHUB_URL, '_blank');
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
