import { Color } from '@antv/color-schema';
import { colorToArray } from '../../utils';

const compute = (num: number): number => {
  const n = num / 255;
  if (n <= 0.03928) {
    return n / 12.92;
  }
  return ((n + 0.055) / 1.055) ** 2.4;
};
const calcRelativeLuminance = (color: Color): number => {
  const [r, g, b] = colorToArray(color);
  return 0.2126 * compute(r) + 0.7152 * compute(g) + 0.0722 * compute(b);
};

// ref: https://www.w3.org/TR/WCAG21/#dfn-contrast-ratio
// Contrast ratios can range from 1 to 21 (commonly written 1:1 to 21:1).
export const contrastRatio = (color1: Color, color2: Color): number => {
  const L1 = calcRelativeLuminance(color1);
  const L2 = calcRelativeLuminance(color2);
  if (L2 > L1) {
    return (L2 + 0.05) / (L1 + 0.05);
  }
  return (L1 + 0.05) / (L2 + 0.05);
};
