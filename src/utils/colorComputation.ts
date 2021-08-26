import { ColorBrighten, ColorDarken, ColorOverlap } from '@src/types';
import { clamp } from './helper';
import { colorToArray } from './colorConversion';

export const hueOffset = (hue: number, dHue: number): number => {
  let newHue = (hue + dHue) % 360;
  if (newHue < 0) {
    newHue += 360;
  } else if (newHue >= 360) {
    newHue -= 360;
  }
  return newHue;
};

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

// get darken/brighten color
// ref: https://zhuanlan.zhihu.com/p/32422584
const hueStep = 2;
const saturationStep = 0.16;
const saturationStep2 = 0.05;
const brightnessStep1 = 0.05;
const brightnessStep2 = 0.15;
const lightColorCount = 5;
const darkColorCount = 4;

const getHue = (h: number, i: number, isLight: boolean): number => {
  let hue;
  if (h >= 60 && h <= 240) {
    hue = isLight ? h - hueStep * i : h + hueStep * i;
  } else {
    hue = isLight ? h + hueStep * i : h - hueStep * i;
  }
  if (hue < 0) {
    hue += 360;
  } else if (hue >= 360) {
    hue -= 360;
  }
  return Math.round(hue);
};
const getSaturation = (s: number, i: number, isLight: boolean): number => {
  let saturation;
  if (isLight) {
    saturation = s - saturationStep * i;
  } else if (i === darkColorCount) {
    saturation = s + saturationStep;
  } else {
    saturation = s + saturationStep2 * i;
  }
  if (isLight && i === lightColorCount && saturation > 0.1) {
    saturation = 0.1;
  }
  saturation = clamp(saturation, 0.06, 1);
  return Number(saturation.toFixed(2));
};
const getValue = (v: number, i: number, isLight: boolean): number => {
  let value;
  if (isLight) {
    value = v + brightnessStep1 * i;
  } else {
    value = v - brightnessStep2 * i;
  }
  value = clamp(value, 0, 1);
  return Number(value.toFixed(2));
};

export const colorDarken: ColorDarken = (color, value = 1) => {
  const [h, s, v] = colorToArray(color, 'hsv');
  return {
    model: 'hsv',
    value: {
      h: getHue(h, value, false),
      s: getSaturation(s, value, false),
      v: getValue(v, value, false),
    },
  };
};

export const colorBrighten: ColorBrighten = (color, value = 1) => {
  const [h, s, v] = colorToArray(color, 'hsv');
  return {
    model: 'hsv',
    value: {
      h: getHue(h, value, true),
      s: getSaturation(s, value, true),
      v: getValue(v, value, true),
    },
  };
};
