import { atom } from 'recoil';
import store from 'store';

const savedColorState = store.get('backgroundColor');

interface IColorPicker {
  gradientAngle: number;
  gradientPoint: number;
  opacity: number;
  firstColor: string;
  secondColor: string;
}

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
