import { Palette } from 'color-schema-test';
import { v4 as uuidv4 } from 'uuid';
import { hexToColor } from '../utils';

// Get a list of colors from string
export function getPaletteFromString(string: string): Palette {
  return {
    id: uuidv4(),
    name: 'code',
    semantic: null,
    type: 'categorical',
    colors: string
      .replace(/[^#,0-9a-fA-F]/g, '')
      .split(',')
      .filter((color) => color.length > 0)
      .map((color) => {
        return hexToColor(color);
      }),
  };
}
