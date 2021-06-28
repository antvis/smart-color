import { Color } from 'color-schema-test';
import { GenerationResult } from '../types';

export const verifyContinuousPaletteGeneration = (colors: (Color | undefined)[] = []) => {
  let error = false;
  Object.values(colors).forEach((lockedColor) => {
    if (lockedColor) {
      error = true;
    }
  });

  if (error) {
    return {
      status: 'error',
      msg: 'Continuous palette cannot be generated when colors are locked.',
    } as GenerationResult;
  }
  return undefined;
};
