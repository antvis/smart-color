import { Color } from 'color-schema-test';
import { paletteGeneration, colorToArray, colorToHex } from '@src/index';

describe('Palette Generator', () => {
  const color: Color = { model: 'rgb', value: { r: 123, g: 123, b: 0 } };
  test('should generate monochromatic palette', () => {
    const result = paletteGeneration('monochromatic');
    const { status } = result;
    expect(status).toBe('success');
    // @ts-ignore
    const { type, colors } = result.palette;
    expect(type).toBe('discrete-scale');
    for (let i = 1; i < colors.length; i += 1) {
      const [hue1] = colorToArray(colors[i - 1], 'hsv');
      const [hue2] = colorToArray(colors[i], 'hsv');
      expect(Math.min(Math.abs(hue1 - hue2), 360 - Math.abs(hue1 - hue2))).toBeLessThan(45);
    }
  });
  test('should generate analogous palette', () => {
    const result = paletteGeneration('analogous');
    const { status } = result;
    expect(status).toBe('success');
    // @ts-ignore
    const { type, colors } = result.palette;
    expect(type).toBe('discrete-scale');
    for (let i = 1; i < colors.length; i += 1) {
      const [hue1] = colorToArray(colors[i - 1], 'hsv');
      const [hue2] = colorToArray(colors[i], 'hsv');
      expect(Math.min(Math.abs(hue1 - hue2), 360 - Math.abs(hue1 - hue2))).toBeLessThan(90);
    }
  });
  test('should generate achromatic palette', () => {
    const result = paletteGeneration('achromatic');
    const { status } = result;
    expect(status).toBe('success');
    // @ts-ignore
    const { type, colors } = result.palette;
    expect(type).toBe('discrete-scale');
    for (let i = 0; i < colors.length; i += 1) {
      const [r, g, b] = colorToArray(colors[i], 'rgb');
      expect(r).toBe(g);
      expect(g).toBe(b);
    }
  });
  test('should generate complementary palette', () => {
    const result = paletteGeneration('complementary');
    const { status } = result;
    expect(status).toBe('success');
    // @ts-ignore
    const { type, colors } = result.palette;
    expect(type).toBe('discrete-scale');
    const [begin] = colorToArray(colors[0], 'hsv');
    const [end] = colorToArray(colors[colors.length - 1], 'hsv');
    expect(Math.max(Math.abs(begin - end), 360 - Math.abs(begin - end))).toBeLessThan(240);
  });
  test('should generate split-complementary palette', () => {
    const result = paletteGeneration('split-complementary');
    const { status } = result;
    expect(status).toBe('success');
    // @ts-ignore
    const { type } = result.palette;
    expect(type).toBe('categorical');
  });
  test('should generate triadic palette', () => {
    const result = paletteGeneration('triadic');
    const { status } = result;
    expect(status).toBe('success');
    // @ts-ignore
    const { type } = result.palette;
    expect(type).toBe('categorical');
  });
  test('should generate tetradic palette', () => {
    const result = paletteGeneration('tetradic');
    const { status } = result;
    expect(status).toBe('success');
    // @ts-ignore
    const { type } = result.palette;
    expect(type).toBe('categorical');
  });
  test('should generate polychromatic palette', () => {
    const result = paletteGeneration('polychromatic');
    const { status } = result;
    expect(status).toBe('success');
    // @ts-ignore
    const { type } = result.palette;
    expect(type).toBe('categorical');
  });
  test('should generate random palette', () => {
    // @ts-ignore
    const result = paletteGeneration('random');
    const { status } = result;
    expect(status).toBe('success');
  });
  test('should generete palette with locked color', () => {
    const result1 = paletteGeneration('monochromatic', [color]);
    expect(result1.status).toBe('error');

    const result2 = paletteGeneration('polychromatic', [color]);
    expect(result2.status).toBe('success');
    // @ts-ignore
    expect(colorToHex(result2.palette.colors[0])).toBe(colorToHex(color));
  });
  test('should generete palette with config', () => {
    const result = paletteGeneration('monochromatic', [], {
      count: 9,
      color,
      tendency: 'shade',
    });
    expect(result.status).toBe('success');
    // @ts-ignore
    const { colors } = result.palette;
    expect(colors.length).toBe(9);
    expect(colors.findIndex((c) => colorToHex(c) === colorToHex(color))).not.toBe(-1);
    const [begin] = colorToArray(colors[0], 'lab');
    const [end] = colorToArray(colors[colors.length - 1], 'lab');
    expect(end - begin).toBeLessThan(0);
  });
});
