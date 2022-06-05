import { atom } from 'recoil';
import store from 'store';

interface IColorPicker {
  gradientAngle: number;
  gradientPoint: number;
  opacity: number;
  firstColor: string;
  secondColor: string;
}

const savedColorState = store.get('backgroundColor');

export const backgroundColorState = atom<IColorPicker>({
  key: '#backgroundColorState',
  default: {
    gradientAngle: savedColorState ? savedColorState.gradientAngle : 0,
    gradientPoint: savedColorState ? savedColorState.gradientPoint : 0,
    firstColor: savedColorState ? savedColorState.firstColor : '#bbdfff',
    secondColor: savedColorState ? savedColorState.secondColor : '#bbdfff',
    opacity: 1,
  },
});
