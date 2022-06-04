import ModalPortal from 'components/Modal/Potal';
import WarningModal from 'components/Modal/WarningModal';
import { useMemo, useState } from 'react';
import { Layout } from 'react-grid-layout';
import { useRecoilState } from 'recoil';
import { layoutAtom, toolBoxAtom } from 'states/plugin';

interface IProps {
  item: Layout;
}

const ToolBoxItem = ({ item }: IProps) => {
  const [layoutState, setLayoutState] = useRecoilState<Layout[]>(layoutAtom);
  const [toolBoxState, setToolBoxState] = useRecoilState<Layout[]>(toolBoxAtom);
  const [isModalOpened, setIsModalOpened] = useState(false);

  const emptySpace = useMemo(() => {
    return layoutState.reduce((acc, layout) => {
      return acc - layout.w * layout.h;
    }, 100);
  }, [layoutState]);

  const addItemToLayout = () => {
    const itemSize = item.w * item.h;

    console.log(itemSize, emptySpace);

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
      <button type='button' className='toolbox__items__item' onClick={addItemToLayout}>
        {item.i}
      </button>
      <ModalPortal>
        {isModalOpened && <WarningModal message='공간을 확보해주세요.' closeEvent={closeModal} />}
      </ModalPortal>
    </div>
  );
};

export default ToolBoxItem;
