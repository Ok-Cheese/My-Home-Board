import { Layout } from 'react-grid-layout';

import ToolBoxItem from './ToolBoxItem';

import styles from './toolbox.module.scss';

interface IProps {
  items: Layout[];
}

const ToolBox = ({ items }: IProps) => {
  return (
    <div className={styles.toolbox}>
      {items.map((item) => (
        <ToolBoxItem key={item.i} item={item} />
      ))}
    </div>
  );
};

export default ToolBox;
