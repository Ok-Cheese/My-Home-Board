import axios from 'axios';
import dayjs from 'dayjs';

const URL_DAILY = 'http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json';
const URL_WEEKLY = 'http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json';

interface IRankItem {
  rnum: string;
  rank: string;
  rankInten: string;
  rankOldAndNew: string;
  movieCd: string;
  movieNm: string;
  openDt: string;
  salesAmt: string;
  salesShare: string;
  salesInten: string;
  salesChange: string;
  salesAcc: string;
  audiCnt: string;
  audiInten: string;
  audiChange: string;
  audiAcc: string;
  scrnCnt: string;
  showCnt: string;
}

export const getBoxOffice = async (range: string) => {
  const baseUrl = range === 'daily' ? URL_DAILY : URL_WEEKLY;
  const targetDate = range === 'daily' ? dayjs(Date()).subtract(1, 'day') : dayjs(Date());
  const response = await axios.get(baseUrl, {
    params: {
      key: process.env.REACT_APP_BOXOFFICE_KEY,
      targetDt: targetDate.format('YYYYMMDD'),
      weekGb: range === 'daily' ? null : 0,
    },
  });

  const result: IRankItem[] = response.data.boxOfficeResult.dailyBoxOfficeList;
  return result.map((el) => {
    return { rank: el.rank, title: el.movieNm, rankInten: el.rankInten };
  });
};
