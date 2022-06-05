import { tierList } from '../utiles';
import styles from './userInform.module.scss';

interface IInform {
  tier: number;
  solved: string;
  maxStreak: string;
}

interface IProps {
  inform: IInform;
}

const UserInform = ({ inform }: IProps) => {
  return (
    <div className={styles.inform}>
      <dl>
        <div className={styles.line}>
          <dt># 티어</dt>
          <dd>{tierList[inform.tier - 1]}</dd>
        </div>
        <div className={styles.line}>
          <dt># 푼 문제</dt>
          <dd>{inform.solved}문제 </dd>
        </div>
        <div className={styles.line}>
          <dt># 최장 스트릭</dt>
          <dd>{inform.maxStreak}일</dd>
        </div>
      </dl>
    </div>
  );
};

export default UserInform;
