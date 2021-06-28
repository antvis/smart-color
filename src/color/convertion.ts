import { Color, ColorSpace } from 'color-schema-test';
import chroma, { Color as ChromaColor } from 'chroma-js';

const isChromaColor = (color: any): color is ChromaColor => {
  if (chroma.valid(color)) {
    return true;
  }
  return false;
};

// Convert color to chroma color
export const colorToChromaColor = (color: Color): ChromaColor => {
  const { value } = color;
  if (isChromaColor(value)) {
    return chroma(value);
  }
  return chroma('#000');
};

// Convert color to an array in a specific color space
export const colorToArray = (
  color: Color,
  colorSpace: ColorSpace
): [number, number, number] | [number, number, number, number] => {
  const chromaColor = colorToChromaColor(color);
  if (chromaColor) {
    return chromaColor[colorSpace]();
  }
  return [0, 0, 0];
};
// Convert an array in a specific color space to color
export const arrayToColor = (
  array: [number] | [number, number, number] | [number, number, number, number],
  colorSpace: ColorSpace
): Color => {
  const value = {};
  if (array.length === 1) {
    const [v] = array;
    for (let i = 0; i < colorSpace.length; i += 1) {
      value[colorSpace[i]] = v;
    }
  } else {
    for (let i = 0; i < colorSpace.length; i += 1) {
      value[colorSpace[i]] = array[i];
    }
  }
  return {
    space: colorSpace,
    value,
  } as Color;
};

// Convert color to gray value
export function colorToGray(color: Color): number {
  const [r, g, b] = colorToArray(color, 'rgb'); // [red, green, blue]
  // Ref:https://tannerhelland.com/2011/10/01/grayscale-image-algorithm-vb6.html
  const gray = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
  // gray value: [0, 255]
  return gray;
}
// Convert gray value to color
export function grayToColor(gray: number, alpha: number = 1): Color {
  return {
    space: 'rgba',
    value: {
      r: gray,
      g: gray,
      b: gray,
      a: alpha,
    },
  };
}

export { colorToHex } from 'color-schema-test';
export function hexToColor(hexValue: string): Color {
  if (/^(#|0x)?[0-9a-fA-F]{3}/.test(hexValue) || /^(#|0x)?[0-9a-fA-F]{6}/.test(hexValue)) {
    const rgb = chroma(hexValue).rgb();
    return arrayToColor(rgb, 'rgb');
  }
  if (/^(#|0x)?[0-9a-fA-F]{4}/.test(hexValue) || /^(#|0x)?[0-9a-fA-F]{8}/.test(hexValue)) {
    const rgba = chroma(hexValue).rgba();
    return arrayToColor(rgba, 'rgba');
  }
  return {
    space: 'rgb',
    value: { r: 0, g: 0, b: 0 },
  };
}
