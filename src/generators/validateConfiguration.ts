import { ColorSchemeType } from '@antv/color-schema';
import { GeneratorConfiguration } from '../types';
import { randomColor } from './random';

const DISCRETE_SCALE_TYPES: ColorSchemeType[] = ['monochromatic'];
export const validateConfiguration = (type: ColorSchemeType, configuration: GeneratorConfiguration) => {
  const { color = randomColor(), count = 8, tendency = 'tint' } = configuration;
  let { colors = [] } = configuration;
  // Discrete scale palette cannot be generated when colors are locked.
  if (DISCRETE_SCALE_TYPES.includes(type)) {
    colors = [];
  }
  return {
    color,
    colors,
    count,
    tendency,
  };
};
