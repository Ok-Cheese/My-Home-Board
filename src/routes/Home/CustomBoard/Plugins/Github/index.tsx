import { useEffect, useMemo, useState } from 'react';
import store from 'store';

import { EditIcon } from 'assets/svgs';
import { GitHubIcon } from 'assets/svgs/presets';

import GithubModal from './GithubModal';
import Button from 'components/Button';
import ModalPortal from 'components/Modal/Potal';

import styles from './github.module.scss';

const savedUserId = store.get('githubId');

const Github = () => {
  const [userId, setUserId] = useState(savedUserId || '');
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [isIdUnknown, setIsIdUnknown] = useState(false);

  useEffect(() => {
    setIsIdUnknown(false);
    store.set('githubId', userId);
  }, [userId]);

  const openModal = () => {
    setIsModalOpened(true);
  };

  const closeModal = () => {
    setIsModalOpened(false);
  };

  const githubErrorHandler = () => {
    setIsIdUnknown(true);
  };

  const content = useMemo(() => {
    if (isIdUnknown) return <p>잘못된 아이디입니다.</p>;

    if (userId)
      return <img src={`https://ghchart.rshah.org/${userId}`} alt='github commits' onError={githubErrorHandler} />;

    return <p>아이디를 입력하세요.</p>;
  }, [isIdUnknown, userId]);

  return (
    <div className={styles.github}>
      <div className={styles.title}>
        <GitHubIcon />
        <p>Github Commits</p>
      </div>
      <Button isIcon onClick={openModal}>
        <EditIcon />
      </Button>
      <div className={styles.contentWrapper}>{content}</div>
      <ModalPortal>
        {isModalOpened && <GithubModal userId={userId} setUserId={setUserId} closeModal={closeModal} />}
      </ModalPortal>
    </div>
  );
};

export default Github;
