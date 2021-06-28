import ColorThief from 'colorthief';
import { Palette } from 'color-schema-test';
import { v4 as uuidv4 } from 'uuid';
import { loadImage } from '../utils';
import { arrayToColor } from '../color/convertion';

// Get a list of colors from img url
export async function importPaletteByImage(
  imgUrl: string,
  colorCount: number = 2,
  quality: number = 10
): Promise<Palette | undefined> {
  try {
    const img = await loadImage(imgUrl);
    const cf = new ColorThief();
    const arrayRGB = cf.getPalette(img, colorCount, quality);
    return {
      id: uuidv4(),
      name: 'image',
      semantic: null,
      type: 'categorical',
      colors: arrayRGB.map((rgb: [number, number, number]) => arrayToColor(rgb, 'rgb')),
    };
  } catch (err) {
    console.error(err);
    return undefined;
  }
}
