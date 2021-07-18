// @ts-ignore
import blinder from 'color-blind';
import { COLOR_BLINDNESS_SIMULATION_TYPES } from '../constant';
import { ColorBlindnessSimulationType, ColorSimulation } from '../types';
import { hexToColor, colorToHex } from '../utils';

export function isColorBlindnessSimulation(type: any): type is ColorBlindnessSimulationType {
  return type !== 'normal' && COLOR_BLINDNESS_SIMULATION_TYPES.indexOf(type) > -1;
}

// get color in color blindness simulation
export const colorBlindnessSimulation: ColorSimulation = (color, type = 'normal') => {
  if (type === 'normal') {
    return { ...color };
  }
  const hexColor = colorToHex(color);
  const blindColor = blinder[type](hexColor);
  return hexToColor(blindColor);
};
