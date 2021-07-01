import { GenerationResult, GeneratorConfiguration } from '../types';

export type Generation = (
  configuration: { [K in keyof GeneratorConfiguration]-?: GeneratorConfiguration[K] }
) => GenerationResult;
