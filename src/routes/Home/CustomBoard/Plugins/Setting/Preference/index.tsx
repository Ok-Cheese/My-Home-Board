import { useState, MouseEvent } from 'react';
import { cx } from 'styles';

import Modal from '../../../../../../components/Modal';

import styles from './preference.module.scss';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { settingAtom, tempSettingAtom } from 'states/settings';
import ClockSetting from './menu/Clock';

type TPreferMenu = 'General' | 'Clock';

interface IProps {
  closeModal: () => void;
}

const sidebarMenuArr: TPreferMenu[] = ['General', 'Clock'];

const Preference = ({ closeModal }: IProps) => {
  const [currentMenu, setCurrentMenu] = useState<TPreferMenu>('General');

  const setSettings = useSetRecoilState(settingAtom);
  const tempSetting = useRecoilValue(tempSettingAtom);

  const confirmSetting = () => {
    setSettings(tempSetting);
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
      General: '',
      Clock: <ClockSetting />,
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
    <Modal>
      <div className={styles.preference}>
        <div className={styles.sidebar}>{sidebarMenu}</div>
        <div className={styles.main}>
          <div className={styles.content}>{decideContent(currentMenu)}</div>
          <div className={styles.bottom}>
            <button type='button' onClick={confirmSetting}>
              확인
            </button>
            <button type='button' onClick={cancelSetting}>
              취소
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Preference;
