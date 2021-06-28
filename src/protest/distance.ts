import chroma from 'chroma-js';
import { colorToChromaColor } from '../color/convertion';
import { ColorDistance } from '../types';

export const colorDistance: ColorDistance = (color1, color2) => {
  return chroma.distance(colorToChromaColor(color1), colorToChromaColor(color2));
};
