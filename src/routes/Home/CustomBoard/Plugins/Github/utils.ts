import axios from 'axios';
import dayjs from 'dayjs';

export interface IEventData {
  x: string;
  y: number;
}

export const getMaxValue = (data: IEventData[]) => {
  const maximum = Math.max(...data.map((el) => el.y));
  const len = maximum.toString().length - 1;
  const unit = 10 ** len;
  const roundedUp = Math.ceil(maximum / unit) * unit;

  return roundedUp;
};

export const convertGitHubData = (data: any, numOfDays: number) => {
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

export const intervalValues = [0.2, 0.4, 0.6, 0.8, 1];

export const getGithubData = (id: string) => {
  return axios.get(`https://api.github.com/users/${id}/events`, {
    params: { per_page: 100 },
    headers: { Authorization: process.env.REACT_APP_GITHUB_TOKEN || '' },
  });
};
