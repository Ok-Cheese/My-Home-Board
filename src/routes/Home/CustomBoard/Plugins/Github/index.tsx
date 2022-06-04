import { useEffect, useState } from 'react';
import store from 'store';

import { GitHubIcon } from 'assets/svgs';

import Button from 'components/Button';
import IdInputModal from 'components/Modal/IdInputModal';

import styles from './github.module.scss';
import CommitChart from './CommitChart';
import ModalPortal from 'components/Modal/Potal';

const Github = () => {
  const [userId, setUserId] = useState('');
  const [isModalOpened, setIsModalOpened] = useState(false);

  const openModal = () => {
    setIsModalOpened(true);
  };

  const buttonContent = userId || 'ID 입력';
  const content = userId ? (
    <CommitChart />
  ) : (
    <div className={styles.empty}>
      <p>ID를 입력해주세요.</p>
    </div>
  );

  useEffect(() => {
    const savedId = store.get('github_id');

    if (!savedId) return;

    setUserId(savedId);
  }, []);

  return (
    <div className={styles.github}>
      <ModalPortal>
        {isModalOpened && <IdInputModal type='github' setUserId={setUserId} setIsModalOpened={setIsModalOpened} />}
      </ModalPortal>
      <div className={styles.title}>
        <GitHubIcon />
        <Button size='normal' onClick={openModal}>
          {buttonContent}
        </Button>
      </div>
      {content}
    </div>
  );
};

export default Github;
