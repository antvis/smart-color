import { Color } from '@antv/color-schema';
import { GenerationResult } from '../types';

export const verifyDiscreteScalePaletteGeneration = (colors: (Color | undefined)[] = []) => {
  let error = false;
  Object.values(colors).forEach((lockedColor) => {
    if (lockedColor) {
      error = true;
    }
  });

  if (error) {
    return {
      status: 'error',
      msg: 'Discrete scale palette cannot be generated when colors are locked.',
    } as GenerationResult;
  }
  return undefined;
};
