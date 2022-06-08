import { useRecoilState } from 'recoil';
import dayjs from 'dayjs';

import { TDateFormat, tempSettingAtom, TTimeFormat } from 'states/settings';

import Dropdown from 'components/Dropdown';

import styles from './clockSetting.module.scss';

interface IDatePreset {
  locale: 'ko' | 'en';
  format: TDateFormat;
  ex: string;
}

interface ITimePreset {
  format: TTimeFormat;
  ex: string;
}

const datePresets: IDatePreset[] = [
  { locale: 'ko', format: 'MM월 DD일 ddd', ex: dayjs().format('MM월 DD일 ddd') },
  { locale: 'ko', format: 'MM월 DD일 dddd', ex: dayjs().format('MM월 DD일 dddd') },
  { locale: 'ko', format: 'YY년 MM월 DD일', ex: dayjs().format('YY년 MM월 DD일') },
  { locale: 'en', format: 'dddd MMM D', ex: dayjs().format('dddd MMM D') },
  { locale: 'en', format: 'ddd MM DD', ex: dayjs().format('ddd MM DD') },
  { locale: 'en', format: 'MM DD YYYY', ex: dayjs().format('MM DD YYYY') },
];

const timePresets: ITimePreset[] = [
  { format: 'HH : mm', ex: dayjs().format('HH : mm') },
  { format: 'hh : mm', ex: dayjs().format('hh : mm') },
  { format: 'HH시 mm분', ex: dayjs().format('HH시 mm분') },
  { format: 'hh시 mm분', ex: dayjs().format('hh시 mm분') },
];

const dateFomats = datePresets.map((preset) => preset.ex);
const timeFomats = timePresets.map((preset) => preset.ex);

const ClockSetting = () => {
  const [tempSetting, setTempSetting] = useRecoilState(tempSettingAtom);

  const setDateFormat = (value: string) => {
    const selectedPreset = datePresets[datePresets.findIndex(({ ex }) => ex === value)];

    setTempSetting((prev) => {
      return { ...prev, clockLocale: selectedPreset.locale, dateType: selectedPreset.format };
    });
  };

  const setTimeFormat = (value: string) => {
    const selectedPreset = timePresets[timePresets.findIndex(({ ex }) => ex === value)];

    setTempSetting((prev) => {
      return { ...prev, timeType: selectedPreset.format };
    });
  };

  return (
    <div className={styles.setting}>
      <div className={styles.option}>
        <p>날짜 형식</p>
        <Dropdown
          optionValue={dayjs().format(tempSetting.dateType)}
          optionArray={dateFomats}
          setOption={setDateFormat}
        />
      </div>
      <div className={styles.option}>
        <p>시간 형식</p>
        <Dropdown
          optionValue={dayjs().format(tempSetting.timeType)}
          optionArray={timeFomats}
          setOption={setTimeFormat}
        />
      </div>
    </div>
  );
};

export default ClockSetting;
