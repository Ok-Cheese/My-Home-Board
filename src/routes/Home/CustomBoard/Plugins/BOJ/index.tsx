import { useMemo, useState } from 'react';
import { Layout } from 'react-grid-layout';
import { useQuery } from 'react-query';
import store from 'store';

import { getBOJData } from './utiles';
import { EditIcon } from 'assets/svgs';

import BOJModal from './BOJModal';
import UserInform from './userInform';
import Button from 'components/Button';
import Loading from 'components/Loading';
import ModalPortal from 'components/Modal/Potal';

import styles from './boj.module.scss';

interface IProps {
  layout: Layout;
}

const SavedBOJId = store.get('BOJ');

const BOJ = ({ layout }: IProps) => {
  const [userId, setUserId] = useState(SavedBOJId || '');
  const [isModalOpened, setIsModalOpened] = useState(false);

  const { data, isLoading, isError } = useQuery(['getBOJData', userId], () => getBOJData(userId), {
    enabled: Boolean(userId),
  });

  const openModal = () => {
    setIsModalOpened(true);
  };

  const closeModal = () => {
    setIsModalOpened(false);
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
          <Loading size={`${Math.min(layout.w, layout.h) * 25}px`} />
        </div>
      );
    }

    return <UserInform inform={informData} />;
  }, [data?.data, isError, isLoading, layout.h, layout.w, userId]);

  return (
    <div className={styles.boj}>
      <ModalPortal>
        {isModalOpened && <BOJModal userId={userId} setUserId={setUserId} closeModal={closeModal} />}
      </ModalPortal>
      <p className={styles.title}>BAEKJOON</p>
      <Button isIcon onClick={openModal}>
        <EditIcon />
      </Button>
      <div className={styles.content}>{content}</div>
    </div>
  );
};

export default BOJ;
