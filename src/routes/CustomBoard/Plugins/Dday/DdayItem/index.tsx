import { IDday, IRemainTime } from '../type';

import styles from './ddayItem.module.scss';

interface IProps {
  dday: IDday;
  remainTime: IRemainTime;
  style: { [prop: string]: any };
}

const DdayItem = ({ dday, remainTime, style }: IProps) => {
  return (
    <div className={styles.dday}>
      <p className={styles.item} style={style.title}>{`${dday.title}`}</p>
      <p className={styles.item} style={style.date}>{`D${remainTime.sign}${remainTime.date}`}</p>
      <p
        className={styles.item}
        style={style.time}
      >{`${remainTime.sign} ${remainTime.hour}:${remainTime.minute}:${remainTime.second}`}</p>
    </div>
  );
};

export default DdayItem;
