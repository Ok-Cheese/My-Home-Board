import { ChangeEvent } from 'react';
import styles from './input.module.scss';

interface IProps {
  value: string;
  setValue: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const Input = ({ value, setValue, placeholder }: IProps) => {
  return (
    <input
      className={styles.input}
      type='text'
      value={value}
      onChange={setValue}
      placeholder={placeholder}
      spellCheck={false}
    />
  );
};

export default Input;
