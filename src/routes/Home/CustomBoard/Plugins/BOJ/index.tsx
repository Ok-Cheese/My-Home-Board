import { useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import store from 'store';

import { getBOJData } from './utiles';

import Button from 'components/Button';
import ModalPortal from 'components/Modal/Potal';
import IdInputModal from 'components/Modal/IdInputModal';
import UserInform from './userInform';

import styles from './boj.module.scss';

const BOJ = () => {
  const [userId, setUserId] = useState('');
  const [isModalOpened, setIsModalOpened] = useState(false);

  const { data, isLoading, isError } = useQuery(['getBOJData', userId], () => getBOJData(userId));

  const buttonContent = userId || 'ID 추가';

  useEffect(() => {
    const savedId = store.get('BOJ_id');

    if (!savedId) return;

    setUserId(savedId);
  }, []);

  const openModal = () => {
    setIsModalOpened(true);
  };

  const content = useMemo(() => {
    const informData = {
      tier: Number(data?.data.tier),
      solved: data?.data.solvedCount,
      maxStreak: data?.data.maxStreak,
    };

    if (!userId) {
      return (
        <div className={styles.empty}>
          <p>아이디를 입력해주세요.</p>
        </div>
      );
    }

    if (isError) {
      return (
        <div className={styles.empty}>
          <p>정보를 가져오는데 실패했습니다.</p>
        </div>
      );
    }

    if (isLoading) {
      return (
        <div className={styles.empty}>
          <p>로딩</p>
        </div>
      );
    }

    return <UserInform inform={informData} />;
  }, [data?.data, isError, isLoading, userId]);

  return (
    <div className={styles.boj}>
      <ModalPortal>
        {isModalOpened && <IdInputModal type='BOJ' setUserId={setUserId} setIsModalOpened={setIsModalOpened} />}
      </ModalPortal>
      <div className={styles.title}>
        <span>BAEKJOON</span>
        <Button size='normal' onClick={openModal}>
          {buttonContent}
        </Button>
      </div>
      <div className={styles.content}>{content}</div>
    </div>
  );
};

export default BOJ;
