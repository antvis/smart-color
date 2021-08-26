import { Color, RGBAColor } from '@antv/color-schema';
import { colorToGray, invertGrayscale, colorSimulation } from '@src/index';

describe('grayscale', () => {
  const rgb: Color = {
    model: 'rgb',
    value: {
      r: 122,
      g: 12,
      b: 13,
    },
  };

  const rgba: Color = {
    model: 'rgba',
    value: {
      r: 122,
      g: 12,
      b: 13,
      a: 0.3,
    },
  };
  test('simulate color in gray scale', () => {
    const graycolor = colorSimulation(rgba, 'grayscale') as RGBAColor;
    const { r, g, b, a } = graycolor.value;
    expect(r).toBe(g);
    expect(g).toBe(b);
    expect(a).toBe(rgba.value.a);
  });

  test('invert color from gray scale value', () => {
    const grayscaleValue1 = 0.2;
    const newColor1 = invertGrayscale(grayscaleValue1, rgb);
    const calGrayscaleValue1 = colorToGray(newColor1) / 255;
    expect(Math.abs(calGrayscaleValue1 - grayscaleValue1)).toBeLessThan(0.01);

    const grayscaleValue2 = 0.8;
    const newColor2 = invertGrayscale(grayscaleValue2, rgba);
    const calGrayscaleValue2 = colorToGray(newColor2) / 255;
    expect(Math.abs(calGrayscaleValue2 - grayscaleValue2)).toBeLessThan(0.01);
  });
});
