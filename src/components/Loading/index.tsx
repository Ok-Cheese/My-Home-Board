import styles from './loading.module.scss';

interface IProps {
  size: string;
}

const Loading = ({ size }: IProps) => {
  return (
    <div className={styles.loadingWrapper}>
      <div className={styles.loading} style={{ width: size, height: size }} />
    </div>
  );
};

export default Loading;
