import { useMemo, useState } from 'react';
import { useRecoilState } from 'recoil';
import { Layout } from 'react-grid-layout';
import _ from 'lodash';

import { layoutAtom, toolBoxAtom } from 'states/plugin';

import ModalPortal from 'components/Modal/Potal';
import WarningModal from 'components/Modal/Warning';

import styles from './toolboxItem.module.scss';

interface IProps {
  item: Layout;
}

const ToolBoxItem = ({ item }: IProps) => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [layoutState, setLayoutState] = useRecoilState<Layout[]>(layoutAtom);
  const [toolBoxState, setToolBoxState] = useRecoilState<Layout[]>(toolBoxAtom);

  const filledSpace = useMemo(() => {
    const space = Array(10).fill(0);
    layoutState.forEach((layout) => {
      for (let i = layout.x; i < layout.x + layout.w; i += 1) {
        space[i] += layout.h;
      }
    });

    return space;
  }, [layoutState]);

  const addItemToLayout = () => {
    const init = { line: -1, width: 0, isSpaceFound: false };
    const emptySpace = filledSpace.reduce((acc, height, index) => {
      if (acc.isSpaceFound) return acc;
      if (height + item.h > 10) return init;

      const isSpaceExist = acc.width + 1 >= item.w;
      return { line: index, width: acc.width + 1, isSpaceFound: isSpaceExist };
    }, init);

    if (!emptySpace.isSpaceFound) {
      setIsModalOpened(true);
      return;
    }

    const itemToAdd = _.cloneDeep(toolBoxState.find(({ i }) => i === item.i));

    if (itemToAdd) {
      itemToAdd.x = emptySpace.line + 1 - item.w;
      itemToAdd.y = filledSpace[emptySpace.line];
      setLayoutState((prev) => [...prev, itemToAdd]);
      setToolBoxState((prev) => [...prev.filter(({ i }) => i !== item.i)]);
    }
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
        {isModalOpened && <WarningModal message='공간을 확보해주세요.' closeModal={closeModal} />}
      </ModalPortal>
    </div>
  );
};

export default ToolBoxItem;
