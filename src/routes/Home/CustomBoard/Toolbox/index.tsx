import styles from './toolbox.module.scss';
import ToolBoxItem from './ToolBoxItem';

interface IProps {
  items: any[];
}

const ToolBox = ({ items }: IProps) => {
  return (
    <div className={styles.toolbox}>
      <span className='toolbox__title'>Toolbox</span>
      <div className='toolbox__items'>
        {items.map((item) => (
          <ToolBoxItem key={item.i} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ToolBox;
