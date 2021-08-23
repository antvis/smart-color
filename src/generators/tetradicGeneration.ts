import { CategoricalPalette } from '@antv/color-schema';
import { paletteOptimization } from '../optimizers';
import { categoricalGenerationInHsv } from './categoricalGeneration';
import { Generation } from './types';
// generate categorical palette by tetradic scheme
export const tetradicGeneration: Generation = (configuration) => {
  const { count, color, colors } = configuration;
  const dHue = 90;
  const { newColors, locked } = categoricalGenerationInHsv(color, dHue, count, colors);
  const palette: CategoricalPalette = {
    name: 'tetradic',
    semantic: null,
    type: 'categorical',
    colors: newColors,
  };

  return {
    status: 'success',
    palette: paletteOptimization(palette, { locked }) as CategoricalPalette,
  };
};
