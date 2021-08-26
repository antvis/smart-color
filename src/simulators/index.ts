import { ColorSimulation } from '../types';
import { colorBlindnessSimulation } from './colorBlindness';
import { grayscale } from './grayscale';

export const colorSimulation: ColorSimulation = (color, type = 'normal') => {
  if (type === 'grayscale') {
    return grayscale(color);
  }
  return colorBlindnessSimulation(color, type);
};

export { isColorBlindnessSimulation } from './colorBlindness';
export { invertGrayscale } from './grayscale';
