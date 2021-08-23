import { DiscreteScalePalette } from '@antv/color-schema';
import { random } from 'lodash';
import { colorToArray, arrayToColor, hueOffset } from '../utils';
import { Generation } from './types';
import { continuousGenerationInLab } from './continuousGeneration';
import { verifyContinuousPaletteGeneration } from './verification';

// generate diverging palette by complementary scheme
export const complementaryGeneration: Generation = (configuration) => {
  const { count, color, colors } = configuration;
  const verifyResult = verifyContinuousPaletteGeneration(colors);
  if (verifyResult) return verifyResult;

  const [hue, saturation, value] = colorToArray(color, 'hsv');
  const complementaryColor = arrayToColor([hueOffset(hue, 180), saturation, value], 'hsv');

  const maxL = random(80, 90);
  const minL = random(15, 25);
  const halfCount = Math.floor(count / 2);

  const left = continuousGenerationInLab(color, halfCount, [minL, maxL]);
  const right = continuousGenerationInLab(complementaryColor, halfCount, [minL, maxL]).reverse();
  let newColors;
  if (count % 2 === 1) {
    const midColor = arrayToColor([(hueOffset(hue, 180) + hue) / 2, random(0.05, 0.1), random(0.9, 0.95)], 'hsv');
    newColors = [...left, midColor, ...right];
  } else {
    newColors = [...left, ...right];
  }
  const palette: DiscreteScalePalette = {
    name: 'complementary',
    semantic: null,
    type: 'discrete-scale',
    colors: newColors,
  };
  return {
    status: 'success',
    palette,
  };
};
