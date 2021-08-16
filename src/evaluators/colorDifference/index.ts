import { ColorDifference } from '@src/types';
import { WHITE } from '../../constant';
import { colorOverlap } from '../../utils';
import { euclideanDistance } from './euclideanDistance';
import { CIEDE2000 } from './CIEDE2000';
import { contrastRatio } from './contrastRatio';

export const colorDifference: ColorDifference = (color1, color2, configuration = { measure: 'euclidean' }) => {
  const { measure = 'euclidean', backgroundColor = WHITE } = configuration;
  // If the color is semi-transparent, the color will be overlaid on a white background by default for comparison
  const overlappedColor1 = colorOverlap(color1, backgroundColor);
  const overlappedColor2 = colorOverlap(color2, backgroundColor);
  switch (measure) {
    case 'CIEDE2000':
      return CIEDE2000(overlappedColor1, overlappedColor2);
    case 'euclidean':
      // @ts-ignore
      return euclideanDistance(overlappedColor1, overlappedColor2, configuration.colorModel);
    case 'contrastRatio':
      return contrastRatio(overlappedColor1, overlappedColor2);
    default:
      return euclideanDistance(overlappedColor1, overlappedColor2);
  }
};
