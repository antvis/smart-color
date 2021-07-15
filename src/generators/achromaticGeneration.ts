import { Color } from '@antv/color-schema';
import { monochromaticGeneration } from './monochromaticGeneration';
import { Generation } from './types';

const BLACK: Color = {
  model: 'rgb',
  value: { r: 0, g: 0, b: 0 },
};
const WHITE: Color = {
  model: 'rgb',
  value: { r: 255, g: 255, b: 255 },
};

// generate sequential palette by achromatic scheme
export const achromaticGeneration: Generation = (configuration) => {
  const { tendency } = configuration;
  const newConfiguration = {
    ...configuration,
    color: tendency === 'tint' ? BLACK : WHITE,
  };
  const result = monochromaticGeneration(newConfiguration);
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
