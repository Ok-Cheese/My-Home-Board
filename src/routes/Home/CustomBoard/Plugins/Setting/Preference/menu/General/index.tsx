import { ChromePicker, ColorResult } from 'react-color';
import { useRecoilState } from 'recoil';
import { isArray } from 'lodash';
import Slider from 'rc-slider';

import { tempSettingAtom } from 'states/settings';

import styles from './generalSetting.module.scss';
import 'rc-slider/assets/index.css';

const GeneralSetting = () => {
  const [tempSetting, setTempSetting] = useRecoilState(tempSettingAtom);

  const tempBackground = tempSetting.background;
  const previewStyle = {
    background: `linear-gradient(${tempBackground.gradientAngle}deg, ${tempBackground.firstColor} ${tempBackground.gradientPoint}%, ${tempBackground.secondColor} 100%)`,
  };

  const firstColorChangeHandler = (color: ColorResult) => {
    const newBackground = { ...tempBackground, firstColor: color.hex };

    setTempSetting((prev) => {
      return {
        ...prev,
        background: newBackground,
      };
    });
  };

  const secondColorChangeHandler = (color: ColorResult) => {
    const newBackground = { ...tempBackground, secondColor: color.hex };

    setTempSetting((prev) => {
      return {
        ...prev,
        background: newBackground,
      };
    });
  };

  const gradientAngleChangeHandler = (value: number | number[]) => {
    if (isArray(value)) return;

    const newBackground = { ...tempBackground, gradientAngle: value };

    setTempSetting((prev) => {
      return {
        ...prev,
        background: newBackground,
      };
    });
  };

  const gradientPointChangeHandler = (value: number | number[]) => {
    if (isArray(value)) return;

    const newBackground = { ...tempBackground, gradientPoint: value };

    setTempSetting((prev) => {
      return {
        ...prev,
        background: newBackground,
      };
    });
  };

  return (
    <div className={styles.setting}>
      <div className={styles.option}>
        <p className={styles.optionTitle}>Background Color</p>
        <div className={styles.previewWrapper}>
          <p>Preview</p>
          <div className={styles.preview} style={previewStyle} />
        </div>
        <div className={styles.detail}>
          <div className={styles.colorPicker}>
            <ChromePicker color={tempBackground.firstColor} onChange={firstColorChangeHandler} />
          </div>
          <div className={styles.colorPicker}>
            <ChromePicker color={tempBackground.secondColor} onChange={secondColorChangeHandler} />
          </div>
        </div>
        <div className={styles.detail}>
          <span>{`${tempBackground.gradientAngle}°`}</span>
          <Slider min={0} max={360} value={tempBackground.gradientAngle} onChange={gradientAngleChangeHandler} />
        </div>
        <div className={styles.detail}>
          <span>{`${tempBackground.gradientPoint}%`}</span>
          <Slider
            className={styles.slider}
            min={0}
            max={100}
            value={tempBackground.gradientPoint}
            onChange={gradientPointChangeHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default GeneralSetting;
