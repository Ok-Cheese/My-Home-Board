import { MouseEvent, Dispatch, SetStateAction } from 'react';
import { cx } from 'styles';

import { TPreferMenu } from '../type.d';

import styles from './sidebar.module.scss';

interface IProps {
  currentMenu: TPreferMenu;
  setCurrentMenu: Dispatch<SetStateAction<TPreferMenu>>;
}

const menuNames: TPreferMenu[] = ['General', 'Time'];

const Sidebar = ({ currentMenu, setCurrentMenu }: IProps) => {
  const changeMenu = (e: MouseEvent<HTMLButtonElement>) => {
    setCurrentMenu(e.currentTarget.dataset.menu as TPreferMenu);
  };

  const sidebarMenu = menuNames.map((menu) => (
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

  return <aside className={styles.sidebar}>{sidebarMenu}</aside>;
};

export default Sidebar;
