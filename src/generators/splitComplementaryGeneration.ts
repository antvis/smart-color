import { CategoricalPalette } from '@antv/color-schema';
import { paletteOptimization } from '../optimizers';
import { categoricalGenerationInHsv } from './categoricalGeneration';
import { Generation } from './types';

// generate categorical palette by split complementary scheme
export const splitComplementaryGeneration: Generation = (configuration) => {
  const { count, color, colors } = configuration;
  const dHue = 180;
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
