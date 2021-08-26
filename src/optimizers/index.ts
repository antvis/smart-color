import { Color, isContinuousPalette, isMatrixPalette } from '@antv/color-schema';
import { WHITE } from '../constant';
import { invertGrayscale } from '../simulators';
import { PaletteOptimization, ColorDifferenceMeasure } from '../types';
import { colorToGray, colorToArray, arrayToColor, cloneDeep } from '../utils';
import { optimizePaletteByGA } from './optimizePaletteByGA';

const COLOR_DIFFERENCE_DEFAULT_VALUE: Record<ColorDifferenceMeasure, number> = {
  euclidean: 30,
  // ref: Categorical Colormap Optimization with Visualization Case Studies
  // suggests that [20, 25] might be the borderline zone
  CIEDE2000: 20,
  // WCAG, 1.4.3 Contrast (Minimum)
  contrastRatio: 4.5,
};

const COLOR_DIFFERENCE_MAX_VALUE: Record<ColorDifferenceMeasure, number> = {
  euclidean: 291.48,
  CIEDE2000: 100,
  contrastRatio: 21,
};

export const paletteOptimization: PaletteOptimization = (palette, configuration = {}) => {
  const {
    locked = [],
    simulationType = 'normal',
    threshold,
    colorModel = 'hsv',
    colorDifferenceMeasure = 'euclidean',
    backgroundColor = WHITE,
  } = configuration;
  let newThreshold = threshold;
  // set default value
  if (!newThreshold) {
    newThreshold = COLOR_DIFFERENCE_DEFAULT_VALUE[colorDifferenceMeasure];
  }
  // In case of grayscale mode, the maximum difference between two can be estimated directly
  // If the set threshold is outside of this range, trim directly to save optimization time
  if (simulationType === 'grayscale') {
    const maxValue = COLOR_DIFFERENCE_MAX_VALUE[colorDifferenceMeasure];
    newThreshold = Math.min(newThreshold, maxValue / palette.colors.length);
  }

  const newPalette = cloneDeep(palette);
  if (!isMatrixPalette(newPalette) && !isContinuousPalette(newPalette)) {
    if (simulationType === 'grayscale') {
      const colors = newPalette.colors.map((color: Color): [number] => [colorToGray(color)]);
      const newColors = optimizePaletteByGA(
        colors,
        locked,
        simulationType,
        newThreshold,
        colorModel,
        colorDifferenceMeasure,
        backgroundColor
      );
      newPalette.colors.forEach((color: Color, index: number) =>
        Object.assign(color, invertGrayscale(newColors[index][0] / 255, color))
      );
    } else {
      const colors = newPalette.colors.map((color: Color) => colorToArray(color, colorModel));
      const newColors = optimizePaletteByGA(
        colors,
        locked,
        simulationType,
        newThreshold,
        colorModel,
        colorDifferenceMeasure,
        backgroundColor
      );
      newPalette.colors.forEach((color: Color, index: number) => {
        Object.assign(color, arrayToColor(newColors[index], colorModel));
      });
    }
  }
  return newPalette;
};
