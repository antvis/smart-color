import { Color } from '@antv/color-schema';
import { colorDifference } from '@src/index';

describe('CIEDE2000', () => {
  const color1: Color = {
    model: 'lab',
    value: {
      l: 100,
      a: 0,
      b: 0,
    },
  };

  const color2: Color = {
    model: 'lab',
    value: {
      l: 90,
      a: 10,
      b: 10,
    },
  };

  const color3: Color = {
    model: 'rgb',
    value: {
      r: 0,
      g: 0,
      b: 0,
    },
  };

  const color4: Color = {
    model: 'rgb',
    value: {
      r: 255,
      g: 255,
      b: 255,
    },
  };

  test('same color', () => {
    const difference = colorDifference(color1, color1, { measure: 'CIEDE2000' });
    expect(difference).toBe(0);
  });

  test('different color', () => {
    const difference = colorDifference(color1, color2, { measure: 'CIEDE2000' }).toFixed(1);
    expect(difference).toBe('14.1');
  });

  test('white color and black color', () => {
    const difference = colorDifference(color3, color4, { measure: 'CIEDE2000' }).toFixed(1);
    expect(difference).toBe('100.0');
  });
});
