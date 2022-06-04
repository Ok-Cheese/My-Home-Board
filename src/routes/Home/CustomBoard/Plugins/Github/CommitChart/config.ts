const COLORS = {
  AREA: 'url(#gradient)',
  AREA_LINE: '#8676ff',
  AXIS: '#383838',
  LABEL: '#8676ff',
  TICK_LABEL: '#b0b0b0',
  VORONOI_LABEL: '#383838',
  CURSOR_LINE: '#cfc8ff',
};

const chartStyle = {
  theme: {
    area: {
      style: {
        data: { fill: COLORS.AREA, stroke: COLORS.AREA_LINE, strokeWidth: 1.5 },
      },
    },
    axis: {
      style: {
        tickLabels: {
          fill: COLORS.TICK_LABEL,
          padding: 8,
        },
        grid: { stroke: 'none' },
        axis: { stroke: COLORS.AXIS },
      },
    },
    voronoi: {
      style: {
        labels: {
          padding: 15,
          fill: COLORS.VORONOI_LABEL,
          pointerEvents: 'none',
          fontWeight: 'bold',
        },
        flyout: {
          stroke: 'transparent',
          fill: 'transparent',
          pointerEvents: 'none',
        },
      },
    },
  },
};

const labelStyle = {
  position: {
    x: 345,
    y: 30,
  },

  style: {
    fill: COLORS.LABEL,
    fontSize: '16px',
    fontWeight: 'bold',
  },
};

const areaStyle = {
  animation: {
    duration: 2000,
    onLoad: { duration: 1500 },
  },
};

const cursorLineStyle = {
  style: {
    stroke: COLORS.CURSOR_LINE,
    strokeWidth: 2,
    strokeDasharray: '10 5',
  },
};

export { chartStyle, labelStyle, areaStyle, cursorLineStyle };

export const TOOLTIP_STYLE = { fill: '#ffffff', stroke: 'none', fontSize: 15, textAnchor: 'middle' };

export const TOOLTIP_FLYOUT_STYLE = { stroke: '#ffffff', fill: '#3a474e', strokeWidth: 0, margin: 10 };

export const victoryEvent = {
  onMouseOver: () => {
    return [
      {
        target: 'data',
        mutation: () => {
          return {
            size: 5,
            style: { fill: '#4fadf7', stroke: '#ffffff', strokeWidth: 3 },
          };
        },
      },
      {
        target: 'labels',
        mutation: () => ({ active: true }),
      },
    ];
  },
  onMouseOut: () => {
    return [
      {
        target: 'data',
        mutation: () => {},
      },
      {
        target: 'labels',
        mutation: () => ({ active: false }),
      },
    ];
  },
};
