import { Color } from '@antv/color-schema';
import { colorToArray } from '../../../utils';
import { LAB_TO_COOLNESS } from './LAB_TO_COOLNESS';

// ref: Colorgorical:Creating discriminable and preferable color palettes for information visualization
// https://github.com/connorgr/colorgorical/blob/90649656a57ce9743b00390473adce51a821cadc/src/model/c/scores/pairPreference.c

// hue, lightness, and coolness weights taken from regression in Schloss & Palmer 2011 to estimate pairwise preference
const wH = -46.42; // hueAngleDiff weight
const wL = 47.61; // lightnessDiff weight
const wC = 75.15; // coolness weight

// These min and max values are taken from the regression normalization
// Need to normalize based on these to verify the variables are on same range
const cMax = 36.0;
const cMin = 4.0;
const hMax = 179.266981384;
const hMin = 0.033547949;
const lMax = 63.3673;
const lMin = 0.0;

const normalize = (d: number, high: number, low: number): number => {
  return (d - low) / (high - low);
};

const getLabIndex = (L: number, a: number, b: number): number => {
  // L = [0,100]; a = [-85, 100]; b = [-110, 95]
  const iL = Math.round(L / 5);
  const ia = Math.round((a + 85) / 5);
  const ib = Math.round((b + 110) / 5);
  return iL * 1596 + ia * 42 + ib;
};
const getCoolness = (L: number, a: number, b: number): number => {
  const index = getLabIndex(L, a, b);
  return LAB_TO_COOLNESS[index] || 0;
};

// Calculate the scalar needed to convert an XYZ color to Lab
const XYZtoLab = (t: number): number => {
  if (t > (6.0 / 29.0) ** 3) {
    return t ** (1.0 / 3.0);
  }
  return (1.0 / 3.0) * (29.0 / 6.0) * (29.0 / 6.0) * t + 4.0 / 29.0;
};
// Calculate the scalar needed to convert an Lab color to XYZ.
const LabToXYZ = (t: number) => {
  return t > 6.0 / 29.0 ? t * t * t : 3.0 * (6.0 / 29) * (6.0 / 29) * (t - 4.0 / 29.0);
};
// Calculate the LCH cyllindrical color representation of an Lab color
const LabToLCH = (L: number, a: number, b: number): number[] => {
  const C = Math.sqrt(a * a + b * b);
  let H = (Math.atan2(b, a) * 180.0) / Math.PI;
  if (H < 0.0) H += 360.0;
  if (H > 360.0) H = 360.0 - H;
  return [L, C, H];
};
// Convert CIE Lab coordinates characterized with Illuminant D65 to CIE Lab
// characterized with Illuminant C. This conversion is required since our model
// relies on a D65 characterization, but Schloss and Palmer's pair preference
// function was defined in Illuminant C characterized CIE Lab space.
const illuminantD65LabToIlluminantCLab = (oldL: number, oldA: number, oldB: number): number[] => {
  const ILLUMINANT_C_X = 98.074;
  const ILLUMINANT_C_Y = 100.0;
  const ILLUMINANT_C_Z = 118.232;

  const ILLUMINANT_D65_X = 95.047;
  const ILLUMINANT_D65_Y = 100.0;
  const ILLUMINANT_D65_Z = 108.883;

  // Derive X,Y,Z from Lab by inversing the transformation
  const x = (1.0 / 116.0) * (oldL + 16) + (1.0 / 500.0) * oldA;
  const y = (1.0 / 116.0) * (oldL + 16);
  const z = (1 / 116) * (oldL + 16) - (1 / 200) * oldB;

  const X = ILLUMINANT_D65_X * LabToXYZ(x);
  const Y = ILLUMINANT_D65_Y * LabToXYZ(y);
  const Z = ILLUMINANT_D65_Z * LabToXYZ(z);

  const deconstructY = XYZtoLab(Y / ILLUMINANT_C_Y);
  const L = 116 * deconstructY - 16;
  const a = 500 * (XYZtoLab(X / ILLUMINANT_C_X) - deconstructY);
  const b = 200 * (deconstructY - XYZtoLab(Z / ILLUMINANT_C_Z));

  return [L, a, b];
};

export const pairPreference = (color1: Color, color2: Color): number => {
  const [L1, a1, b1] = colorToArray(color1, 'lab');
  const [L2, a2, b2] = colorToArray(color2, 'lab');
  const coolness1 = getCoolness(L1, a1, b1);
  const coolness2 = getCoolness(L2, a2, b2);

  // Convert from D65 to Illuminant C Lab
  const Lab1 = illuminantD65LabToIlluminantCLab(L1, a1, b1);
  const Lab2 = illuminantD65LabToIlluminantCLab(L2, a2, b2);
  // Convert Lab Illuminant C to LCH
  const lCH1 = LabToLCH(Lab1[0], Lab1[1], Lab1[2]);
  const lCH2 = LabToLCH(Lab2[0], Lab2[1], Lab2[2]);

  const diffL = Math.abs(lCH1[0] - lCH2[0]);
  const diffH = Math.abs(lCH1[2] - lCH2[2]);
  const sumC = coolness1 + coolness2;

  const pp = wL * normalize(diffL, lMax, lMin) + wH * normalize(diffH, hMax, hMin) + wC * normalize(sumC, cMax, cMin);
  return pp;
};
