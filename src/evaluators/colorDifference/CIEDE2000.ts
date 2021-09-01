import { Color } from '@antv/color-schema';
import { colorToArray, rad2deg, deg2rad } from '../../utils';

const hp = (x: number, y: number) => {
  const tmphp = rad2deg(Math.atan2(x, y));
  if (tmphp >= 0) return tmphp;
  return tmphp + 360;
};

// ref: https://en.wikipedia.org/wiki/Color_difference#CIEDE2000
// output range: [0, 100]
export const CIEDE2000 = (color1: Color, color2: Color): number => {
  // weight, usually unity
  const kL = 1;
  const kC = 1;
  const kH = 1;
  // Get L,a,b values for color
  const [L1, a1, b1] = colorToArray(color1, 'lab');
  const [L2, a2, b2] = colorToArray(color2, 'lab');

  const C1 = Math.sqrt(a1 ** 2 + b1 ** 2);
  const C2 = Math.sqrt(a2 ** 2 + b2 ** 2);
  const avgC = (C1 + C2) / 2;

  const p = 0.5 * (1 - Math.sqrt(avgC ** 7 / (avgC ** 7 + 25 ** 7)));
  const a1p = (1.0 + p) * a1;
  const a2p = (1.0 + p) * a2;

  const C1p = Math.sqrt(a1p ** 2 + b1 ** 2);
  const C2p = Math.sqrt(a2p ** 2 + b2 ** 2);

  const h1p = hp(b1, a1p);
  const h2p = hp(b2, a2p);

  const dLp = L2 - L1;
  const dCp = C2p - C1p;

  let dhp: number;
  if (Math.abs(h2p - h1p) <= 180) dhp = h2p - h1p;
  else if (h2p - h1p < -180) dhp = h2p - h1p + 360;
  else dhp = h2p - h1p - 360; // h2p - h1p > 180

  const dHp = 2 * Math.sqrt(C1p * C2p) * Math.sin(deg2rad(dhp) / 2.0);
  let avgHp: number;
  if (Math.abs(h1p - h2p) <= 180) avgHp = (h1p + h2p) / 2.0;
  else if (Math.abs(h1p - h2p) > 180 && h1p + h2p < 360) avgHp = (h1p + h2p + 360) / 2.0;
  else avgHp = (h1p + h2p - 360) / 2.0; // Math.abs(h1p - h2p) > 180 && h1p + h2p >= 360

  const avgL = (L1 + L2) / 2.0;
  const avgCp = (C1p + C2p) / 2.0;
  const T =
    1 -
    0.17 * Math.cos(deg2rad(avgHp - 30)) +
    0.24 * Math.cos(deg2rad(2 * avgHp)) +
    0.32 * Math.cos(deg2rad(3 * avgHp + 6)) -
    0.2 * Math.cos(deg2rad(4 * avgHp - 63));

  const SL = 1 + (0.015 * (avgL - 50) ** 2) / Math.sqrt(20 + (avgL - 50) ** 2);
  const SC = 1 + 0.045 * avgCp;
  const SH = 1 + 0.015 * avgCp * T;

  const RT =
    -2 *
    Math.sqrt(avgCp ** 7 / (avgCp ** 7 + 25.0 ** 7)) *
    Math.sin(deg2rad(60 * Math.exp(-(((avgHp - 275) / 25) ** 2))));

  const dE = Math.sqrt(
    (dLp / (SL * kL)) ** 2 +
      (dCp / (SC * kC)) ** 2 +
      (dHp / (SH * kH)) ** 2 +
      RT * (dCp / (SC * kC)) * (dHp / (SH * kH))
  );
  return dE;
};
