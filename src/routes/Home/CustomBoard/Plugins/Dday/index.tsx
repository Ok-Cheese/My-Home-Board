import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { todolistState } from 'states/todolist';
import styles from './dday.module.scss';

interface IRemainTime {
  date: string;
  hour: string;
  min: string;
  sec: string;
  sign: '+' | '-';
}

interface ISchedule {
  title: string;
  deadline: dayjs.Dayjs;
}

const Dday = () => {
  const [remainTime, setRemainTime] = useState<IRemainTime[]>([]);
  const [schedules, setSchedules] = useState<ISchedule[]>([]);
  const todoList = useRecoilValue(todolistState);

  useEffect(() => {
    setSchedules(
      todoList
        .filter((item) => Boolean(item.deadline))
        .map((item) => {
          return { title: item.content, deadline: dayjs(item.deadline) };
        })
    );
  }, [todoList]);

  /* useEffect(() => {
    const interval = setInterval(() => {
      schedules.forEach((schedule, index) => {
        const today = dayjs();
        const expired = schedule.deadline;
        const newRemainTime: IRemainTime = {
          date: Math.abs(expired.diff(today, 'day')).toString(),
          hour: Math.abs(expired.diff(today, 'hour')).toString().padStart(2, '0'),
          min: Math.abs(expired.diff(today, 'minute') % 60)
            .toString()
            .padStart(2, '0'),
          sec: Math.abs(expired.diff(today, 'second') % 60)
            .toString()
            .padStart(2, '0'),
          sign: expired.diff(today, 'second') > 0 ? '-' : '+',
        };

        setRemainTime((prev) => {
          const newRemainTimes = prev.slice();
          prev.splice(index, 1, newRemainTime);

          return newRemainTimes;
        });
      });
    }, 1_000);

    return () => clearTimeout(interval);
  }, [schedules]); */

  console.log(remainTime.length);

  const ddays = schedules.map((schedule, index) => {
    return (
      <div key={schedule.title} className={styles.dday}>
        <p>{schedule.title}까지</p>
        {/* <p>{`D ${remainTime[index].sign} ${remainTime[index].date}`}</p>
        <p>{`${remainTime[index].sign} ${remainTime[index].hour}:${remainTime[index].min}:${remainTime[index].sec}`}</p> */}
      </div>
    );
  });

  const contents = schedules.length ? ddays : <p>Todo List를 먼저 추가해주세요.</p>;

  return <div className={styles.dday}>{contents}</div>;
};

export default Dday;
