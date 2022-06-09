import { useCallback, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useMount } from 'react-use';
import RGL, { Layout, WidthProvider } from 'react-grid-layout';

import { isEditModeAtom, layoutAtom, toolBoxAtom } from 'states/plugin';

import BOJ from './Plugins/BOJ';
import Time from './Plugins/Time';
import ClockPlugin from './Plugins/ClockPlugin';
import Setting from './Plugins/Setting';
import Weather from './Plugins/Weather';
import TodoList from './Plugins/TodoList';
import SearchBar from './Plugins/SearchBar';
import Bookmarks from './Plugins/Bookmarks';
import ToolBox from './Toolbox';

import styles from './customBoard.module.scss';
import 'react-grid-layout/css/styles.css';
import { CloseIcon } from 'assets/svgs';

const ReactGridLayout = WidthProvider(RGL);

const COLUMNS = 10;
const rowHeight = window.outerHeight * 0.07;

const CustomBoard = () => {
  const [, setTempSavedLayout] = useState<Layout[]>([]);
  const isEditMode = useRecoilValue(isEditModeAtom);
  const [layoutState, setLayoutState] = useRecoilState<Layout[]>(layoutAtom);
  const [toolBoxState, setToolBoxState] = useRecoilState<Layout[]>(toolBoxAtom);

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
      layoutState.map((layout) => {
        const plugin = {
          search: <SearchBar key={layout.i} />,
          bookmark: <Bookmarks key={layout.i} />,
          time: <Time key={layout.i} layout={layout} />,
          clock: <ClockPlugin key={layout.i} />,
          BOJ: <BOJ key={layout.i} />,
          setting: <Setting key={layout.i} />,
          weather: <Weather key={layout.i} layout={layout} />,
          todoList: <TodoList key={layout.i} />,
        }[layout.i];

        return (
          <div key={layout.i} className={styles.block}>
            {plugin || <span className={styles.name}>{layout.i}</span>}
            {isEditMode && layout.i !== 'setting' && (
              <button type='button' className={styles.removeButton} onClick={() => removePlugin(layout)}>
                <CloseIcon />
              </button>
            )}
          </div>
        );
      }),
    [isEditMode, layoutState, removePlugin]
  );

  const layoutChangeHandler = (currentLayout: Layout[]) => {
    setLayoutState(currentLayout);
  };

  return (
    <div>
      {isEditMode && <ToolBox items={toolBoxState || []} />}
      <ReactGridLayout
        style={{
          width: '80vw',
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
