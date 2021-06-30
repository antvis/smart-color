import { Color } from 'color-schema-test';
import { arrayToColor, colorToArray, colorToGray, grayToColor } from '../utils';
import { ColorSimulation } from '../types';

// get color in grayScale
export const grayScale: ColorSimulation = (color) => {
  const gray = colorToGray(color);
  const [, , , alpha = 1] = colorToArray(color, 'rgba');
  return grayToColor(gray, alpha);
};

// invert color from the gray scale value
// grayScaleValue: [0, 1]
export function invertGrayScale(grayScaleValue: number, color: Color): Color {
  const [, a, b] = colorToArray(color, 'lab');
  const [, , , alpha = 1] = colorToArray(color, 'rgba');
  const target = grayScaleValue * 100;

  let L = Math.round(target);
  let newGray = colorToGray(arrayToColor([L, a, b], 'lab'));
  let cnt = 25;

  while (Math.round(target) !== Math.round((newGray / 255) * 100) && cnt > 0) {
    if (target > (newGray / 255) * 100) {
      L += 1;
    } else {
      L -= 1;
    }
    cnt -= 1;
    newGray = colorToGray(arrayToColor([L, a, b], 'lab'));
  }
  if (Math.round(target) < Math.round((newGray / 255) * 100)) L -= 1;

  let newColor: Color;
  if (alpha === 1) {
    newColor = arrayToColor([L, a, b], 'lab');
  } else {
    const rgb = colorToArray(arrayToColor([L, a, b], 'lab'), 'rgb');
    newColor = arrayToColor([...rgb, alpha] as [number, number, number, number], 'rgba');
  }
  return { ...color, ...newColor };
}
