import { DiscreteScalePalette } from '@antv/color-schema';
import { Generation } from './types';
import { continuousGenerationInLab } from './continuousGeneration';
import { verifyContinuousPaletteGeneration } from './verification';

// generate sequential palette by monochromatic scheme
export const monochromaticGeneration: Generation = (configuration) => {
  const { count, color, tendency, colors } = configuration;
  const verifyResult = verifyContinuousPaletteGeneration(colors);
  if (verifyResult) return verifyResult;

  const isTint = tendency === 'tint';
  const newColors = continuousGenerationInLab(color, count);
  const palette: DiscreteScalePalette = {
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
