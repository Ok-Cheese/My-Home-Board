import { ChangeEvent, Dispatch, SetStateAction } from 'react';

import styles from './input.module.scss';

interface IProps {
  type?: 'text' | 'password';
  label?: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

const Input = ({ type, label, value, setValue }: IProps) => {
  const changeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  return (
    <fieldset className={styles.fieldset}>
      <label className={styles.label}>
        {label}
        <input
          type={type || 'text'}
          className={styles.input}
          value={value}
          onChange={changeInputHandler}
          spellCheck={false}
        />
      </label>
    </fieldset>
  );
};

export default Input;
