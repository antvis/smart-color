import { PaletteGeneration } from '../types';
import { randomColor } from './random';
import { monochromaticGeneration } from './monochromaticGeneration';
import { analogousGeneration } from './analogousGeneration';
import { achromaticGeneration } from './achromaticGeneration';
import { complementaryGeneration } from './complementaryGeneration';
import { splitComplementaryGeneration } from './splitComplementaryGeneration';
import { triadicGeneration } from './triadicGeneration';
import { tetradicGeneration } from './tetradicGeneration';
import { polychromaticGeneration } from './polychromaticGeneration';
import { randomGeneration } from './randomGeneration';

const generator = {
  monochromatic: monochromaticGeneration,
  analogous: analogousGeneration,
  achromatic: achromaticGeneration,
  complementary: complementaryGeneration,
  'split-complementary': splitComplementaryGeneration,
  triadic: triadicGeneration,
  tetradic: tetradicGeneration,
  polychromatic: polychromaticGeneration,
};

/**
 *
 * @param type
 * @param colors locked colors
 * @param config
 * @returns
 */
export const paletteGeneration: PaletteGeneration = (type = 'monochromatic', colors = [], config = {}) => {
  // set default value
  const { color = randomColor(), count = 8, tendency = 'tint' } = config;
  const newConfig = {
    color,
    count,
    tendency,
  };
  try {
    return generator[type](colors, newConfig);
  } catch (e) {
    return randomGeneration(colors, newConfig);
  }
};
