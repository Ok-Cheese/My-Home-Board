import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { ChromePicker, ColorResult } from 'react-color';
import Slider from 'rc-slider';

import { backgroundColorState, blockColorState } from 'states/plugin';

import styles from './colorPicker.module.scss';
import 'rc-slider/assets/index.css';
import { isArray } from 'lodash';

interface IProps {
  editTarget: string;
}

const ColorPicker = ({ editTarget }: IProps) => {
  const [isColorPickerOpened, setIsColorPickerOpened] = useState(false);

  const [bgColor, setBgColor] = useRecoilState(backgroundColorState);
  const [blockColor, setBlockColor] = useRecoilState(blockColorState);

  const firstColorChangeHandler = (color: ColorResult) => {
    if (editTarget === 'background') {
      setBgColor((prev) => {
        return {
          ...prev,
          firstColor: color.hex,
          opacity: color.rgb.a || 1,
        };
      });

      return;
    }

    setBlockColor((prev) => {
      return {
        ...prev,
        firstColor: color.hex,
        opacity: color.rgb.a || 1,
      };
    });
  };

  const secondColorChangeHandler = (color: ColorResult) => {
    if (editTarget === 'background') {
      setBgColor((prev) => {
        return {
          ...prev,
          secondColor: color.hex,
          opacity: color.rgb.a || 1,
        };
      });

      return;
    }

    setBlockColor((prev) => {
      return {
        ...prev,
        secondColor: color.hex,
        opacity: color.rgb.a || 1,
      };
    });
  };

  const angleChangeHandler = (angle: number | number[]) => {
    if (isArray(angle)) return;

    if (editTarget === 'background') {
      setBgColor((prev) => {
        return {
          ...prev,
          gradientAngle: angle,
        };
      });

      return;
    }

    setBlockColor((prev) => {
      return {
        ...prev,
        gradientAngle: angle,
      };
    });
  };

  const gradientPointChangeHandler = (point: number | number[]) => {
    if (isArray(point)) return;

    if (editTarget === 'background') {
      setBgColor((prev) => {
        return {
          ...prev,
          gradientPoint: point,
        };
      });

      return;
    }

    setBlockColor((prev) => {
      return {
        ...prev,
        gradientPoint: point,
      };
    });
  };

  const gradientAngle = editTarget === 'background' ? bgColor.gradientAngle : blockColor.gradientAngle;

  const gradientPoint = editTarget === 'background' ? bgColor.gradientPoint : blockColor.gradientPoint;

  return (
    <div className={styles.colorPickerMenu}>
      <div className={styles.colorPcikerWrapper}>
        <div className={styles.colorPicker}>
          <ChromePicker className={styles.test} color={bgColor.firstColor} onChange={firstColorChangeHandler} />
        </div>
        <div className={styles.colorPicker}>
          <ChromePicker color={bgColor.secondColor} onChange={secondColorChangeHandler} />
        </div>
      </div>
      <div className={styles.slider}>
        <Slider min={0} max={100} onChange={gradientPointChangeHandler} />
        <span>{gradientPoint}%</span>
      </div>
      <div className={styles.slider}>
        <Slider min={0} max={360} onChange={angleChangeHandler} />
        <span>{gradientAngle}deg</span>
      </div>
    </div>
  );
};

export default ColorPicker;
