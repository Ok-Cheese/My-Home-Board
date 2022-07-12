import { Layout } from 'react-grid-layout';

import Time from './Plugins/Time';
import ClockPlugin from './Plugins/ClockPlugin';
import Setting from './Plugins/Setting';
import Weather from './Plugins/Weather';
import TodoList from './Plugins/TodoList';
import SearchBar from './Plugins/SearchBar';
import Bookmark from './Plugins/Bookmark';
import Dday from './Plugins/Dday';
import Github from './Plugins/Github';
import BoxOffice from './Plugins/BoxOffice';

export const getPlugin = (layout: Layout) => {
  let plugin;

  plugin = {
    search: SearchBar,
    bookmark: Bookmark,
    time: Time,
    clock: ClockPlugin,
    setting: Setting,
    weather: Weather,
    todoList: TodoList,
    dday: Dday,
    github: Github,
    boxOffice: BoxOffice,
  }[layout.i];

  if (!plugin) plugin = 'Unknown';

  return plugin;
};

export const hexToRgb = (hexType: string) => {
  const hex = hexType.trim().replace('#', '');
  const rgb = hex.length === 3 ? hex.match(/[a-f\d]/gi) : hex.match(/[a-f\d]{2}/gi);

  if (!rgb) return undefined;

  const converted: number[] = [];
  rgb.forEach((str: string) => {
    const hexValue = str.length === 1 ? str + str : str;
    converted.push(parseInt(hexValue, 16));
  });

  return `${converted.join(', ')}`;
};
