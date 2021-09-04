import { Color } from '@antv/color-schema';
import { colorBlend, colorToHex, hexToColor } from '@src/index';
import { WHITE } from '@src/constant';

const colorTop: Color = { model: 'rgb', value: { r: 91, g: 143, b: 249 } };
const colorBottom: Color = { model: 'rgb', value: { r: 97, g: 221, b: 170 } };

describe('Color blend', () => {
  test('normal', () => {
    expect(colorToHex(colorBlend(colorTop, colorBottom)).toUpperCase()).toBe('#5B8FF9');
  });

  test('transparent color overlap on white', () => {
    const color1: Color = {
      model: 'rgba',
      value: {
        r: 0,
        g: 0,
        b: 0,
        a: 0,
      },
    };
    const overlappedColor = colorBlend(color1, WHITE);
    expect(overlappedColor).toStrictEqual(WHITE);
  });

  test('white overlap on transparent color', () => {
    const color1: Color = {
      model: 'rgba',
      value: {
        r: 0,
        g: 0,
        b: 0,
        a: 0,
      },
    };
    const overlappedColor = colorBlend(WHITE, color1);
    expect(overlappedColor).toStrictEqual(WHITE);
  });

  test('color overlap on white', () => {
    const color1: Color = {
      model: 'rgba',
      value: {
        r: 0,
        g: 0,
        b: 0,
        a: 0.8,
      },
    };
    const overlappedColor = colorBlend(color1, WHITE);
    expect(overlappedColor).toStrictEqual({
      model: 'rgb',
      value: {
        r: 51,
        g: 51,
        b: 51,
      },
    });
  });

  test('color overlap on black', () => {
    const color1: Color = {
      model: 'rgba',
      value: {
        r: 123,
        g: 224,
        b: 156,
        a: 0.6,
      },
    };
    const black: Color = {
      model: 'rgb',
      value: {
        r: 0,
        g: 0,
        b: 0,
      },
    };
    const overlappedColor = colorBlend(color1, black);
    expect(overlappedColor).toStrictEqual({
      model: 'rgb',
      value: {
        r: 74,
        g: 134,
        b: 94,
      },
    });
  });

  test('color overlap on semi-transparent', () => {
    const color1: Color = {
      model: 'rgba',
      value: {
        r: 123,
        g: 224,
        b: 156,
        a: 0.6,
      },
    };
    const color2: Color = {
      model: 'rgba',
      value: {
        r: 66,
        g: 77,
        b: 88,
        a: 0.3,
      },
    };
    const overlappedColor = colorBlend(color1, color2);
    expect(overlappedColor).toStrictEqual({
      model: 'rgba',
      value: {
        r: 114,
        g: 200,
        b: 145,
        a: 0.72,
      },
    });
  });

  test('darken', () => {
    expect(colorToHex(colorBlend(colorTop, colorBottom, 'darken')).toUpperCase()).toBe('#5B8FAA');
  });

  test('multiply', () => {
    expect(colorToHex(colorBlend(colorTop, colorBottom, 'multiply')).toUpperCase()).toBe('#227BA6');
  });

  test('colorBurn', () => {
    expect(colorToHex(colorBlend(colorTop, colorBottom, 'colorBurn')).toUpperCase()).toBe('#00C2A7');
  });

  test('lighten', () => {
    expect(colorToHex(colorBlend(colorTop, colorBottom, 'lighten')).toUpperCase()).toBe('#61DDF9');
  });

  test('screen', () => {
    expect(colorToHex(colorBlend(colorTop, colorBottom, 'screen')).toUpperCase()).toBe('#99F0FD');
  });

  test('colorDodge', () => {
    expect(colorToHex(colorBlend(colorTop, colorBottom, 'colorDodge')).toUpperCase()).toBe('#96FFFF');
  });

  test('overlay', () => {
    expect(colorToHex(colorBlend(colorTop, colorBottom, 'overlay')).toUpperCase()).toBe('#45E1FB');
  });

  test('softLight', () => {
    expect(colorToHex(colorBlend(colorTop, colorBottom, 'softLight')).toUpperCase()).toBe('#4FDECE');
  });

  test('softLight', () => {
    expect(colorToHex(colorBlend(colorTop, WHITE, 'softLight')).toUpperCase()).toBe('#FFFFFF');
  });

  test('softLight', () => {
    expect(colorToHex(colorBlend(colorTop, hexToColor('#0B81C8'), 'softLight')).toUpperCase()).toBe('#0787E0');
  });

  test('hardLight', () => {
    expect(colorToHex(colorBlend(colorTop, colorBottom, 'hardLight')).toUpperCase()).toBe('#45E1FB');
  });

  test('difference', () => {
    expect(colorToHex(colorBlend(colorTop, colorBottom, 'difference')).toUpperCase()).toBe('#064E4F');
  });

  test('exclusion', () => {
    expect(colorToHex(colorBlend(colorTop, colorBottom, 'exclusion')).toUpperCase()).toBe('#767457');
  });

  test('hue', () => {
    expect(colorToHex(colorBlend(colorTop, colorBottom, 'hue')).toUpperCase()).toBe('#8EB3FF');
  });

  test('saturation', () => {
    expect(colorToHex(colorBlend(colorTop, colorBottom, 'saturation')).toUpperCase()).toBe('#4AE8A7');
  });

  test('color', () => {
    expect(colorToHex(colorBlend(colorTop, colorBottom, 'color')).toUpperCase()).toBe('#8FB4FF');
  });

  test('luminosity', () => {
    expect(colorToHex(colorBlend(colorTop, colorBottom, 'luminosity')).toUpperCase()).toBe('#3BB784');
  });
});
