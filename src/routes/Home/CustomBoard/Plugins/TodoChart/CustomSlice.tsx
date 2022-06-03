import { Slice } from 'victory';

const CustomSlice = (props: any) => {
  const { datum } = props;

  const endPoint = datum.legnth;

  return (
    <Slice
      {...props}
      sliceStartAngle={0}
      sliceEndAngle={datum.background ? 360 : endPoint}
      style={{ fill: datum.background ? '#ededed' : '#ffbf00' }}
    />
  );
};

export default CustomSlice;
