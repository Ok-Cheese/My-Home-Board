import styles from './loading.module.scss';

interface IProps {
  size?: string;
}

const Loading = ({ size }: IProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.loading} style={{ width: size || '20px', height: size || '20px' }} />
    </div>
  );
};

export default Loading;
