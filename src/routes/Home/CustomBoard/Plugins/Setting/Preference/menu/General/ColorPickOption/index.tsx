import { useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useClickAway } from 'react-use';
import { ChromePicker, ColorResult } from 'react-color';

import { tempSettingAtom } from 'states/settings';

import styles from './colorPickOption.module.scss';

interface IProps {
  target: 'background' | 'plugin';
  type: 'backgroundFirst' | 'backgroundSecond' | 'pluginBackground' | 'pluginFont';
}

const ColorPickOption = ({ type, target }: IProps) => {
  const [tempSetting, setTempSetting] = useRecoilState(tempSettingAtom);
  const [isColorPickerOpened, setIsColorPickerOpened] = useState(false);

  const colorRef = useRef(null);

  const tempBackground = tempSetting.background;
  const tempPluginColor = tempSetting.plugin;
  const currentTempColor = {
    backgroundFirst: tempBackground.firstColor,
    backgroundSecond: tempBackground.secondColor,
    pluginBackground: tempPluginColor.color,
    pluginFont: tempPluginColor.fontColor,
  }[type];
  const pickerName = {
    backgroundFirst: 'First Color',
    backgroundSecond: 'Second Color',
    pluginBackground: 'Color',
    pluginFont: 'Font Color',
  }[type];

  useClickAway(colorRef, () => {
    setIsColorPickerOpened(false);
  });

  const openColorPicker = () => {
    setIsColorPickerOpened(true);
  };

  const colorChangeHandler = (color: ColorResult) => {
    if (target === 'plugin') {
      const newPlugin =
        type === 'pluginBackground'
          ? { ...tempPluginColor, color: color.hex }
          : { ...tempPluginColor, fontColor: color.hex };

      setTempSetting((prev) => {
        return {
          ...prev,
          plugin: newPlugin,
        };
      });

      return;
    }

    const newBackground =
      type === 'backgroundFirst'
        ? { ...tempBackground, firstColor: color.hex }
        : { ...tempBackground, secondColor: color.hex };

    setTempSetting((prev) => {
      return {
        ...prev,
        background: newBackground,
      };
    });
  };

  return (
    <div className={styles.colorPickOption}>
      <span>{pickerName}</span>
      <button type='button' className={styles.colorPreview} onClick={openColorPicker}>
        <div style={{ background: currentTempColor }} />
      </button>
      {isColorPickerOpened && (
        <div ref={colorRef} className={styles.colorPicker}>
          <ChromePicker color={currentTempColor} onChange={colorChangeHandler} />
        </div>
      )}
    </div>
  );
};

export default ColorPickOption;
