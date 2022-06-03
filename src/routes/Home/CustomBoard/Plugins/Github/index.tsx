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
import dayjs from 'dayjs';

import { GitHubIcon } from 'assets/svgs';

import { testData } from './test_data';

import styles from './github.module.scss';
import {
  areaStyle,
  chartStyle,
  cursorLineStyle,
  labelStyle,
  TOOLTIP_FLYOUT_STYLE,
  TOOLTIP_STYLE,
  victoryEvent,
} from './chartStyles';

const Github = () => {
  /* axios
    .get('https://api.github.com/users/Ok-Cheese/events', {
      params: { per_page: 100 },
      headers: { Authorization: process.env.REACT_APP_GITHUB_TOKEN || '' },
    })
    .then((res) => {
      const filtered = res.data.filter((el: any) => {
        const lastWeek = Number(dayjs().subtract(7, 'day').format('YYMMDD'));
        const eventDate = Number(dayjs(el.created_at.slice(0, 10)).format('YYMMDD'));

        return lastWeek < eventDate;
      });
      console.log(filtered);
    }); */

  const convertGitHubData = (data: any, numOfDays: number) => {
    const justNumbers = Array(numOfDays)
      .fill(0)
      .map((el, i) => i);

    const lastWeek = justNumbers.map((num) => dayjs().subtract(num, 'day').format('MMDD')).reverse();

    const filteredData = data.filter((el: any) => {
      const eventDate = Number(dayjs(el.created_at.slice(0, 10)).format('MMDD'));

      return el.type === 'PushEvent' && Number(lastWeek[0]) <= eventDate;
    });

    const commits = Array(numOfDays).fill(0);

    filteredData.forEach((filtData: any) => {
      const eventDate = dayjs(filtData.created_at).format('MMDD');

      lastWeek.forEach((date, index) => {
        if (eventDate === date) {
          commits[index] += filtData.payload.size;
        }
      });
    });

    const resultData = commits.map((commit, index) => {
      return { x: lastWeek[index], y: commit };
    });

    return resultData;
  };

  const eventData = convertGitHubData(testData, 7);

  const getMaxValue = () => {
    const maximum = Math.max(...eventData.map((el) => el.y));
    const len = maximum.toString().length - 1;
    const unit = 10 ** len;
    const roundedUp = Math.ceil(maximum / unit) * unit;

    return roundedUp;
  };

  const intervalValues = [0.2, 0.4, 0.6, 0.8, 1].map((el) => Math.ceil(el * getMaxValue()));

  const VictoryVoronoiContainer = createContainer<VictoryVoronoiContainerProps, VictoryCursorContainerProps>(
    'voronoi',
    'cursor'
  );

  return (
    <div className={styles.github}>
      <div className={styles.title}>
        <GitHubIcon />
        <h2>Github commits</h2>
      </div>
      <VictoryChart
        domainPadding={10}
        {...chartStyle.size}
        theme={chartStyle.theme}
        containerComponent={<VictoryVoronoiContainer cursorComponent={<Line style={cursorLineStyle.style} />} />}
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
            <VictoryTooltip
              style={TOOLTIP_STYLE}
              flyoutStyle={TOOLTIP_FLYOUT_STYLE}
              flyoutWidth={100}
              dx={50}
              dy={50}
            />
          }
          events={[{ target: 'data', eventHandlers: { ...victoryEvent } }]}
        />
        <VictoryAxis tickCount={8} tickFormat={(x) => x} />
        <VictoryAxis dependentAxis tickValues={intervalValues} />
      </VictoryChart>
    </div>
  );
};

export default Github;
