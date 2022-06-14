import { useRecoilState } from 'recoil';
import Slider from 'rc-slider';
import { isArray } from 'lodash';

import { tempSettingAtom } from 'states/settings';

import styles from './gradientSlideOption.module.scss';

interface IProps {
  type: 'angle' | 'point';
}

const GradientSlideOption = ({ type }: IProps) => {
  const [tempSetting, setTempSetting] = useRecoilState(tempSettingAtom);

  const tempBackground = tempSetting.background;

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

  const sliderOption =
    type === 'point'
      ? { min: 0, max: 100, value: tempBackground.gradientPoint, onChange: gradientPointChangeHandler }
      : {
          min: 0,
          max: 360,
          value: tempBackground.gradientAngle,
          onChange: gradientAngleChangeHandler,
        };

  const optionValue = type === 'point' ? `(${tempBackground.gradientPoint}%)` : `(${tempBackground.gradientAngle}°)`;

  return (
    <div className={styles.gradientSlider}>
      <span>Gradient Angle</span>
      <Slider className={styles.slider} {...sliderOption} />
      <span className={styles.optionValue}>{optionValue}</span>
    </div>
  );
};

export default GradientSlideOption;
