import { isContinuousPalette, isMatrixPalette } from '@antv/color-schema';
import { cloneDeep } from 'lodash';
import { invertGrayScale } from '../simulators';
import { PaletteOptimization, ColorDistanceMeasure } from '../types';
import { colorToGray, colorToArray, arrayToColor } from '../utils';
import { optimizePaletteByGA } from './optimizePaletteByGA';

const COLOR_DIFFERENCE_DEFAULT_VALUE: Record<ColorDistanceMeasure, number> = {
  euclidean: 30,
  CIEDE2000: 20,
};

const COLOR_DIFFERENCE_MAX_VALUE: Record<ColorDistanceMeasure, number> = {
  euclidean: 291.48,
  CIEDE2000: 100,
};

export const paletteOptimization: PaletteOptimization = (palette, configuration = {}) => {
  const {
    locked = [],
    simulationType = 'normal',
    threshold,
    colorModel = 'hsv',
    colorDistanceMeasure = 'euclidean',
  } = configuration;
  let newThreshold = threshold;
  // set default value
  if (!newThreshold) {
    newThreshold = COLOR_DIFFERENCE_DEFAULT_VALUE[colorDistanceMeasure];
  }
  // In case of grayscale mode, the maximum difference between two can be estimated directly
  // If the set threshold is outside of this range, trim directly to save optimization time
  if (simulationType === 'grayScale') {
    const maxValue = COLOR_DIFFERENCE_MAX_VALUE[colorDistanceMeasure];
    newThreshold = Math.min(newThreshold, maxValue / palette.colors.length);
  }

  const newPalette = cloneDeep(palette);
  if (!isMatrixPalette(newPalette) && !isContinuousPalette(newPalette)) {
    if (simulationType === 'grayScale') {
      const colors = newPalette.colors.map((color): [number] => [colorToGray(color)]);
      const newColors = optimizePaletteByGA(
        colors,
        locked,
        simulationType,
        newThreshold,
        colorModel,
        colorDistanceMeasure
      );
      newPalette.colors.forEach((color, index) =>
        Object.assign(color, invertGrayScale(newColors[index][0] / 255, color))
      );
    } else {
      const colors = newPalette.colors.map((color) => colorToArray(color, colorModel));
      const newColors = optimizePaletteByGA(
        colors,
        locked,
        simulationType,
        newThreshold,
        colorModel,
        colorDistanceMeasure
      );
      newPalette.colors.forEach((color, index) => {
        Object.assign(color, arrayToColor(newColors[index], colorModel));
      });
    }
  }
  return newPalette;
};
