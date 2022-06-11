import { useRecoilValue } from 'recoil';

import { settingAtom } from 'states/settings';

import CustomBoard from './CustomBoard';

import styles from './home.module.scss';

const Home = () => {
  const { background } = useRecoilValue(settingAtom);

  const homeStyle = {
    background: `linear-gradient(${background.gradientAngle}deg, ${background.firstColor} ${background.gradientPoint}%, ${background.secondColor} 100%)`,
  };

  return (
    <div className={styles.home} style={homeStyle}>
      <CustomBoard />
    </div>
  );
};

export default Home;
