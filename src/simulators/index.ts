import { ColorSimulation } from '../types';
import { colorBlindnessSimulation } from './colorBlindness';
import { grayScale } from './grayScale';

export const colorSimulation: ColorSimulation = (color, type = 'normal') => {
  if (type === 'grayScale') {
    return grayScale(color);
  }
  return colorBlindnessSimulation(color, type);
};

export { isColorBlindnessSimulation } from './colorBlindness';
export { invertGrayScale } from './grayScale';
