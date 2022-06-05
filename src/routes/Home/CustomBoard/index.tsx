import RGL, { Layout, WidthProvider } from 'react-grid-layout';
import { useCallback, useEffect, useMemo, useState } from 'react';
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
import { isEditModeAtom, layoutAtom, toolBoxAtom } from 'states/plugin';
import { backgroundColorState } from 'states/color';
import Todolist from './Plugins/Todolist';
import ToolBox from './Toolbox';
import { cx } from 'styles';

const ReactGridLayout = WidthProvider(RGL);

const COLUMNS = 10;

const CustomBoard = () => {
  const [layoutState, setLayoutState] = useRecoilState<Layout[]>(layoutAtom);
  const [toolBoxState, setToolBoxState] = useRecoilState<Layout[]>(toolBoxAtom);
  const [isEditMode, setIsEditMode] = useRecoilState(isEditModeAtom);
  const [tempSavedLayout, setTempSavedLayout] = useState<Layout[]>([]);
  const bgColor = useRecoilValue(backgroundColorState);

  const rowHeight = window.outerHeight * 0.07;

  useMount(() => setTempSavedLayout(layoutState));

  const removePlugin = useCallback(
    (item: Layout) => {
      setLayoutState((prev) => [...prev.filter(({ i }) => i !== item.i)]);
      setToolBoxState((prev) => [...prev, item]);
    },
    [setLayoutState, setToolBoxState]
  );

  const dom = useMemo(
    () =>
      layoutState.map((lo) => {
        const plugin = {
          search: <SearchBar key={lo.i} />,
          github: <Github key={lo.i} />,
          bookmark: <Bookmarks key={lo.i} />,
          today: <Today key={lo.i} />,
          BOJ: <BOJ key={lo.i} />,
          setting: <Setting key={lo.i} />,
          todolist: <Todolist key={lo.i} />,
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
            {isEditMode && lo.i !== 'setting' && (
              <button type='button' className={styles.removeButton} onClick={() => removePlugin(lo)}>
                X
              </button>
            )}
          </div>
        );
      }),
    [bgColor, isEditMode, layoutState, removePlugin]
  );

  const layoutChangeHandler = (currentLayout: Layout[]) => {
    setLayoutState(currentLayout);
  };

  return (
    <div>
      {isEditMode && <ToolBox items={toolBoxState || []} />}
      <ReactGridLayout
        style={{
          width: '90vw',
          height: '90vh',
          opacity: isEditMode ? 0.75 : 1,
        }}
        cols={COLUMNS}
        isBounded
        isDraggable={isEditMode}
        isResizable={isEditMode}
        rowHeight={rowHeight}
        layout={layoutState}
        onLayoutChange={layoutChangeHandler}
      >
        {dom}
      </ReactGridLayout>
    </div>
  );
};

export default CustomBoard;
