import { Color } from '@antv/color-schema';
import { colorDifference } from '../../../src/index';

describe('contrast ratio', () => {
  const color1: Color = {
    model: 'rgb',
    value: {
      r: 202,
      g: 123,
      b: 123,
    },
  };

  const color2: Color = {
    model: 'rgb',
    value: {
      r: 97,
      g: 59,
      b: 164,
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
    const difference = colorDifference(color1, color1, { measure: 'contrastRatio' });
    expect(difference).toBe(1);
  });

  test('different color', () => {
    const difference = colorDifference(color1, color2, { measure: 'contrastRatio' }).toFixed(1);
    expect(difference).toBe('2.5');
  });

  test('white color and black color', () => {
    const difference = colorDifference(color3, color4, { measure: 'contrastRatio' }).toFixed(1);
    expect(difference).toBe('21.0');
  });
});
