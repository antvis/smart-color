import { Color } from '@antv/color-schema';
import { hueOffset } from '@src/utils/colorComputation';
import { WHITE } from '@src/constant';
import { colorOverlap } from '@src/index';

describe('Color computation', () => {
  test('hue offset', () => {
    const hue1 = hueOffset(100, 10);
    expect(hue1).toBe(110);
    const hue2 = hueOffset(100, 1000);
    expect(hue2).toBe(20);
    const hue3 = hueOffset(100, -1000);
    expect(hue3).toBe(180);
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
    const overlappedColor = colorOverlap(color1, WHITE);
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
    const overlappedColor = colorOverlap(WHITE, color1);
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
    const overlappedColor = colorOverlap(color1, WHITE);
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
    const overlappedColor = colorOverlap(color1, black);
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
    const overlappedColor = colorOverlap(color1, color2);
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
});
