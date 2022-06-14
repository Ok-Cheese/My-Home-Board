import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useMount } from 'react-use';
import RGL, { Layout, WidthProvider } from 'react-grid-layout';
import { cx } from 'styles';

import { hexToRgb } from './utils';
import { CloseIcon } from 'assets/svgs';
import { settingAtom } from 'states/settings';
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
import Dday from './Plugins/Dday';

import styles from './customBoard.module.scss';
import 'react-grid-layout/css/styles.css';

const ReactGridLayout = WidthProvider(RGL);

const COLUMNS = 10;
const rowHeight = window.outerHeight * 0.07;

const CustomBoard = () => {
  const [tempSavedLayout, setTempSavedLayout] = useState<Layout[]>([]);
  const isEditMode = useRecoilValue(isEditModeAtom);
  const [layoutState, setLayoutState] = useRecoilState<Layout[]>(layoutAtom);
  const [toolBoxState, setToolBoxState] = useRecoilState<Layout[]>(toolBoxAtom);

  const pluginSetting = useRecoilValue(settingAtom).plugin;

  const pluginStyle = useMemo(() => {
    return {
      background: `rgba(${hexToRgb(pluginSetting.color)}, ${pluginSetting.opacity / 100})`,
      color: `${pluginSetting.fontColor}`,
    };
  }, [pluginSetting]);

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
          <div key={layout.i} className={styles.block} style={pluginStyle}>
            <div className={cx(styles.plugins, { [styles.editMode]: isNonSettingPlugin })}>{plugin}</div>
            {isNonSettingPlugin && (
              <button type='button' className={styles.removeButton} onClick={() => removePlugin(layout)}>
                <CloseIcon />
              </button>
            )}
          </div>
        );
      }),
    [isEditMode, layoutState, pluginStyle, removePlugin]
  );

  const changeStartHandler = (currentLayout: Layout[]) => {
    setTempSavedLayout(currentLayout);
  };

  const layoutChangeHandler = (currentLayout: Layout[]) => {
    setLayoutState(currentLayout);
  };

  useEffect(() => {
    const isOverflowed = layoutState.find((layout) => layout.h + layout.y > 10);

    if (isOverflowed) {
      setLayoutState(tempSavedLayout);
    }
  }, [layoutState, setLayoutState, tempSavedLayout]);

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
        onDragStart={changeStartHandler}
        onResizeStart={changeStartHandler}
        onLayoutChange={layoutChangeHandler}
      >
        {dom}
      </ReactGridLayout>
    </div>
  );
};

export default CustomBoard;
