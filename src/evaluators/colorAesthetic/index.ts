import { ColorAesthetic } from '@src/types';
import { WHITE } from '../../constant';
import { colorOverlap } from '../../utils';
import { pairPreference } from './pairPreference';
import { colorHarmony } from './colorHarmony';

export const colorAesthetic: ColorAesthetic = (color1, color2, configuration = { measure: 'pairPreference' }) => {
  const { measure = 'pairPreference', backgroundColor = WHITE } = configuration;
  // If the color is semi-transparent, the color will be overlapped on a white background by default for comparison
  const overlappedColor1 = colorOverlap(color1, backgroundColor);
  const overlappedColor2 = colorOverlap(color2, backgroundColor);
  switch (measure) {
    case 'pairPreference':
      return pairPreference(overlappedColor1, overlappedColor2);
    case 'harmony':
      return colorHarmony(overlappedColor1, overlappedColor2);
    default:
      return pairPreference(overlappedColor1, overlappedColor2);
  }
};
