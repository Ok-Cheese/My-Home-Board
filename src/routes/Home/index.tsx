import CustomBoard from './CustomBoard';

import styles from './home.module.scss';

const Home = () => {
  return (
    <div className={styles.home}>
      <CustomBoard />
    </div>
  );
};

export default Home;
