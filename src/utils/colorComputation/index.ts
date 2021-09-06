export { colorBlend } from './colorBlend';
export { colorBrighten, colorDarken } from './colorBrightenDarken';

export const hueOffset = (hue: number, dHue: number): number => {
  let newHue = (hue + dHue) % 360;
  if (newHue < 0) {
    newHue += 360;
  } else if (newHue >= 360) {
    newHue -= 360;
  }
  return newHue;
};
