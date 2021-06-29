import { Color } from 'color-schema-test';
import { monochromaticGeneration } from './monochromaticGeneration';
import { Generation } from './types';

const BLACK: Color = {
  space: 'rgb',
  value: { r: 0, g: 0, b: 0 },
};
const WHITE: Color = {
  space: 'rgb',
  value: { r: 255, g: 255, b: 255 },
};

// generate sequential palette by achromatic scheme
export const achromaticGeneration: Generation = (colors, config) => {
  const { tendency } = config;
  const newConfig = {
    ...config,
    color: tendency === 'tint' ? BLACK : WHITE,
  };
  const result = monochromaticGeneration(colors, newConfig);
  if (result.status === 'success') {
    return {
      status: 'success',
      palette: {
        ...result.palette,
        name: 'achromatic',
      },
    };
  }
  return result;
};
