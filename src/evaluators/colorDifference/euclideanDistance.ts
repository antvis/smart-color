import chroma from 'chroma-js';
import { Color, ColorModel } from '@antv/color-schema';
import { colorToChromaColor } from '../../utils';

// Computes the Euclidean distance between two colors in a given color model (default is Lab).
// output range: [0, 255]
export const euclideanDistance = (color1: Color, color2: Color, colorModel: ColorModel = 'lab'): number => {
  return chroma.distance(colorToChromaColor(color1), colorToChromaColor(color2), colorModel);
};
