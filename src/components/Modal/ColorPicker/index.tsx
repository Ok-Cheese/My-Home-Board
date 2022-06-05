import { useRecoilState } from 'recoil';
import { ChromePicker, ColorResult } from 'react-color';
import Slider from 'rc-slider';
import { isArray } from 'lodash';
import store from 'store';

import { backgroundColorState } from 'states/color';

import Modal from '..';
import Button from 'components/Button';

import styles from './colorPicker.module.scss';
import 'rc-slider/assets/index.css';

interface IProps {
  closeModal: () => void;
}

const ColorPickModal = ({ closeModal }: IProps) => {
  const [bgColor, setBgColor] = useRecoilState(backgroundColorState);

  const firstColorChangeHandler = (color: ColorResult) => {
    setBgColor((prev) => {
      const newBgColor = { ...prev, firstColor: color.hex, opacity: color.rgb.a || 1 };

      store.set('backgroundColor', newBgColor);
      return newBgColor;
    });
  };

  const secondColorChangeHandler = (color: ColorResult) => {
    setBgColor((prev) => {
      const newBgColor = {
        ...prev,
        secondColor: color.hex,
        opacity: color.rgb.a || 1,
      };

      store.set('backgroundColor', newBgColor);
      return newBgColor;
    });
  };

  const angleChangeHandler = (angle: number | number[]) => {
    if (isArray(angle)) return;

    setBgColor((prev) => {
      const newBgColor = {
        ...prev,
        gradientAngle: angle,
      };

      store.set('backgroundColor', newBgColor);

      return newBgColor;
    });
  };

  const gradientPointChangeHandler = (point: number | number[]) => {
    if (isArray(point)) return;

    setBgColor((prev) => {
      const newBgColor = {
        ...prev,
        gradientPoint: point,
      };

      store.set('backgroundColor', newBgColor);

      return newBgColor;
    });
  };

  return (
    <Modal>
      <div className={styles.colorPicker}>
        <div className={styles.colorPickerWrapper}>
          <div className={styles.colorPicker}>
            <ChromePicker color={bgColor.firstColor} onChange={firstColorChangeHandler} />
          </div>
          <div className={styles.colorPicker}>
            <ChromePicker color={bgColor.secondColor} onChange={secondColorChangeHandler} />
          </div>
        </div>
        <div className={styles.slider}>
          <span>{bgColor.gradientPoint}%</span>
          <Slider min={0} max={100} value={bgColor.gradientPoint} onChange={gradientPointChangeHandler} />
        </div>
        <div className={styles.slider}>
          <span>{bgColor.gradientAngle}deg</span>
          <Slider min={0} max={360} value={bgColor.gradientAngle} onChange={angleChangeHandler} />
        </div>
        <Button size='normal' onClick={closeModal}>
          확인
        </Button>
      </div>
    </Modal>
  );
};

export default ColorPickModal;
