import { ChangeEvent, Dispatch, SetStateAction } from 'react';

import styles from './input.module.scss';

interface IProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  placeholder?: string;
}

const Input = ({ value, setValue, placeholder }: IProps) => {
  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  return <input className={styles.input} value={value} onChange={inputChangeHandler} placeholder={placeholder} />;
};

export default Input;
