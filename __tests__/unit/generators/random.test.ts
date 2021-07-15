import { RGBColor } from '@antv/color-schema';
import { randomColor } from '@src/generators/random';

describe('Random Generator', () => {
  test('should generate random colors', () => {
    const { model, value } = randomColor() as RGBColor;
    const { r, g, b } = value;
    expect(model).toBe('rgb');
    expect(Math.min(r, g, b) >= 0 && Math.max(r, g, b) < 256).toBe(true);
  });
});
