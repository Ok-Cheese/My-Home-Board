import { useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useMount } from 'react-use';
import RGL, { Layout, WidthProvider } from 'react-grid-layout';

import { isEditModeAtom, layoutAtom, toolBoxAtom } from 'states/plugin';

import Block from './Block';
import ToolBox from './Toolbox';

import 'react-grid-layout/css/styles.css';

const ReactGridLayout = WidthProvider(RGL);

const COLUMNS = 10;
const rowHeight = window.outerHeight * 0.07;

const CustomBoard = () => {
  const [tempSavedLayout, setTempSavedLayout] = useState<Layout[]>([]);
  const [layoutState, setLayoutState] = useRecoilState<Layout[]>(layoutAtom);
  const [toolBoxState, setToolBoxState] = useRecoilState<Layout[]>(toolBoxAtom);
  const isEditMode = useRecoilValue(isEditModeAtom);

  useMount(() => setTempSavedLayout(layoutState));

  const changeStartHandler = (currentLayout: Layout[]) => {
    setTempSavedLayout(currentLayout);
  };

  const layoutChangeHandler = (currentLayout: Layout[]) => {
    setLayoutState(currentLayout);
  };

  const layoutStyle = {
    width: '90vw',
    height: '90vh',
    opacity: isEditMode ? 0.75 : 1,
  };

  const pluginList = useMemo(
    () =>
      layoutState.map((layout) => (
        <Block
          key={layout.i}
          layout={layout}
          isEditMode={isEditMode}
          setLayout={setLayoutState}
          setToolbox={setToolBoxState}
        />
      )),
    [isEditMode, layoutState, setLayoutState, setToolBoxState]
  );

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
