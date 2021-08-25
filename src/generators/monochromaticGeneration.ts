import { DiscreteScalePalette } from '@antv/color-schema';
import { Generation } from './types';
import { discreteScaleGenerationInLab } from './discreteScaleGeneration';

// generate sequential palette by monochromatic scheme
export const monochromaticGeneration: Generation = (configuration) => {
  const { count, color, tendency } = configuration;

  const isTint = tendency === 'tint';
  const newColors = discreteScaleGenerationInLab(color, count);
  const palette: DiscreteScalePalette = {
    name: 'monochromatic',
    semantic: null,
    type: 'discrete-scale',
    colors: isTint ? newColors : newColors.reverse(),
  };
  return palette;
};
