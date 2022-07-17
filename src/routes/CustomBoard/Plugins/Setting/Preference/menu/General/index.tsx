import { useRecoilValue } from 'recoil';

import { tempSettingAtom } from 'states/settings';

import ColorPickOption from './ColorPickOption';
import GradientSlideOption from './GradientSlideOption';

import styles from './generalSetting.module.scss';

const GeneralSetting = () => {
  const tempSetting = useRecoilValue(tempSettingAtom);

  const tempBackground = tempSetting.background;

  const previewStyle = {
    background: `linear-gradient(${tempBackground.gradientAngle}deg, ${tempBackground.firstColor} ${tempBackground.gradientPoint}%, ${tempBackground.secondColor} 100%)`,
  };

  return (
    <div className={styles.setting}>
      <div className={styles.category}>
        <p className={styles.categoryTitle}>배경색</p>
        <div className={styles.option}>
          <p>미리보기</p>
          <div className={styles.preview} style={previewStyle} />
        </div>
        <div className={styles.option}>
          <ColorPickOption type='backgroundFirst' target='background' />
          <ColorPickOption type='backgroundSecond' target='background' />
          <GradientSlideOption type='backgroundAngle' />
          <GradientSlideOption type='backgroundPoint' />
        </div>
      </div>
      <div className={styles.category}>
        <p className={styles.categoryTitle}>플러그인 색</p>
        <ColorPickOption type='pluginBackground' target='plugin' />
        <ColorPickOption type='pluginFont' target='plugin' />
        <GradientSlideOption type='pluginOpacity' />
      </div>
    </div>
  );
};

export default GeneralSetting;
