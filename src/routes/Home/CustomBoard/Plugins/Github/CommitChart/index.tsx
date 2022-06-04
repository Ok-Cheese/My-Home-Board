import {
  createContainer,
  Line,
  VictoryArea,
  VictoryAxis,
  VictoryChart,
  VictoryCursorContainerProps,
  VictoryLabel,
  VictoryScatter,
  VictoryTooltip,
  VictoryVoronoiContainerProps,
} from 'victory';

import {
  areaStyle,
  chartStyle,
  cursorLineStyle,
  labelStyle,
  TOOLTIP_FLYOUT_STYLE,
  TOOLTIP_STYLE,
  victoryEvent,
} from './config';
import { getMaxValue, convertGitHubData, intervalValues } from '../utils';
import { testData } from '../test_data';

const CommitChart = () => {
  const VoronoiContainer = createContainer<VictoryVoronoiContainerProps, VictoryCursorContainerProps>(
    'voronoi',
    'cursor'
  );

  const eventData = convertGitHubData(testData, 7);

  /* const yAxisValues = intervalValues.map((el) => Math.ceil(el * getMaxValue(eventData))); */

  return (
    <VictoryChart
      domainPadding={10}
      theme={chartStyle.theme}
      containerComponent={<VoronoiContainer cursorComponent={<Line style={cursorLineStyle.style} />} />}
    >
      <VictoryLabel text='Commits' {...labelStyle.position} style={labelStyle.style} />
      <VictoryArea data={eventData} interpolation='natural' animate={areaStyle.animation} />
      <VictoryScatter
        data={eventData}
        y={(datum) => datum.y}
        animate={{
          duration: 1000,
          easing: 'bounce',
        }}
        style={{ data: { fill: 'transparent' } }}
        labels={({ datum }) => `${datum.y} commits`}
        labelComponent={
          <VictoryTooltip style={TOOLTIP_STYLE} flyoutStyle={TOOLTIP_FLYOUT_STYLE} flyoutWidth={100} dx={50} dy={50} />
        }
        events={[{ target: 'data', eventHandlers: { ...victoryEvent } }]}
      />
      <VictoryAxis tickCount={8} tickFormat={(x) => x} />
      <VictoryAxis dependentAxis /* tickValues={yAxisValues} */ />
    </VictoryChart>
  );
};

export default CommitChart;
