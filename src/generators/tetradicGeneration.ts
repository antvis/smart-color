import { v4 as uuidv4 } from 'uuid';
import { CategoricalPalette } from 'color-schema-test';
import { paletteOptimization } from '../optimizers';
import { categoricalGenerationInHsv } from './categoricalGeneration';
import { Generation } from './types';
// generate categorical palette by tetradic scheme
export const tetradicGeneration: Generation = (colors, config) => {
  const { count, color } = config;
  const dHue = 90;
  const { newColors, locked } = categoricalGenerationInHsv(color, dHue, count, colors);
  const palette: CategoricalPalette = {
    id: uuidv4(),
    name: 'tetradic',
    semantic: null,
    type: 'categorical',
    colors: newColors,
  };

  return {
    status: 'success',
    palette: paletteOptimization(palette, locked) as CategoricalPalette,
  };
};
