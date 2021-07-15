import ColorThief from 'colorthief';
import { v4 as uuidv4 } from 'uuid';
import { Palette } from '@antv/color-schema';
import { loadImage, arrayToColor } from '../utils';

// Get a list of colors from img url
export async function getPaletteFromImage(
  imgUrl: string,
  count: number = 6,
  quality: number = 10
): Promise<Palette | undefined> {
  return new Promise((resolve) => {
    loadImage(imgUrl)
      .then((img) => {
        const cf = new ColorThief();
        const arrayRGB = cf.getPalette(img, count, quality);
        resolve({
          id: uuidv4(),
          name: 'image',
          semantic: null,
          type: 'categorical',
          colors: arrayRGB.map((rgb: [number, number, number]) => arrayToColor(rgb, 'rgb')),
        });
      })
      .finally(() => {
        resolve(undefined);
      });
  });
}
