import { useMemo, useState } from 'react';
import { useRecoilState } from 'recoil';
import { Layout } from 'react-grid-layout';

import { layoutAtom, toolBoxAtom } from 'states/plugin';

import ModalPortal from 'components/Modal/Potal';
import WarningModal from 'components/Modal/WarningModal';

import styles from './toolboxItem.module.scss';

interface IProps {
  item: Layout;
}

const ToolBoxItem = ({ item }: IProps) => {
  const [layoutState, setLayoutState] = useRecoilState<Layout[]>(layoutAtom);
  const [, setToolBoxState] = useRecoilState<Layout[]>(toolBoxAtom);
  const [isModalOpened, setIsModalOpened] = useState(false);

  const emptySpace = useMemo(() => {
    return layoutState.reduce((acc, layout) => {
      return acc - layout.w * layout.h;
    }, 100);
  }, [layoutState]);

  const addItemToLayout = () => {
    const itemSize = item.w * item.h;

    if (itemSize > emptySpace) {
      setIsModalOpened(true);
      return;
    }

    setToolBoxState((prev) => [...prev.filter(({ i }) => i !== item.i)]);
    setLayoutState((prev) => [...prev, item]);
  };

  const closeModal = () => {
    setIsModalOpened(false);
  };

  return (
    <div>
      <button type='button' className={styles.toolboxItem} onClick={addItemToLayout}>
        {item.i}
      </button>
      <ModalPortal>
        {isModalOpened && <WarningModal message='공간을 확보해주세요.' closeEvent={closeModal} />}
      </ModalPortal>
    </div>
  );
};

export default ToolBoxItem;
