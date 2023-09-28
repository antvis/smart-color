import { getPaletteFromString } from '../../../src/index';

describe('import palette', () => {
  test('import palette by string', () => {
    const palette = getPaletteFromString('#123,#abcd, #123456, #09876557,#eee33,, ');
    expect(palette.colors.length).toBe(5);
  });
});
