import { useMemo } from 'react';
import { Layout } from 'react-grid-layout';
import { useRecoilState } from 'recoil';
import { layoutAtom, toolBoxAtom } from 'states/plugin';

interface IProps {
  item: Layout;
}

const ToolBoxItem = ({ item }: IProps) => {
  const [layoutState, setLayoutState] = useRecoilState<Layout[]>(layoutAtom);
  const [toolBoxState, setToolBoxState] = useRecoilState<Layout[]>(toolBoxAtom);

  const emptySpace = useMemo(() => {
    return layoutState.reduce((acc, layout) => {
      return acc - layout.w * layout.h;
    }, 100);
  }, [layoutState]);

  const addItemToLayout = () => {
    const itemSize = item.w * item.h;

    if (itemSize > emptySpace) return;

    setToolBoxState((prev) => [...prev.filter(({ i }) => i !== item.i)]);
    setLayoutState((prev) => [...prev, item]);
  };

  return (
    <button type='button' className='toolbox__items__item' onClick={addItemToLayout}>
      {item.i}
    </button>
  );
};

export default ToolBoxItem;
