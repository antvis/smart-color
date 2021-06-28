import { Color } from 'color-schema-test';
import { GenerationResult, GeneratorConfig } from '../types';

export type Generation = (
  colors: (Color | undefined)[],
  config: { [K in keyof GeneratorConfig]-?: GeneratorConfig[K] }
) => GenerationResult;
