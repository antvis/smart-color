import chroma from 'chroma-js';
import { colorToChromaColor, colorToGray } from '../color/convertion';
import { ColorDistance } from '../types';
import { isColorBlindnessSimulation, colorSimulation } from '../simulators';

const distance: ColorDistance = (color1, color2) => {
  return chroma.distance(colorToChromaColor(color1), colorToChromaColor(color2));
};

const distanceInColorBlindness: ColorDistance = (color1, color2, simulationType) => {
  return distance(colorSimulation(color1, simulationType), colorSimulation(color2, simulationType));
};

const distanceInGrayScale: ColorDistance = (color1, color2) => {
  return Math.abs(colorToGray(color1) - colorToGray(color2));
};

export const colorDistance: ColorDistance = (color1, color2, simulationType = 'normal') => {
  if (simulationType === 'normal') {
    return distance(color1, color2);
  }
  if (isColorBlindnessSimulation(simulationType)) {
    return distanceInColorBlindness(color1, color2, simulationType);
  }
  if (simulationType === 'grayScale') {
    return distanceInGrayScale(color1, color2);
  }
  return 0;
};
