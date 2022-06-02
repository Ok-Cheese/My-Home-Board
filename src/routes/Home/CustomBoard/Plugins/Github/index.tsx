import { VictoryAxis, VictoryChart, VictoryLine } from 'victory';
import axios from 'axios';
import dayjs from 'dayjs';

import { GitHubIcon } from 'assets/svgs';

import { testData } from './test_data';

import styles from 'github.module.scss';

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

  const eventData = testData
    .filter((el: any) => {
      const lastWeek = Number(dayjs().subtract(6, 'day').format('YYMMDD'));
      const eventDate = Number(dayjs(el.created_at.slice(0, 10)).format('YYMMDD'));

      return el.type === 'PushEvent' && lastWeek < eventDate;
    })
    .map((el: any) => {
      return {
        y: el.payload.size,
        x: dayjs(el.created_at).format('MMDD'),
      };
    })
    .reverse();

  console.log(eventData);

  const getMaxValue = () => {
    const maximum = Math.max(...eventData.map((el) => el.y));
    const unit = maximum.toString().length;
    const roundedUp = Math.ceil(maximum / unit) * unit;
    const adjustValue = [roundedUp, roundedUp / 2, roundedUp / 10].map((el) => el - maximum).filter((el) => el >= 0);

    return Math.min(...adjustValue);
  };

  const intervalValues = [0.2, 0.4, 0.6, 0.8, 1].map((el) => el * getMaxValue());

  return (
    <div>
      <div>
        <GitHubIcon />
        <h2>Github Events</h2>
      </div>
      <VictoryChart domainPadding={20}>
        <VictoryLine data={eventData} />
        <VictoryAxis tickCount={7} tickFormat={(x) => x} />
        <VictoryAxis dependentAxis tickValues={intervalValues} />
      </VictoryChart>
    </div>
  );
};

export default Github;
