import { RGBColor } from 'color-schema-test';
import { randomColor } from '@src/generators/random';

describe('Random Generator', () => {
  test('should generate random colors', () => {
    const { space, value } = randomColor() as RGBColor;
    const { r, g, b } = value;
    expect(space).toBe('rgb');
    expect(Math.min(r, g, b) >= 0 && Math.max(r, g, b) < 256).toBe(true);
  });
});
