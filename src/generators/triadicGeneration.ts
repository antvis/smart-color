import { CategoricalPalette } from '@antv/color-schema';
import { paletteOptimization } from '../optimizers';
import { categoricalGenerationInHsv } from './categoricalGeneration';
import { Generation } from './types';

// generate categorical palette by triadic scheme
export const triadicGeneration: Generation = (configuration) => {
  const { count, color, colors } = configuration;
  const dHue = 120;
  const { newColors, locked } = categoricalGenerationInHsv(color, dHue, count, colors);
  const palette: CategoricalPalette = {
    name: 'tetradic',
    semantic: null,
    type: 'categorical',
    colors: newColors,
  };
  return paletteOptimization(palette, { locked });
};
