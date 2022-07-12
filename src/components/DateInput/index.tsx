import { CloseIcon } from 'assets/svgs';
import { Dispatch, SetStateAction } from 'react';
import DatePicker from 'react-datepicker';
import dayjs from 'dayjs';

import IconButton from 'components/IconButton';

import styles from './dateInput.module.scss';

interface IProps {
  value?: Date | null;
  setValue: Dispatch<SetStateAction<Date | null>>;
  label?: string;
}

const DateInput = ({ value, setValue, label }: IProps) => {
  const changeDate = (date: Date) => {
    setValue(date);
  };

  const removeValue = () => {
    setValue(null);
  };

  const formatedDate = value ? dayjs(value).format('YYYY-MM-DD / HH:mm') : '';

  return (
    <fieldset className={styles.fieldset}>
      <label className={styles.label}>
        <span>{label}</span>
        <div className={styles.wrapper}>
          <DatePicker startDate={value || null} value={formatedDate} onChange={changeDate} showTimeInput />
        </div>
      </label>
      <IconButton position={{ top: '50%', right: '10px' }} onClick={removeValue} size='20px'>
        <CloseIcon />
      </IconButton>
    </fieldset>
  );
};

export default DateInput;
