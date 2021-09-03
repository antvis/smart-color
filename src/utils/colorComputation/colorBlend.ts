import { SEPARABLE_BLEND_MODES } from '../../constant';
import { SeparableBlendMode, NonSeparableBlendMode, ColorBlend } from '../../types';
import { arrayToColor, colorToArray } from '../colorConversion';

// ref: [wiki] https://en.wikipedia.org/wiki/Blend_modes
// ref: [photoshop] https://www.deepskycolors.com/archivo/2010/04/21/formulas-for-Photoshop-blending-modes.html
// ref: [photoshop] https://photoblogstop.com/photoshop/photoshop-blend-modes-explained
// ref: [w3c] https://www.w3.org/TR/compositing/#blending css mix-blend-mode: soft-light
type SeparableBlendFunc = (top: number, bottom: number) => number;
const multiply: SeparableBlendFunc = (top, bottom) => (top * bottom) / 255;
const screen: SeparableBlendFunc = (top, bottom) => top + bottom - (top * bottom) / 255;
const hardLight: SeparableBlendFunc = (top, bottom) =>
  top < 128 ? multiply(2 * top, bottom) : screen(2 * top - 255, bottom);
const separableBlendFunc: Record<SeparableBlendMode, SeparableBlendFunc> = {
  /** w3c */
  normal: (top) => top,
  darken: (top, bottom) => Math.min(top, bottom),
  multiply,
  colorBurn: (top, bottom) => {
    if (top === 0) return 0;
    return Math.max(0, 255 * (1 - (255 - bottom) / top));
  },
  lighten: (top, bottom) => Math.max(top, bottom),
  screen,
  colorDodge: (top, bottom) => {
    if (top === 255) return 255;
    return Math.min(255, 255 * (bottom / (255 - top)));
  },
  overlay: (top, bottom) => hardLight(bottom, top),
  softLight: (top, bottom) => {
    if (top < 128) {
      return bottom - (1 - (2 * top) / 255) * bottom * (1 - bottom / 255);
    }
    const D =
      bottom < 64 ? ((16 * (bottom / 255) - 12) * (bottom / 255) + 4) * (bottom / 255) : Math.sqrt(bottom / 255);
    return bottom + 255 * ((2 * top) / 255 - 1) * (D - bottom / 255);
  },
  hardLight,
  difference: (top, bottom) => Math.abs(top - bottom),
  exclusion: (top, bottom) => top + bottom - (2 * top * bottom) / 255,

  /** photoshop */
  linearBurn: (top, bottom) => Math.max(top + bottom - 255, 0),
  linearDodge: (top, bottom) => Math.min(255, top + bottom),
  linearLight: (top, bottom) => Math.max(bottom + 2 * top - 255, 0),
  vividLight: (top, bottom) =>
    top < 128 ? 255 * (1 - (1 - bottom / 255) / ((2 * top) / 255)) : 255 * (bottom / 2 / (255 - top)),
  pinLight: (top, bottom) => (top < 128 ? Math.min(bottom, 2 * top) : Math.max(bottom, 2 * top - 255)),
};

type RGBArr = [number, number, number];
type NonSeparableBlendFunc = (top: RGBArr, bottom: RGBArr) => RGBArr;

const lum = (rgb: RGBArr) => {
  return 0.3 * rgb[0] + 0.58 * rgb[1] + 0.11 * rgb[2];
};

const clipColor = (rgb: RGBArr): RGBArr => {
  const l = lum(rgb);
  const min = Math.min(...rgb);
  const max = Math.max(...rgb);
  let color = [...rgb];
  if (min < 0) {
    color = color.map((value) => l + ((value - l) * l) / (l - min));
  }
  if (max > 255) {
    color = color.map((value) => l + ((value - l) * (255 - l)) / (max - l));
  }
  return color as RGBArr;
};

const setLum = (rgb: RGBArr, l: number): RGBArr => {
  const d = l - lum(rgb);
  return clipColor(rgb.map((value) => value + d) as RGBArr);
};

const sat = (rgb: RGBArr) => {
  return Math.max(...rgb) - Math.min(...rgb);
};

const setSat = (rgb: RGBArr, s: number): RGBArr => {
  const arr = rgb.map((value, index) => ({ value, index }));
  arr.sort((a, b) => a.value - b.value);
  const minIndex = arr[0].index;
  const midIndex = arr[1].index;
  const maxIndex = arr[2].index;

  const color = [...rgb];
  if (color[maxIndex] > color[minIndex]) {
    color[midIndex] = ((color[midIndex] - color[minIndex]) * s) / (color[maxIndex] - color[minIndex]);
    color[maxIndex] = s;
  } else {
    color[midIndex] = 0;
    color[maxIndex] = 0;
  }
  color[minIndex] = 0;
  return color as RGBArr;
};

const nonSeparableBlendFunc: Record<NonSeparableBlendMode, NonSeparableBlendFunc> = {
  hue: (top, bottom) => setLum(setSat(top, sat(bottom)), lum(bottom)),
  saturation: (top, bottom) => setLum(setSat(bottom, sat(top)), lum(bottom)),
  color: (top, bottom) => setLum(top, lum(bottom)),
  luminosity: (top, bottom) => setLum(bottom, lum(top)),
};

export const colorBlend: ColorBlend = (colorTop, colorBottom, mode = 'normal') => {
  const rgb1 = colorToArray(colorTop);
  const rgb2 = colorToArray(colorBottom);

  let rgb;
  if (SEPARABLE_BLEND_MODES.includes(mode)) {
    const func = separableBlendFunc[mode];
    rgb = rgb1.map((num1, index) => Math.floor(func(num1, rgb2[index]))) as RGBArr;
  } else {
    rgb = nonSeparableBlendFunc[mode](rgb1, rgb2);
  }

  return arrayToColor(rgb, 'rgb');
};
