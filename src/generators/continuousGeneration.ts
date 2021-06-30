import { random } from 'lodash';
import { Color } from 'color-schema-test';
import { colorToArray, arrayToColor } from '../utils';

// Fix a, b, vary L
export const continuousGenerationInLab = (
  color: Color,
  count: number,
  lRange: [number, number] = [random(5, 10), random(90, 95)]
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
