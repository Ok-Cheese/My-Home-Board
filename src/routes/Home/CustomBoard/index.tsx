import RGL, { Layout, WidthProvider } from 'react-grid-layout';
import styles from './customBoard.module.scss';

import 'react-grid-layout/css/styles.css';
import { useEffect, useMemo, useState } from 'react';

const ReactGridLayout = WidthProvider(RGL);

const COLUMNS = 10;

const initialLayout: Layout[] = [
  { i: 'a', w: 8, h: 1, x: 0, y: 0, resizeHandles: ['se'] },
  { i: 'b', w: 2, h: 1, x: 8, y: 0, resizeHandles: ['se'] },
  { i: 'c', w: 7, h: 2, x: 0, y: 1, resizeHandles: ['se'] },
  { i: 'd', w: 3, h: 2, x: 7, y: 1, resizeHandles: ['se'] },
  { i: 'e', w: 3, h: 7, x: 0, y: 3, resizeHandles: ['se'] },
  { i: 'f', w: 7, h: 5, x: 3, y: 3, resizeHandles: ['se'] },
  { i: 'g', w: 7, h: 2, x: 3, y: 8, resizeHandles: ['se'] },
];

const CustomBoard = () => {
  const [tempSavedLayout, setTempSavedLayout] = useState<Layout[]>(initialLayout);
  const [layoutState, setLayoutState] = useState<Layout[]>(initialLayout);

  const rowHeight = window.outerHeight * 0.07;

  const dom = useMemo(() => {
    return layoutState.map((lo) => (
      <div key={lo.i} className={styles.block}>
        {lo.i}
      </div>
    ));
  }, [layoutState]);

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
    <ReactGridLayout
      className={styles.layout}
      style={{ background: '#aaaaaa', width: '90vw', height: '90vh' }}
      cols={COLUMNS}
      isBounded
      layout={layoutState}
      rowHeight={rowHeight}
    >
      {dom}
    </ReactGridLayout>
  );
};

export default CustomBoard;