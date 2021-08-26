import { Color } from '@antv/color-schema';
import { colorToArray, arrayToColor, randomInt } from '../utils';

// Fix a, b, vary L
export const discreteScaleGenerationInLab = (
  color: Color,
  count: number,
  lRange: [number, number] = [randomInt(5, 10), randomInt(90, 95)]
): Color[] => {
  const [L, a, b] = colorToArray(color, 'lab');
  const minL = L <= 15 ? L : lRange[0];
  const maxL = L >= 85 ? L : lRange[1];
  let dLightness = (maxL - minL) / (count - 1);
  // basic color index
  const index = Math.ceil((L - minL) / dLightness);
  dLightness = index === 0 ? dLightness : (L - minL) / index;
  return new Array(count).fill(0).map((d, i) => arrayToColor([dLightness * i + minL, a, b], 'lab'));
};
