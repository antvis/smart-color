import { ColorDistance } from '@src/types';
import { euclideanDistance } from './euclideanDistance';
import { CIEDE2000 } from './CIEDE2000';

export const colorDistance: ColorDistance = (color1, color2, configuration = { measure: 'euclidean' }) => {
  const { measure = 'euclidean' } = configuration;
  switch (measure) {
    case 'CIEDE2000':
      return CIEDE2000(color1, color2);
    case 'euclidean': {
      // @ts-ignore
      return euclideanDistance(color1, color2, configuration.colorModel);
    }
    default:
      return euclideanDistance(color1, color2);
  }
};
