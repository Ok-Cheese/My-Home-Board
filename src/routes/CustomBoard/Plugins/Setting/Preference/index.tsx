import { useState, MouseEvent } from 'react';
import { useRecoilState } from 'recoil';
import { useMount } from 'react-use';
import { cx } from 'styles';
import store from 'store';

import { settingAtom, tempSettingAtom } from 'states/settings';

import Button from 'components/Button';
import Modal from 'components/Modal';
import TimeSetting from './menu/Time';
import GeneralSetting from './menu/General';

import styles from './preference.module.scss';

type TPreferMenu = 'General' | 'Time';

interface IProps {
  closeModal: () => void;
}

const sidebarMenuArr: TPreferMenu[] = ['General', 'Time'];

const Preference = ({ closeModal }: IProps) => {
  const [currentMenu, setCurrentMenu] = useState<TPreferMenu>('General');

  const [setting, setSetting] = useRecoilState(settingAtom);
  const [tempSetting, setTempSetting] = useRecoilState(tempSettingAtom);

  useMount(() => {
    setTempSetting(setting);
  });

  const confirmSetting = () => {
    store.set('setting', tempSetting);
    setSetting(tempSetting);
    closeModal();
  };

  const cancelSetting = () => {
    closeModal();
  };

  const changeMenu = (e: MouseEvent<HTMLButtonElement>) => {
    setCurrentMenu(e.currentTarget.dataset.menu as TPreferMenu);
  };

  const decideContent = (name: TPreferMenu) => {
    return {
      General: <GeneralSetting />,
      Time: <TimeSetting />,
    }[name];
  };

  const sidebarMenu = sidebarMenuArr.map((menu) => (
    <button
      key={menu}
      type='button'
      className={cx({ [styles.currentMenu]: currentMenu === menu })}
      data-menu={menu}
      onClick={changeMenu}
    >
      {menu}
    </button>
  ));

  return (
    <Modal closeModal={closeModal}>
      <div className={styles.preference}>
        <div className={styles.sidebar}>{sidebarMenu}</div>
        <div className={styles.main}>
          <div className={styles.content}>{decideContent(currentMenu)}</div>
          <div className={styles.buttonWrapper}>
            <Button size='fill' type='button' onClick={confirmSetting}>
              확인
            </Button>
            <Button size='fill' type='button' onClick={cancelSetting}>
              취소
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Preference;