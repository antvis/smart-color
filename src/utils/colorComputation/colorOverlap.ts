import { ColorOverlap } from '@src/types';
import { colorToArray } from '../colorConversion';

// Alpha blending
// When a semi-transparent color that described by rgba(R₁, G₁, B₁, A₁) is overlapped on a solid color rgb(R₂, G₂, B₂), the resulting solid color of the alpha blending operation will be rgb(R₁A₁ + R₂(1-A₁), G₁A₁ + G₂(1-A₁), B₁A₁ + B₂(1-A₁))
// ref: stacked semi-transparent color https://stackoverflow.com/questions/50574524/color-of-stacked-semi-transparent-boxes-depends-on-order
export const colorOverlap: ColorOverlap = (colorTop, colorBottom) => {
  const [r1, g1, b1, a1] = colorToArray(colorTop, 'rgba') as [number, number, number, number];
  // if solid color
  if (a1 === 1) return colorTop;
  const [r2, g2, b2, a2] = colorToArray(colorBottom, 'rgba') as [number, number, number, number];
  const a = a1 + a2 * (1 - a1);
  const r = Math.round((r1 * a1 + r2 * a2 * (1 - a1)) / a);
  const g = Math.round((g1 * a1 + g2 * a2 * (1 - a1)) / a);
  const b = Math.round((b1 * a1 + b2 * a2 * (1 - a1)) / a);
  if (a === 1)
    return {
      model: 'rgb',
      value: { r, g, b },
    };
  return {
    model: 'rgba',
    value: { r, g, b, a },
  };
};
