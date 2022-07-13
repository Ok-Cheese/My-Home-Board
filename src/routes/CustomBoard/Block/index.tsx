import { useMemo, useCallback, forwardRef, ReactNode } from 'react';
import { SetterOrUpdater, useRecoilValue } from 'recoil';
import { Layout } from 'react-grid-layout';
import { cx } from 'styles';

import { getPlugin, hexToRgb } from '../utils';
import { CloseIcon } from 'assets/svgs';
import { settingAtom } from 'states/settings';

import Icon from 'components/Icon';

import styles from './block.module.scss';

interface IProps {
  layout: Layout;
  isEditMode: boolean;
  setLayout: SetterOrUpdater<Layout[]>;
  setToolbox: SetterOrUpdater<Layout[]>;
  style?: { [x: string]: string };
  className?: string;
  children?: ReactNode[];
}

const Block = ({ layout, isEditMode, setLayout, setToolbox, style, className, children }: IProps, ref: any) => {
  const settings = useRecoilValue(settingAtom);

  const blockStyle = useMemo(() => {
    return {
      background: `rgba(${hexToRgb(settings.plugin.color)}, ${settings.plugin.opacity / 100})`,
      color: `${settings.plugin.fontColor}`,
    };
  }, [settings.plugin]);

  const removePlugin = useCallback(() => {
    setLayout((prev) => [...prev.filter(({ i }) => i !== layout.i)]);
    setToolbox((prev) => [...prev, layout]);
  }, [layout, setLayout, setToolbox]);

  const Plugin = getPlugin(layout);
  return (
    <div key={layout.i} className={cx(styles.block, className)} style={{ ...style, ...blockStyle }} ref={ref}>
      <div className={cx(styles.plugins, { [styles.unclickable]: isEditMode })}>
        <Plugin layout={layout} />
      </div>
      {isEditMode && (
        <Icon position={{ top: '0', left: '100%' }} onClick={removePlugin}>
          <CloseIcon />
        </Icon>
      )}
      {children}
    </div>
  );
};

Block.displayName = 'Block';

const forwordRefItem = forwardRef(Block);
export default forwordRefItem;
