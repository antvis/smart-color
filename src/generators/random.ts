import { random } from 'lodash';
import { arrayToColor } from '../color/convertion';

export function randomColor() {
  const r = random(0, 255);
  const g = random(0, 255);
  const b = random(0, 255);
  return arrayToColor([r, g, b], 'rgb');
}
