import styles from './noCoords.module.scss';

interface IProps {
  isError: boolean;
  getCoords: () => void;
}

const NoCoords = ({ isError, getCoords }: IProps) => {
  const reloadCoords = () => {
    getCoords();
  };

  const content = <p>{isError ? 'Error!' : '위치를 확인할 수 없습니다.'}</p>;

  return (
    <div className={styles.noCoords}>
      {content}
      <button type='button' onClick={reloadCoords}>
        재확인
      </button>
    </div>
  );
};

export default NoCoords;
