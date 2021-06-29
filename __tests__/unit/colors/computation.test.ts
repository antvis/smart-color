import { hueOffset } from '@src/color/computation';

describe('Color computation', () => {
  test('hue offest', () => {
    const hue1 = hueOffset(100, 10);
    expect(hue1).toBe(110);
    const hue2 = hueOffset(100, 1000);
    expect(hue2).toBe(20);
    const hue3 = hueOffset(100, -1000);
    expect(hue3).toBe(180);
  });
});
