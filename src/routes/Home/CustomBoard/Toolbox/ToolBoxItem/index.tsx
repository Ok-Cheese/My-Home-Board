import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { Layout } from 'react-grid-layout';

import { layoutAtom, toolBoxAtom } from 'states/plugin';

import ModalPortal from 'components/Modal/Potal';
import WarningModal from 'components/Modal/Warning';

import styles from './toolboxItem.module.scss';
import _ from 'lodash';

interface IProps {
  item: Layout;
}

const ToolBoxItem = ({ item }: IProps) => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [layoutState, setLayoutState] = useRecoilState<Layout[]>(layoutAtom);
  const [toolBoxState, setToolBoxState] = useRecoilState<Layout[]>(toolBoxAtom);

  const filledSpace = Array(10).fill(0);
  layoutState.forEach((layout) => {
    for (let i = layout.x; i < layout.x + layout.w; i += 1) {
      filledSpace[i] += layout.h;
    }
  });

  const addItemToLayout = () => {
    const init = { line: -1, sum: 0, isSpaceFound: false };
    const emptySpace = filledSpace.reduce((acc, height, index) => {
      if (acc.isSpaceFound) return acc;
      if (height + item.h > 10) return init;

      const isSpaceExist = acc.sum + 1 >= item.w;
      return { line: index, sum: acc.sum + 1, isSpaceFound: isSpaceExist };
    }, init);

    if (!emptySpace.isSpaceFound) {
      setIsModalOpened(true);
      return;
    }

    const newLayout = _.cloneDeep(toolBoxState.find(({ i }) => i === item.i));

    setToolBoxState((prev) => [...prev.filter(({ i }) => i !== item.i)]);

    if (newLayout) {
      newLayout.x = emptySpace.line - item.w + 1;
      newLayout.y = filledSpace[emptySpace.line];
      setLayoutState((prev) => [...prev, newLayout]);
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
        {isModalOpened && <WarningModal message='공간을 확보해주세요.' closeEvent={closeModal} />}
      </ModalPortal>
    </div>
  );
};

export default ToolBoxItem;
