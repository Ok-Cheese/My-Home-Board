import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import styles from './routes.module.scss';

const App = () => {
  return (
    <div className={styles.appWrapper}>
      <div className={styles.app}>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
