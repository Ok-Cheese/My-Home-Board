import { useRecoilValue } from 'recoil';
import { Routes, Route } from 'react-router-dom';

import { settingAtom } from 'states/settings';

import CustomBoard from './CustomBoard';

import styles from './routes.module.scss';

const App = () => {
  const { background } = useRecoilValue(settingAtom);

  const appStyle = {
    background: `linear-gradient(${background.gradientAngle}deg, ${background.firstColor} ${background.gradientPoint}%, ${background.secondColor} 100%)`,
  };

  return (
    <div className={styles.app} style={appStyle}>
      <Routes>
        <Route path='/' element={<CustomBoard />} />
      </Routes>
    </div>
  );
};

export default App;
