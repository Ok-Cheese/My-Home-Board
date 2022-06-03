import { useRecoilValue } from 'recoil';
import { todolistState } from 'states/todolist';
import { VictoryPie } from 'victory';

import CustomSlice from './CustomSlice';

const TodoChart = () => {
  const todolist = useRecoilValue(todolistState);

  const completed = todolist.reduce((acc, elem) => {
    if (elem.complete) return acc + 1;
    return acc;
  }, 0);

  const todoData = [
    {
      y: completed,
    },
    {
      y: todolist.length - completed,
      background: true,
    },
  ];

  console.log(todolist);

  return (
    <VictoryPie
      data={todoData}
      startAngle={0}
      endAngle={360}
      labels={() => null}
      innerRadius={120}
      dataComponent={<CustomSlice length={todolist.length} />}
      animate={{ duration: 1000, easing: 'bounce' }}
    />
  );
};

export default TodoChart;
