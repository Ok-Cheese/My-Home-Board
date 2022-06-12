import { useCallback, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useMount } from 'react-use';
import RGL, { Layout, WidthProvider } from 'react-grid-layout';
import { cx } from 'styles';

import { CloseIcon } from 'assets/svgs';
import { isEditModeAtom, layoutAtom, toolBoxAtom } from 'states/plugin';

import BOJ from './Plugins/BOJ';
import Time from './Plugins/Time';
import ClockPlugin from './Plugins/ClockPlugin';
import Setting from './Plugins/Setting';
import Weather from './Plugins/Weather';
import TodoList from './Plugins/TodoList';
import SearchBar from './Plugins/SearchBar';
import Bookmark from './Plugins/Bookmark';
import ToolBox from './Toolbox';

import styles from './customBoard.module.scss';
import 'react-grid-layout/css/styles.css';
import Dday from './Plugins/Dday';

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
          bookmark: <Bookmark key={layout.i} layout={layout} />,
          time: <Time key={layout.i} layout={layout} />,
          clock: <ClockPlugin key={layout.i} />,
          BOJ: <BOJ key={layout.i} layout={layout} />,
          setting: <Setting key={layout.i} />,
          weather: <Weather key={layout.i} layout={layout} />,
          todoList: <TodoList key={layout.i} />,
          dday: <Dday key={layout.i} layout={layout} />,
        }[layout.i];

        const isNonSettingPlugin = isEditMode && layout.i !== 'setting';

        return (
          <div key={layout.i} className={styles.block}>
            <div className={cx(styles.plugins, { [styles.editMode]: isNonSettingPlugin })}>
              {plugin}
              {isNonSettingPlugin && (
                <button type='button' className={styles.removeButton} onClick={() => removePlugin(layout)}>
                  <CloseIcon />
                </button>
              )}
            </div>
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
