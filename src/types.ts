import { Color, Palette, ColorModel, ColorSchemeType } from 'color-schema-test';
import { COLOR_BLINDNESS_SIMULATION_TYPES, TENDENCIES } from './constant';

// color simulation
export type ColorBlindnessSimulationType = typeof COLOR_BLINDNESS_SIMULATION_TYPES[number];
export type GrayScaleType = 'grayScale';
export type SimulationType = ColorBlindnessSimulationType | GrayScaleType;
export type ColorSimulation = (
  color: Color,
  // default value: 'normal'
  type?: SimulationType
) => Color;

// palette optimization
export type PaletteOptimization = (
  palette: Palette,
  // default value: []
  locked?: boolean[],
  // default value: 'normal'
  simulationType?: SimulationType,
  threshold?: number,
  // default value: 'hsv'
  colorModel?: ColorModel
) => Palette;

// palette generation
type Tendency = typeof TENDENCIES[number];
export type GeneratorConfig = {
  count?: number;
  color?: Color;
  tendency?: Tendency;
};
interface SuccessResult {
  status: 'success';
  palette: Palette;
}
interface ErrorResult {
  status: 'error';
  msg: string;
}
export type GenerationResult = SuccessResult | ErrorResult;
export type PaletteGeneration = (
  // defalut value: monochromatic
  type?: ColorSchemeType,
  // locked colors
  colors?: (Color | undefined)[],
  config?: GeneratorConfig
) => GenerationResult;

// Professional test
export type ColorDistance = (color1: Color, color2: Color, simulationType?: SimulationType) => number;
