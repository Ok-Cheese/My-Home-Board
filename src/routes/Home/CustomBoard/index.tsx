import RGL, { Layout, WidthProvider } from 'react-grid-layout';
import { useEffect, useMemo, useState } from 'react';
import { useMount } from 'react-use';

import SearchBar from './Plugins/SearchBar';
import Github from './Plugins/Github';

import styles from './customBoard.module.scss';
import 'react-grid-layout/css/styles.css';
import Bookmarks from './Plugins/Bookmarks';
import BOJ from './Plugins/BOJ';
import Today from './Plugins/Today';
import Setting from './Plugins/Setting';
import { useRecoilState, useRecoilValue } from 'recoil';
import { backgroundColorState, blockColorState, isEditModeAtom, layoutAtom, toolBoxAtom } from 'states/plugin';
import Todolist from './Plugins/Todolist';
import TodoChart from './Plugins/TodoChart';
import Dday from './Plugins/Dday';
import ToolBox from './Toolbox';

const ReactGridLayout = WidthProvider(RGL);

const COLUMNS = 10;

const CustomBoard = () => {
  const [layoutState, setLayoutState] = useRecoilState<Layout[]>(layoutAtom);
  const [toolBoxState, setToolBoxState] = useRecoilState<Layout[]>(toolBoxAtom);
  const [isEditMode, setIsEditMode] = useRecoilState(isEditModeAtom);
  const [tempSavedLayout, setTempSavedLayout] = useState<Layout[]>([]);
  const blockColor = useRecoilValue(blockColorState);
  const bgColor = useRecoilValue(backgroundColorState);

  const rowHeight = window.outerHeight * 0.07;

  useMount(() => setTempSavedLayout(layoutState));

  const removePlugin = (item: Layout) => {
    setLayoutState((prev) => [...prev.filter(({ i }) => i !== item.i)]);
    setToolBoxState((prev) => [...prev, item]);
  };

  const dom = useMemo(
    () =>
      layoutState.map((lo) => {
        const plugin = {
          search: <SearchBar key={lo.i} />,
          github: <Github key={lo.i} />,
          bookmark: <Bookmarks key={lo.i} />,
          today: <Today />,
          BOJ: <BOJ />,
          setting: <Setting />,
          todolist: <Todolist />,
          todoChart: <TodoChart />,
          dday: <Dday />,
        }[lo.i];

        return (
          <div
            key={lo.i}
            className={styles.block}
            style={{
              background: `linear-gradient(${bgColor.gradientAngle}deg, ${bgColor.firstColor} 0%, ${bgColor.secondColor} ${bgColor.gradientPoint}%)`,
            }}
          >
            {plugin || lo.i}
            {isEditMode && (
              <button type='button' onClick={() => removePlugin(lo)}>
                X
              </button>
            )}
          </div>
        );
      }),
    [layoutState]
  );

  /* const editLayoutHandler = (currentLayout: Layout[]) => {
    setTempSavedLayout(currentLayout);
  };

  useEffect(() => {
    console.log(tempSavedLayout);
  }, [tempSavedLayout]);

  const layoutChangeHandler = (currentLayout: Layout[]) => {
    const overflowedLayout = currentLayout.filter((layout) => layout.h + layout.y > COLUMNS);

    console.log(overflowedLayout);

    if (overflowedLayout.length) {
      setLayoutState(tempSavedLayout);
      return;
    }

    console.log(2);
    setLayoutState(currentLayout);
    setTempSavedLayout(currentLayout);
  };

  

  useEffect(() => {
    console.log(layoutState);
    const overflowedLayout = layoutState.filter((layout) => layout.h + layout.y > COLUMNS);

    console.log(overflowedLayout);
  }, [layoutState]); */

  return (
    <div>
      <ToolBox items={toolBoxState || []} />
      <ReactGridLayout
        className={styles.layout}
        style={{ background: '#aaaaaa', width: '90vw', height: '90vh' }}
        cols={COLUMNS}
        isBounded
        isDraggable={false}
        layout={layoutState}
        rowHeight={rowHeight}
      >
        {dom}
      </ReactGridLayout>
    </div>
  );
};

export default CustomBoard;
