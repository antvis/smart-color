import { v4 as uuidv4 } from 'uuid';
import { DiscreteScalePalette } from 'color-schema-test';
import { Generation } from './types';
import { continuousGenerationInLab } from './continuousGeneration';
import { verifyContinuousPaletteGeneration } from './verification';

// generate sequential palette by monochromatic scheme
export const monochromaticGeneration: Generation = (colors, config) => {
  const verifyResult = verifyContinuousPaletteGeneration(colors);
  if (verifyResult) return verifyResult;

  const { count, color, tendency } = config;
  const isTint = tendency === 'tint';
  const newColors = continuousGenerationInLab(color, count);
  const palette: DiscreteScalePalette = {
    id: uuidv4(),
    name: 'monochromatic',
    semantic: null,
    type: 'discrete-scale',
    colors: isTint ? newColors : newColors.reverse(),
  };
  return {
    status: 'success',
    palette,
  };
};
