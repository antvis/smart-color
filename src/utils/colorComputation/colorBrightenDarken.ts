import { ColorBrighten, ColorDarken } from '@src/types';
import { clamp } from '../helper';
import { colorToArray } from '../colorConversion';

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
