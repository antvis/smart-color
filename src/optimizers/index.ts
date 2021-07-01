import { isContinuousPalette, isMatrixPalette } from 'color-schema-test';
import { cloneDeep } from 'lodash';
import { invertGrayScale } from '../simulators';
import { PaletteOptimization } from '../types';
import { colorToGray, colorToArray, arrayToColor } from '../utils';
import { optimizePaletteByGA } from './optimizePaletteByGA';

export const paletteOptimization: PaletteOptimization = (palette, configuration = {}) => {
  const { locked = [], simulationType = 'normal', threshold, colorModel = 'hsv' } = configuration;
  let newThreshold = threshold;
  // set default value
  if (!newThreshold) {
    if (palette.type === 'categorical') {
      newThreshold = 30;
    } else {
      newThreshold = 20;
    }
    if (simulationType === 'grayScale') {
      newThreshold = Math.min(newThreshold, 200 / palette.colors.length);
    }
  }

  const newPalette = cloneDeep(palette);
  if (!isMatrixPalette(newPalette) && !isContinuousPalette(newPalette)) {
    if (simulationType === 'grayScale') {
      const colors = newPalette.colors.map((color): [number] => [colorToGray(color)]);
      const newColors = optimizePaletteByGA(colors, locked, simulationType, newThreshold, colorModel);
      newPalette.colors.forEach((color, index) =>
        Object.assign(color, invertGrayScale(newColors[index][0] / 255, color))
      );
    } else {
      const colors = newPalette.colors.map((color) => colorToArray(color, colorModel));
      const newColors = optimizePaletteByGA(colors, locked, simulationType, newThreshold, colorModel);
      newPalette.colors.forEach((color, index) => {
        Object.assign(color, arrayToColor(newColors[index], colorModel));
      });
    }
  }
  return newPalette;
};
