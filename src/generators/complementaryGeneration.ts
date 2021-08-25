import { DiscreteScalePalette } from '@antv/color-schema';
import { colorToArray, arrayToColor, hueOffset, random, randomInt } from '../utils';
import { Generation } from './types';
import { discreteScaleGenerationInLab } from './discreteScaleGeneration';

// generate diverging palette by complementary scheme
export const complementaryGeneration: Generation = (configuration) => {
  const { count, color } = configuration;

  const [hue, saturation, value] = colorToArray(color, 'hsv');
  const complementaryColor = arrayToColor([hueOffset(hue, 180), saturation, value], 'hsv');

  const maxL = randomInt(80, 90);
  const minL = randomInt(15, 25);
  const halfCount = Math.floor(count / 2);

  const left = discreteScaleGenerationInLab(color, halfCount, [minL, maxL]);
  const right = discreteScaleGenerationInLab(complementaryColor, halfCount, [minL, maxL]).reverse();
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
  return palette;
};
