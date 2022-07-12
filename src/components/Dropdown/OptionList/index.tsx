import { MouseEvent } from 'react';

import styles from './optionList.module.scss';

interface IProps {
  optionList: string[];
  onSelect: (e: MouseEvent<HTMLButtonElement>) => void;
}

const OptionList = ({ optionList, onSelect }: IProps) => {
  const options = optionList.map((elem) => (
    <li key={elem} className={styles.option}>
      <button type='button' className={styles.clickable} data-value={elem} onClick={onSelect}>
        {elem}
      </button>
    </li>
  ));

  return <ul className={styles.optionList}>{options}</ul>;
};

export default OptionList;
