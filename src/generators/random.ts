import { arrayToColor, randomInt } from '../utils';

export function randomColor() {
  const r = randomInt(255);
  const g = randomInt(255);
  const b = randomInt(255);
  return arrayToColor([r, g, b], 'rgb');
}
