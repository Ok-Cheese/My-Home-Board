import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { useMount } from 'react-use';
import store from 'store';

import { TPreferMenu } from './type.d';
import { settingAtom, tempSettingAtom } from 'states/settings';

import Button from 'components/Button';
import Modal from 'components/Modal';
import TimeSetting from './menu/Time';
import GeneralSetting from './menu/General';

import styles from './preference.module.scss';
import Sidebar from './Sidebar';

interface IProps {
  closeModal: () => void;
}

const Preference = ({ closeModal }: IProps) => {
  const [currentMenu, setCurrentMenu] = useState<TPreferMenu>('General');

  const [setting, setSetting] = useRecoilState(settingAtom);
  const [tempSetting, setTempSetting] = useRecoilState(tempSettingAtom);

  useMount(() => {
    setTempSetting(setting);
  });

  const confirmSettingHandler = () => {
    store.set('setting', tempSetting);
    setSetting(tempSetting);
    closeModal();
  };

  const cancelSettingHandler = () => {
    closeModal();
  };

  const selectedContent = (name: TPreferMenu) => {
    return {
      General: <GeneralSetting />,
      Time: <TimeSetting />,
    }[name];
  };

  return (
    <Modal closeModal={closeModal}>
      <div className={styles.preference}>
        <Sidebar currentMenu={currentMenu} setCurrentMenu={setCurrentMenu} />
        <div className={styles.main}>
          <div className={styles.content}>{selectedContent(currentMenu)}</div>
          <div className={styles.buttonWrapper}>
            <Button size='fill' type='button' onClick={confirmSettingHandler}>
              확인
            </Button>
            <Button size='fill' type='button' onClick={cancelSettingHandler}>
              취소
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Preference;
