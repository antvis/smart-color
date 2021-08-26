import { DiscreteScalePalette } from '@antv/color-schema';
import { colorToArray, arrayToColor, hueOffset } from '../utils';
import { Generation } from './types';

// generate sequential palette by analogous scheme
export const analogousGeneration: Generation = (configuration) => {
  const { count, color, tendency } = configuration;

  const isTint = tendency === 'tint';
  const [hue, saturation, value] = colorToArray(color, 'hsv');
  const index = Math.floor(count / 2);
  // Ref: Ant Design 3.x palette algorithm https://zhuanlan.zhihu.com/p/32422584
  let dHue = 60 / (count - 1);
  if (hue >= 60 && hue <= 240) {
    // cool undertone
    dHue = -dHue;
  }
  const dSaturation = (saturation - 0.1) / 3 / (count - index - 1);
  const dValue = (value - 0.4) / 3 / index;
  const newColors = new Array(count).fill(0).map((d, i) => {
    const h = hueOffset(hue, dHue * (i - index));
    const s =
      i <= index ? Math.min(saturation + dSaturation * (index - i), 1) : saturation + 3 * dSaturation * (index - i);
    const v = i <= index ? value - 3 * dValue * (index - i) : Math.min(value - dValue * (index - i), 1);
    return arrayToColor([h, s, v], 'hsv');
  });
  const palette: DiscreteScalePalette = {
    name: 'analogous',
    semantic: null,
    type: 'discrete-scale',
    colors: isTint ? newColors : newColors.reverse(),
  };
  return palette;
};
