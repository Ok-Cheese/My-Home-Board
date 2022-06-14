import { useCallback, useMemo } from 'react';
import { useRecoilState } from 'recoil';
import Slider from 'rc-slider';
import { isArray } from 'lodash';

import { tempSettingAtom } from 'states/settings';

import styles from './gradientSlideOption.module.scss';

interface IProps {
  type: 'backgroundAngle' | 'backgroundPoint' | 'pluginOpacity';
}

const GradientSlideOption = ({ type }: IProps) => {
  const [tempSetting, setTempSetting] = useRecoilState(tempSettingAtom);

  const tempBackground = tempSetting.background;
  const tempPluginColor = tempSetting.plugin;

  const valueChangeHandler = useCallback(
    (value: number | number[]) => {
      if (isArray(value)) return;

      if (type === 'pluginOpacity') {
        const newPlugin = { ...tempPluginColor, opacity: value };
        setTempSetting((prev) => {
          return {
            ...prev,
            plugin: newPlugin,
          };
        });

        return;
      }

      const newBackground = { ...tempBackground, gradientAngle: value };
      setTempSetting((prev) => {
        return {
          ...prev,
          background: newBackground,
        };
      });
    },
    [setTempSetting, tempBackground, tempPluginColor, type]
  );

  const sliderOption = useMemo(() => {
    return {
      backgroundAngle: {
        min: 0,
        max: 360,
        value: tempBackground.gradientAngle,
        onChange: valueChangeHandler,
      },
      backgroundPoint: { min: 0, max: 100, value: tempBackground.gradientPoint, onChange: valueChangeHandler },
      pluginOpacity: { min: 0, max: 100, value: tempPluginColor.opacity, onChange: valueChangeHandler },
    }[type];
  }, [tempBackground, tempPluginColor, type, valueChangeHandler]);

  const optionValue = useMemo(() => {
    return {
      backgroundAngle: `(${tempBackground.gradientPoint}%)`,
      backgroundPoint: `(${tempBackground.gradientAngle}°)`,
      pluginOpacity: `(${tempPluginColor.opacity}%)`,
    }[type];
  }, [tempBackground, tempPluginColor, type]);

  return (
    <div className={styles.gradientSlider}>
      <span>Gradient Angle</span>
      <Slider className={styles.slider} {...sliderOption} />
      <span className={styles.optionValue}>{optionValue}</span>
    </div>
  );
};

export default GradientSlideOption;
