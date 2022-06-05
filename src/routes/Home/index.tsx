import { useRecoilValue } from 'recoil';
import { backgroundColorState } from 'states/color';
import CustomBoard from './CustomBoard';

import styles from './home.module.scss';

const Home = () => {
  const bgColor = useRecoilValue(backgroundColorState);

  return (
    <div
      className={styles.home}
      style={{
        background: `linear-gradient(${bgColor.gradientAngle}deg, ${bgColor.firstColor} ${bgColor.gradientPoint}%, ${bgColor.secondColor} 100%)`,
      }}
    >
      <CustomBoard />
    </div>
  );
};

export default Home;
