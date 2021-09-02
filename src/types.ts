import {
  Color,
  Palette,
  ColorModel,
  ColorSchemeType,
  CategoricalPalette,
  DiscreteScalePalette,
} from '@antv/color-schema';
import {
  COLOR_BLINDNESS_SIMULATION_TYPES,
  TENDENCIES,
  COLOR_DIFFERENCE_MEASURES,
  COLOR_AESTHETIC_MEASURES,
} from './constant';

// color simulation
export type ColorBlindnessSimulationType = typeof COLOR_BLINDNESS_SIMULATION_TYPES[number];
export type GrayscaleType = 'grayscale';
export type SimulationType = ColorBlindnessSimulationType | GrayscaleType;
export type ColorSimulation = (
  color: Color,
  // default value: 'normal'
  type?: SimulationType
) => Color;

// professional test
export type ColorDifferenceMeasure = typeof COLOR_DIFFERENCE_MEASURES[number];
type ColorDifferenceGeneralConfiguration = {
  // If the color is semi-transparent, the color will be overlapped on the backgroundColor
  // default value: white
  backgroundColor?: Color;
};
export type ColorDifferenceConfiguration = ColorDifferenceGeneralConfiguration &
  (
    | {
        // default value: 'euclidean'
        measure?: ColorDifferenceMeasure;
      }
    | {
        measure: 'euclidean';
        // default value: 'lab'
        colorModel?: ColorModel;
      }
  );
export type ColorDifference = (color1: Color, color2: Color, configuration?: ColorDifferenceConfiguration) => number;
export type ColorAestheticMeasure = typeof COLOR_AESTHETIC_MEASURES[number];
export type ColorAestheticConfiguration = {
  measure: ColorAestheticMeasure;
  // If the color is semi-transparent, the color will be overlapped on the backgroundColor
  // default value: white
  backgroundColor?: Color;
};
export type ColorAesthetic = (color1: Color, color2: Color, configuration?: ColorAestheticConfiguration) => number;

// palette optimization
export type OptimizerConfiguration = {
  // default value: []
  locked?: boolean[];
  // default value: 'normal'
  simulationType?: SimulationType;
  threshold?: number;
  // the colours change randomly based on this model
  // default value: 'hsv'
  colorModel?: ColorModel;
  // default value: 'euclidean'
  colorDifferenceMeasure?: ColorDifferenceMeasure;
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

export type PaletteGeneration = (
  // default value: monochromatic
  type?: ColorSchemeType,
  configuration?: GeneratorConfiguration
) => CategoricalPalette | DiscreteScalePalette;

// color compution
export type ColorOverlap = (colorTop: Color, colorBottom: Color) => Color;
export type ColorDarken = (color: Color, value?: number) => Color;
export type ColorBrighten = (color: Color, value?: number) => Color;
