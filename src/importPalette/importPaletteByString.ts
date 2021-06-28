import { Palette } from 'color-schema-test';
import { v4 as uuidv4 } from 'uuid';
import { hexToColor } from '../color/convertion';

// Get a palette of string
export function importPaletteByString(code: string): Palette {
  return {
    id: uuidv4(),
    name: 'code',
    semantic: null,
    type: 'categorical',
    colors: code
      .replace(/[^#,0-9a-fA-F]/g, '')
      .split(',')
      .map((color) => {
        return hexToColor(color);
      }),
  };
}
