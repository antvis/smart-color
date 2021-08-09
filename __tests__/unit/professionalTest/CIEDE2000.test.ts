import { Color } from '@antv/color-schema';
import { CIEDE2000 } from '@src/index';

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
    const distance = CIEDE2000(color1, color1);
    expect(distance).toBe(0);
  });

  test('different color', () => {
    const distance = CIEDE2000(color1, color2).toFixed(1);
    expect(distance).toBe('14.1');
  });

  test('white color and black color', () => {
    const distance = CIEDE2000(color3, color4).toFixed(1);
    expect(distance).toBe('100.0');
  });
});
