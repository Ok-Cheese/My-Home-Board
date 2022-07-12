import { SetStateAction, MouseEvent, useState } from 'react';
import { SetterOrUpdater } from 'recoil';
import cx from 'classnames';

import { ArrowIcon } from 'assets/svgs';

import OptionList from './OptionList';

import styles from './dropdown.module.scss';

interface IProps {
  optionValue: string;
  optionList: string[];
  setOption: SetStateAction<any> | SetterOrUpdater<any>;
}

const Dropdown = ({ optionValue, optionList, setOption }: IProps) => {
  const [isOptionOpened, setIsOptionOpened] = useState(false);

  const toggleDropdown = () => {
    setIsOptionOpened((prev) => !prev);
  };

  const selectOptionHandler = (e: MouseEvent<HTMLButtonElement>) => {
    setOption(e.currentTarget.dataset.value);
  };

  return (
    <button type='button' className={styles.dropdown} onClick={toggleDropdown}>
      {optionValue}
      <ArrowIcon className={cx(styles.arrow, { [styles.reverseArrow]: isOptionOpened })} />
      {isOptionOpened && <OptionList optionList={optionList} onSelect={selectOptionHandler} />}
    </button>
  );
};

export default Dropdown;
