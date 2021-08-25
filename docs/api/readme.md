# API Reference

There are seven parts of API reference for @antv/smart-color. Follow the links below to learn more. 

In @antv/smart-color, we use the data structure [Color](https://github.com/antvis/color-schema#color) and [Palette](https://github.com/antvis/color-schema#palette) defined by the [@antv/color-schema](https://github.com/antvis/color-schema#readme).

* [Palette Generation](#palette-generation): Generate categorical or discrete scale palette based on [color scheme](https://github.com/neoddish/color-palette-json-schema#colorschemetype).
  
* [Palette Optimization](#palette-optimization): Optimize palette to enhance color discriminability.

* [Palette Extraction](#palette-extraction): Get palettes from strings and images.
  
* [Color Simulation](#color-simulation): Simulate color blindness and color in grayscale.

* [Color Evaluation](#color-evaluation): Evaluate color discriminability and aesthetics.

* [Color Computation](#color-computation): Overlap colors, brighten or darken colors.

* [Color Convertion](#color-conversion): Convert color into different formats.

## Palette Generation

* [paletteGeneration](./generators.md#paletteGeneration) - Generate categorical or discrete scale palette based on [color scheme](https://github.com/neoddish/color-palette-json-schema#colorschemetype).

## Palette Optimization

* [paletteOptimization](./optimizers.md#paletteOptimization) - Optimize palette to enhance color discriminability.
  
## Palette Extraction

* [getPaletteFromImage](./extractors.md#getPaletteFromImage) - Get palettes from images.
* [getPaletteFromString](./extractors.md#getPaletteFromString) - Get palettes from strings.

## Color Simulation

* [colorSimulation](./simulators.md#colorSimulation) - Simulate color blindness and color in grayscale.
* [invertGrayScale](./simulators.md#invertGrayScale) - Invert the new color from the gray value and the original color.

## Color Evaluation

* [colorDifference](./evaluators.md#colorDifference) - Evaluate the discriminability between two colors.
* [colorAesthetic](./evaluators.md#colorAesthetic) - Evaluate the aesthetic between two colors.

## Color Computation

* [colorOverlap](./colorComputation.md#colorOverlap) - Compute the color when two colors are overlaid on top and bottom.
* [colorBrighten](./colorComputation.md#colorBrighten) - Compute the brighter color.
* [colorDarken](./colorComputation.md#colorDarken) - Compute the darker color.

## Color Conversion

* [colorToArray](./colorConversion.md#colorToArray) - Convert [Color](https://github.com/neoddish/color-palette-json-schema#color) into array.
* [arrayToColor](./colorConversion.md#arrayToColor) - Convert array into [Color](https://github.com/neoddish/color-palette-json-schema#color).
* [colorToHex](./colorConversion.md#colorToHex) - Convert [Color](https://github.com/neoddish/color-palette-json-schema#color) into hexadecimal string.
* [hexToColor](./colorConversion.md#hexToColor) - Convert hexadecimal string into [Color](https://github.com/neoddish/color-palette-json-schema#color).
* [colorToGray](./colorConversion.md#colorToGray) - Convert [Color](https://github.com/neoddish/color-palette-json-schema#color) into gray number.
* [grayToColor](./colorConversion.md#grayToColor) - Convert gray number into [Color](https://github.com/neoddish/color-palette-json-schema#color).
* [nameToColor](./colorConversion.md#nameToColor) - Convert valid css color name into [Color](https://github.com/neoddish/color-palette-json-schema#color).
