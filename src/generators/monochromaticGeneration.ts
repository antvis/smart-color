import { DiscreteScalePalette } from '@antv/color-schema';
import { Generation } from './types';
import { discreteScaleGenerationInLab } from './discreteScaleGeneration';
import { verifyDiscreteScalePaletteGeneration } from './verification';

// generate sequential palette by monochromatic scheme
export const monochromaticGeneration: Generation = (configuration) => {
  const { count, color, tendency, colors } = configuration;
  const verifyResult = verifyDiscreteScalePaletteGeneration(colors);
  if (verifyResult) return verifyResult;

  const isTint = tendency === 'tint';
  const newColors = discreteScaleGenerationInLab(color, count);
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
