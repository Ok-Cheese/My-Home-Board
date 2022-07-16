import { useMemo } from 'react';
import { cx } from 'styles';
import styles from './boxOfficeItem.module.scss';

interface IItem {
  title: string;
  rank: string;
  rankInten: string;
}

interface IProps {
  item: IItem;
}

const BoxOfficeItem = ({ item }: IProps) => {
  const rankChange = useMemo(() => {
    const rankInten = Number(item.rankInten);
    if (rankInten > 0) return { value: `+${rankInten}`, class: 'up' };
    if (rankInten < 0) return { value: item.rankInten, class: 'down' };
    return { value: '-', class: 'same' };
  }, [item.rankInten]);

  return (
    <li className={styles.boxOfficeItem}>
      <div className={styles.rank}>{item.rank}</div>
      <span className={styles.title}>{item.title}</span>
      <span className={cx(styles.rankChange, styles[rankChange.class])}>{rankChange.value}</span>
    </li>
  );
};

export default BoxOfficeItem;
