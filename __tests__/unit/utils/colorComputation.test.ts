import { hueOffset } from '../../../src/utils/colorComputation';
import { hexToColor, colorToHex, colorDarken, colorBrighten } from '../../../src/index';

describe('Color computation', () => {
  test('hue offset', () => {
    const hue1 = hueOffset(100, 10);
    expect(hue1).toBe(110);
    const hue2 = hueOffset(100, 1000);
    expect(hue2).toBe(20);
    const hue3 = hueOffset(100, -1000);
    expect(hue3).toBe(180);
  });

  test('color darken', () => {
    const primaryColor = hexToColor('#1890ff');
    expect(colorToHex(colorDarken(primaryColor))).toEqual('#096dd9');
    expect(colorToHex(colorDarken(primaryColor, 2))).toEqual('#0050b3');
    expect(colorToHex(colorDarken(primaryColor, 3))).toEqual('#003a8c');
    expect(colorToHex(colorDarken(primaryColor, 4))).toEqual('#002766');
  });

  test('color brighten', () => {
    const primaryColor = hexToColor('#1890ff');
    expect(colorToHex(colorBrighten(primaryColor))).toEqual('#40a9ff');
    expect(colorToHex(colorBrighten(primaryColor, 2))).toEqual('#69c0ff');
    expect(colorToHex(colorBrighten(primaryColor, 3))).toEqual('#91d5ff');
    expect(colorToHex(colorBrighten(primaryColor, 4))).toEqual('#bae7ff');
    expect(colorToHex(colorBrighten(primaryColor, 5))).toEqual('#e6f7ff');
  });
});
