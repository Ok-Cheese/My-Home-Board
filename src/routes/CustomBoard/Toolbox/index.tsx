import ToolBoxItem from './ToolBoxItem';

import styles from './toolbox.module.scss';

interface IProps {
  items: any[];
}

const ToolBox = ({ items }: IProps) => {
  return (
    <div className={styles.toolbox}>
      <div>
        {items.map((item) => (
          <ToolBoxItem key={item.i} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ToolBox;
