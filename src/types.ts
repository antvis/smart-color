import { Color, Palette, ColorModel, ColorSchemeType } from '@antv/color-schema';
import { COLOR_BLINDNESS_SIMULATION_TYPES, TENDENCIES, COLOR_DISTANCE_MEASURES } from './constant';

// color simulation
export type ColorBlindnessSimulationType = typeof COLOR_BLINDNESS_SIMULATION_TYPES[number];
export type GrayScaleType = 'grayScale';
export type SimulationType = ColorBlindnessSimulationType | GrayScaleType;
export type ColorSimulation = (
  color: Color,
  // default value: 'normal'
  type?: SimulationType
) => Color;

export type ColorDistanceMeasure = typeof COLOR_DISTANCE_MEASURES[number];
// palette optimization
export type OptimizerConfiguration = {
  // default value: []
  locked?: boolean[];
  // default value: 'normal'
  simulationType?: SimulationType;
  threshold?: number;
  // default value: 'hsv'
  colorModel?: ColorModel;
  // default value: 'euclidean'
  colorDistanceMeasure?: ColorDistanceMeasure;
  // for semi-transparent colors
  backgroundColor?: Color;
};
export type PaletteOptimization = (palette: Palette, configuration?: OptimizerConfiguration) => Palette;

// palette generation
type Tendency = typeof TENDENCIES[number];
export type GeneratorConfiguration = {
  count?: number;
  // basic color
  color?: Color;
  // locked colors
  colors?: (Color | undefined)[];
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
  // default value: monochromatic
  type?: ColorSchemeType,
  configuration?: GeneratorConfiguration
) => GenerationResult;

// Professional test
type ColorDistanceGeneralConfiguration = {
  // If the color is semi-transparent, the color will be overlaid on the backgroundColor
  // default value: white
  backgroundColor?: Color;
};
export type ColorDistanceConfiguration = ColorDistanceGeneralConfiguration &
  (
    | {
        measure: 'euclidean';
        // default value: 'lab'
        colorModel?: ColorModel;
      }
    | {
        measure: 'CIEDE2000' | 'contrastRatio';
      }
  );
export type ColorDistance = (color1: Color, color2: Color, configuration?: ColorDistanceConfiguration) => number;

// Color compution
export type ColorOverlap = (colorTop: Color, colorBottom: Color) => Color;
