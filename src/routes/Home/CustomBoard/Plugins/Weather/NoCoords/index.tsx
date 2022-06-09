import { Layout } from 'react-grid-layout';
import styles from './noCoords.module.scss';

interface IProps {
  layout: Layout;
  isError: boolean;
  getCoordinates: () => void;
}

const NoCoords = ({ layout, isError, getCoordinates }: IProps) => {
  const pulginStyles = { fontSize: `${Math.min(layout.w, layout.h) * 8}px` };

  const reloadCoords = () => {
    getCoordinates();
  };

  const content = <p style={pulginStyles}>{isError ? 'Error!' : '위치를 확인할 수 없습니다.'}</p>;

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
