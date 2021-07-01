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
 * @param configuration
 * @returns
 */
export const paletteGeneration: PaletteGeneration = (type = 'monochromatic', configuration = {}) => {
  // set default value
  const { color = randomColor(), colors = [], count = 8, tendency = 'tint' } = configuration;
  const newConfiguration = {
    color,
    colors,
    count,
    tendency,
  };
  try {
    return generator[type](newConfiguration);
  } catch (e) {
    return randomGeneration(newConfiguration);
  }
};
