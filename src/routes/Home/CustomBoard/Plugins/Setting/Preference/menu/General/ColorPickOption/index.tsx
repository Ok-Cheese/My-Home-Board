import { useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useClickAway } from 'react-use';
import { ChromePicker, ColorResult } from 'react-color';

import { tempSettingAtom } from 'states/settings';

import styles from './colorPickOption.module.scss';

interface IProps {
  type: 'first' | 'second';
}

const ColorPickOption = ({ type }: IProps) => {
  const [tempSetting, setTempSetting] = useRecoilState(tempSettingAtom);
  const [isColorPickerOpened, setIsColorPickerOpened] = useState(false);

  const colorRef = useRef(null);

  const tempBackground = tempSetting.background;
  const currentTempColor = type === 'first' ? tempBackground.firstColor : tempBackground.secondColor;

  useClickAway(colorRef, () => {
    setIsColorPickerOpened(false);
  });

  const openColorPicker = () => {
    setIsColorPickerOpened(true);
  };

  const colorChangeHandler = (color: ColorResult) => {
    const newBackground =
      type === 'first' ? { ...tempBackground, firstColor: color.hex } : { ...tempBackground, secondColor: color.hex };

    setTempSetting((prev) => {
      return {
        ...prev,
        background: newBackground,
      };
    });
  };

  return (
    <div className={styles.colorPickOption}>
      <span>First Color</span>
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
