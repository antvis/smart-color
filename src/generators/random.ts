import { randomBetween } from '../utils';

export function randomColor() {
  const r = randomBetween(0, 255);
  const g = randomBetween(0, 255);
  const b = randomBetween(0, 255);
  return { r, g, b };
}
