import { useRecoilState } from 'recoil';
import dayjs from 'dayjs';

import { tempSettingAtom } from 'states/settings';
import { datePresets, timePresets } from './utils';

import Dropdown from 'components/Dropdown';

import styles from './timeSetting.module.scss';

const TimeSetting = () => {
  const [tempSetting, setTempSetting] = useRecoilState(tempSettingAtom);

  const dateFomats = datePresets.map((preset) => preset.ex);

  const timeFomats = timePresets.map((preset) => preset.ex);

  const setDateFormat = (value: string) => {
    const selectedPreset = datePresets[datePresets.findIndex(({ ex }) => ex === value)];

    setTempSetting((prev) => {
      return { ...prev, dateType: selectedPreset.format };
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
          optionList={dateFomats}
          setOption={setDateFormat}
        />
      </div>
      <div className={styles.option}>
        <p>시간 형식</p>
        <Dropdown
          optionValue={dayjs().format(tempSetting.timeType)}
          optionList={timeFomats}
          setOption={setTimeFormat}
        />
      </div>
    </div>
  );
};

export default TimeSetting;
