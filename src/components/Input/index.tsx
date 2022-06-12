import { ChangeEvent, Dispatch, SetStateAction } from 'react';

import styles from './input.module.scss';

interface IProps {
  type?: 'text' | 'password';
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

const Input = ({ type, value, setValue }: IProps) => {
  const changeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  return (
    <input
      type={type || 'text'}
      className={styles.input}
      value={value}
      onChange={changeInputHandler}
      spellCheck={false}
    />
  );
};

export default Input;
