import { Color, RGBAColor } from 'color-schema-test';
import { colorToGray, invertGrayScale, colorSimulation } from '@src/index';

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
    const graycolor = colorSimulation(rgba, 'grayScale') as RGBAColor;
    const { r, g, b, a } = graycolor.value;
    expect(r).toBe(g);
    expect(g).toBe(b);
    expect(a).toBe(rgba.value.a);
  });

  test('invert color from gray scale value', () => {
    const grayScaleValue1 = 0.2;
    const newcolor1 = invertGrayScale(grayScaleValue1, rgb);
    const calGrayScaleValue1 = colorToGray(newcolor1) / 255;
    expect(Math.abs(calGrayScaleValue1 - grayScaleValue1)).toBeLessThan(0.01);

    const grayScaleValue2 = 0.8;
    const newcolor2 = invertGrayScale(grayScaleValue2, rgba);
    const calGrayScaleValue2 = colorToGray(newcolor2) / 255;
    expect(Math.abs(calGrayScaleValue2 - grayScaleValue2)).toBeLessThan(0.01);
  });
});
