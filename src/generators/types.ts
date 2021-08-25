import { Palette } from '@antv/color-schema';
import { GeneratorConfiguration } from '../types';

export type Generation = (
  configuration: { [K in keyof GeneratorConfiguration]-?: GeneratorConfiguration[K] }
) => Palette;
