import { v4 as uuidv4 } from 'uuid';
import { CategoricalPalette } from '@antv/color-schema';
import { paletteOptimization } from '../optimizers';
import { Generation } from './types';
import { randomColor } from './random';

// generate categorical palette randomly
export const randomGeneration: Generation = (configuration) => {
  const { count, colors } = configuration;
  const locked: boolean[] = [];
  const palette: CategoricalPalette = {
    id: uuidv4(),
    name: 'random',
    semantic: null,
    type: 'categorical',
    colors: new Array(count).fill(0).map((d, i) => {
      const lockedColor = colors[i];
      if (lockedColor) {
        locked[i] = true;
        return lockedColor;
      }
      return randomColor();
    }),
  };
  return {
    status: 'success',
    palette: paletteOptimization(palette, { locked }) as CategoricalPalette,
  };
};
