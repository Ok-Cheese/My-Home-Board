import { ArrowIcon } from 'assets/svgs';
import { SetStateAction, MouseEvent, useState } from 'react';

import styles from './dropdown.module.scss';

interface IProps {
  optionValue: string;
  optionArray: string[];
  setOption: SetStateAction<any>;
}

const Dropdown = ({ optionValue, optionArray, setOption }: IProps) => {
  const [isOptionOpened, setIsOptionOpened] = useState(false);

  const arrowStyle = { transform: isOptionOpened ? 'rotate(180deg)' : '' };

  const toggleDropdown = () => {
    setIsOptionOpened((prev) => !prev);
  };

  const selectOptionHandler = (e: MouseEvent<HTMLButtonElement>) => {
    setOption(e.currentTarget.dataset.value);
    setIsOptionOpened(false);
  };

  const options = optionArray.map((elem) => (
    <li key={elem} className={styles.option}>
      <button type='button' data-value={elem} onClick={selectOptionHandler}>
        {elem}
      </button>
    </li>
  ));

  return (
    <div className={styles.dropdown}>
      <button type='button' className={styles.selected} onClick={toggleDropdown}>
        <span>{optionValue}</span>
        <ArrowIcon style={arrowStyle} />
      </button>
      {isOptionOpened && <ul className={styles.options}>{options}</ul>}
    </div>
  );
};

export default Dropdown;
