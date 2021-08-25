import { Color } from '@antv/color-schema';
import { paletteGeneration, colorToArray, colorToHex } from '@src/index';

describe('Palette Generator', () => {
  const color: Color = { model: 'rgb', value: { r: 123, g: 123, b: 0 } };
  test('should generate monochromatic palette', () => {
    const palette = paletteGeneration('monochromatic');
    const { type, colors } = palette;
    expect(type).toBe('discrete-scale');
    for (let i = 1; i < colors.length; i += 1) {
      const [hue1] = colorToArray(colors[i - 1], 'hsv');
      const [hue2] = colorToArray(colors[i], 'hsv');
      expect(Math.min(Math.abs(hue1 - hue2), 360 - Math.abs(hue1 - hue2))).toBeLessThan(45);
    }
  });
  test('should generate analogous palette', () => {
    const palette = paletteGeneration('analogous');
    const { type, colors } = palette;
    expect(type).toBe('discrete-scale');
    for (let i = 1; i < colors.length; i += 1) {
      const [hue1] = colorToArray(colors[i - 1], 'hsv');
      const [hue2] = colorToArray(colors[i], 'hsv');
      expect(Math.min(Math.abs(hue1 - hue2), 360 - Math.abs(hue1 - hue2))).toBeLessThan(90);
    }
  });
  test('should generate achromatic palette', () => {
    const palette = paletteGeneration('achromatic');
    const { type, colors } = palette;
    expect(type).toBe('discrete-scale');
    for (let i = 0; i < colors.length; i += 1) {
      const [r, g, b] = colorToArray(colors[i], 'rgb');
      expect(r).toBe(g);
      expect(g).toBe(b);
    }
  });
  test('should generate complementary palette', () => {
    const palette = paletteGeneration('complementary');
    const { type, colors } = palette;
    expect(type).toBe('discrete-scale');
    const [begin] = colorToArray(colors[0], 'hsv');
    const [end] = colorToArray(colors[colors.length - 1], 'hsv');
    expect(Math.max(Math.abs(begin - end), 360 - Math.abs(begin - end))).toBeLessThan(240);
  });
  test('should generate split-complementary palette', () => {
    const palette = paletteGeneration('split-complementary');
    const { type } = palette;
    expect(type).toBe('categorical');
  });
  test('should generate triadic palette', () => {
    const palette = paletteGeneration('triadic');
    const { type } = palette;
    expect(type).toBe('categorical');
  });
  test('should generate tetradic palette', () => {
    const palette = paletteGeneration('tetradic');
    const { type } = palette;
    expect(type).toBe('categorical');
  });
  test('should generate polychromatic palette', () => {
    const palette = paletteGeneration('polychromatic');
    const { type } = palette;
    expect(type).toBe('categorical');
  });
  test('should generate random palette', () => {
    // @ts-ignore
    const palette = paletteGeneration('random');
    const { type } = palette;
    expect(type).toBe('categorical');
  });
  test('should generate palette with locked color', () => {
    const palette = paletteGeneration('polychromatic', {
      colors: [color],
    });
    expect(colorToHex(palette.colors[0])).toBe(colorToHex(color));
  });
  test('should generate palette with configuration', () => {
    const palette = paletteGeneration('monochromatic', {
      count: 9,
      color,
      tendency: 'shade',
    });
    // @ts-ignore
    const { colors } = palette;
    expect(colors.length).toBe(9);
    expect(colors.findIndex((c) => colorToHex(c) === colorToHex(color))).not.toBe(-1);
    const [begin] = colorToArray(colors[0], 'lab');
    const [end] = colorToArray(colors[colors.length - 1], 'lab');
    expect(end - begin).toBeLessThan(0);
  });
});
