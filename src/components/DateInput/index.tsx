import { CloseIcon } from 'assets/svgs';
import { Dispatch, SetStateAction } from 'react';
import DatePicker from 'react-datepicker';
import dayjs from 'dayjs';

import styles from './dateInput.module.scss';

interface IProps {
  value?: Date | null;
  setValue: Dispatch<SetStateAction<Date | null>>;
}

const DateInput = ({ value, setValue }: IProps) => {
  const changeDate = (date: Date) => {
    setValue(date);
  };

  const removeValue = () => {
    setValue(null);
  };

  const formatedDate = value ? dayjs(value).format('YYYY-MM-DD / HH:mm') : '';

  return (
    <div className={styles.dateInputWrapper}>
      <DatePicker
        className={styles.datepicker}
        startDate={value || null}
        value={formatedDate}
        onChange={changeDate}
        showTimeInput
      />
      <button type='button' className={styles.removeValueButton} onClick={removeValue}>
        <CloseIcon />
      </button>
    </div>
  );
};

export default DateInput;
