import { tierList } from '../utiles';

import styles from './userInform.module.scss';

export interface IInform {
  tier: number;
  solved: string;
}

interface IProps {
  inform: IInform;
}

const UserInform = ({ inform }: IProps) => {
  return (
    <div className={styles.inform}>
      <dl>
        <div className={styles.line}>
          <dt>Tier</dt>
          <dd>{tierList[inform.tier - 1]}</dd>
        </div>
        <div className={styles.line}>
          <dt>Solved</dt>
          <dd>{inform.solved}</dd>
        </div>
      </dl>
    </div>
  );
};

export default UserInform;
