import { Color } from 'color-schema-test';
import { arrayToColor, colorToArray, colorToGray, grayToColor, hexToColor, colorToHex } from '@src/index';

const black: Color = {
  space: 'rgb',
  value: {
    r: 0,
    g: 0,
    b: 0,
  },
};

const white: Color = {
  space: 'rgb',
  value: {
    r: 255,
    g: 255,
    b: 255,
  },
};

describe('Color convertion', () => {
  test('convert color to array', () => {
    const blackArray = colorToArray(black);
    expect(blackArray).toStrictEqual([0, 0, 0]);

    const whiteArray = colorToArray(white);
    expect(whiteArray).toStrictEqual([255, 255, 255]);

    // color out of range
    const color: Color = {
      space: 'rgb',
      value: {
        r: 258,
        g: 0,
        b: 0,
      },
    };
    const array = colorToArray(color);
    expect(array).toStrictEqual([255, 0, 0]);
  });

  test('convert color to hex value', () => {
    const blackHex = colorToHex(black);
    expect(blackHex).toBe('#000000');

    const whiteHex = colorToHex(white);
    expect(whiteHex).toBe('#ffffff');
  });

  test('convert color to gray', () => {
    const blackGray = colorToGray(black);
    expect(blackGray).toBe(0);

    const whiteGray = colorToGray(white);
    expect(whiteGray).toBe(255);
  });

  test('convert array to color', () => {
    const color1 = arrayToColor([0, 0, 0], 'rgb');
    expect(color1).toStrictEqual(black);

    const color2 = arrayToColor([255, 255, 255], 'rgb');
    expect(color2).toStrictEqual(white);
  });

  test('convert hex value to color', () => {
    const color1 = hexToColor('#000000');
    expect(color1).toStrictEqual(black);

    const color2 = hexToColor('#ffffff');
    expect(color2).toStrictEqual(white);

    // error hex
    const color3 = hexToColor('#0');
    expect(color3).toStrictEqual(black);
  });

  test('convert gray to color', () => {
    const color1 = grayToColor(0);
    expect(color1).toStrictEqual(black);

    const color2 = grayToColor(255);
    expect(color2).toStrictEqual(white);

    const color3 = grayToColor(123, 0.1);
    expect(color3).toStrictEqual({
      space: 'rgba',
      value: { r: 123, g: 123, b: 123, a: 0.1 },
    });
  });
});
