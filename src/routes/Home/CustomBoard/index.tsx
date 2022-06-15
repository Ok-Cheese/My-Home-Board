import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useMount } from 'react-use';
import RGL, { Layout, WidthProvider } from 'react-grid-layout';
import { cx } from 'styles';

import { getPlugin, hexToRgb } from './utils';
import { CloseIcon } from 'assets/svgs';
import { settingAtom } from 'states/settings';
import { isEditModeAtom, layoutAtom, toolBoxAtom } from 'states/plugin';

import ToolBox from './Toolbox';

import styles from './customBoard.module.scss';
import 'react-grid-layout/css/styles.css';

const ReactGridLayout = WidthProvider(RGL);

const COLUMNS = 10;
const rowHeight = window.outerHeight * 0.07;

const CustomBoard = () => {
  const [tempSavedLayout, setTempSavedLayout] = useState<Layout[]>([]);
  const [layoutState, setLayoutState] = useRecoilState<Layout[]>(layoutAtom);
  const [toolBoxState, setToolBoxState] = useRecoilState<Layout[]>(toolBoxAtom);
  const isEditMode = useRecoilValue(isEditModeAtom);
  const pluginSetting = useRecoilValue(settingAtom).plugin;

  useMount(() => setTempSavedLayout(layoutState));

  const changeStartHandler = (currentLayout: Layout[]) => {
    setTempSavedLayout(currentLayout);
  };

  const layoutChangeHandler = (currentLayout: Layout[]) => {
    setLayoutState(currentLayout);
  };

  const removePlugin = useCallback(
    (item: Layout) => {
      setLayoutState((prev) => [...prev.filter(({ i }) => i !== item.i)]);
      setToolBoxState((prev) => [...prev, item]);
    },
    [setLayoutState, setToolBoxState]
  );

  const layoutStyle = {
    width: '80vw',
    height: '90vh',
    opacity: isEditMode ? 0.75 : 1,
  };

  const pluginStyle = useMemo(() => {
    return {
      background: `rgba(${hexToRgb(pluginSetting.color)}, ${pluginSetting.opacity / 100})`,
      color: `${pluginSetting.fontColor}`,
    };
  }, [pluginSetting]);

  const pluginList = useMemo(() => {
    return layoutState.map((layout) => {
      const Plugin = getPlugin(layout);
      const isNonSettingPlugin = isEditMode && layout.i !== 'setting';
      const removeButton = isNonSettingPlugin && (
        <button type='button' className={styles.removeButton} onClick={() => removePlugin(layout)}>
          <CloseIcon />
        </button>
      );

      return (
        <div key={layout.i} className={styles.block} style={pluginStyle}>
          <div className={cx(styles.plugins, { [styles.editMode]: isNonSettingPlugin })}>
            <Plugin layout={layout} />
          </div>
          {removeButton}
        </div>
      );
    });
  }, [isEditMode, layoutState, pluginStyle, removePlugin]);

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
        style={layoutStyle}
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
        {pluginList}
      </ReactGridLayout>
    </div>
  );
};

export default CustomBoard;
