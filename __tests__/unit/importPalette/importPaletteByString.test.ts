import { importPaletteByString } from '@src/index';

describe('import palette', () => {
  test('import palette by string', () => {
    const palette = importPaletteByString('#123,#abcd, #123456, #09876557,,, ');
    expect(palette.colors.length).toBe(4);
  });
});
