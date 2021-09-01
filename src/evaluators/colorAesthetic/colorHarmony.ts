import { Color } from '@antv/color-schema';
import { colorToArray, rad2deg, deg2rad } from '../../utils';

const Hab = (b: number, a: number) => {
  if (a === 0 && b === 0) return 0;
  const tmphp = rad2deg(Math.atan2(b, a));
  if (tmphp >= 0) return tmphp;
  return tmphp + 360;
};

// ref: Color Harmony for Image Indexing
// ref: A Study of Colour Harmony for Two-colour Combinations
// ref: https://last.hit.bme.hu/download/firtha/video/Colorimetry/Fairchild_M._Color_appearance_models__2005.pdf p79-81
export const colorHarmony = (color1: Color, color2: Color): number => {
  const [L1, a1, b1] = colorToArray(color1, 'lab');
  const [L2, a2, b2] = colorToArray(color2, 'lab');

  const Cab1 = Math.sqrt(a1 ** 2 + b1 ** 2);
  const Cab2 = Math.sqrt(a1 ** 2 + b1 ** 2);

  const Hab1 = Hab(b1, a1);
  const Hab2 = Hab(b2, a2);

  const dCab = Cab1 - Cab2;
  const dHab2 = (a1 - a2) ** 2 + (b1 - b2) ** 2 - dCab ** 2;

  const dC = Math.sqrt(dHab2 + (dCab / 1.46) ** 2);
  const HC = 0.04 + 0.53 * Math.tanh(0.8 - 0.045 * dC);

  const Lsum = L1 + L2;
  const HLsum = 0.28 + 0.54 * Math.tanh(-3.88 + 0.029 * Lsum);
  const HdL = 0.14 + 0.15 * Math.tanh(-2 + 0.2 * Math.abs(L1 - L2));
  const HL = HLsum + HdL;

  const EC1 = 0.5 + 0.5 * Math.tanh(-2 + 0.5 * Cab1);
  const EC2 = 0.5 + 0.5 * Math.tanh(-2 + 0.5 * Cab2);
  const HS1 = -0.08 - 0.14 * Math.sin(deg2rad(Hab1 + 50)) - 0.07 * Math.sin(deg2rad(2 * Hab1 + 90));
  const HS2 = -0.08 - 0.14 * Math.sin(deg2rad(Hab2 + 50)) - 0.07 * Math.sin(deg2rad(2 * Hab2 + 90));
  const EY1 = ((0.22 * L1 - 12.8) / 10) * Math.exp((90 - Hab1) / 10 - Math.exp((90 - Hab1) / 10));
  const EY2 = ((0.22 * L2 - 12.8) / 10) * Math.exp((90 - Hab2) / 10 - Math.exp((90 - Hab2) / 10));
  const HSY1 = EC1 * (HS1 + EY1);
  const HSY2 = EC2 * (HS2 + EY2);
  const HH = HSY1 + HSY2;

  return HC + HL + HH;
};
