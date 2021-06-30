import { random, findIndex } from 'lodash';
import { Color } from 'color-schema-test';
import { colorToArray, arrayToColor, hueOffset } from '../utils';

const saturationRange: [number, number] = [0.3, 0.9];
const valueRange: [number, number] = [0.5, 1];
export const categoricalGenerationInHsv = (
  color: Color,
  dHue: number,
  count: number,
  colors: (Color | undefined)[] = []
) => {
  const [h] = colorToArray(color, 'hsv');
  const locked = new Array(count).fill(false);
  let placeBasicColor = findIndex(colors, { model: color.model, value: color.value }) === -1;
  const newColors = new Array(count).fill(0).map((d, i): Color => {
    const lockedColor = colors[i];
    if (lockedColor) {
      locked[i] = true;
      return lockedColor;
    }
    if (placeBasicColor) {
      placeBasicColor = false;
      locked[i] = true;
      return color;
    }
    return arrayToColor([hueOffset(h, dHue * i), random(...saturationRange), random(...valueRange)], 'hsv');
  });
  return {
    newColors,
    locked,
  };
};
