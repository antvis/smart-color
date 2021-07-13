# API Reference

There are six parts of API reference for @antv/smart-color. Follow the links below to learn more. 

In smart-color, we use the data structure [Color](https://github.com/neoddish/color-palette-json-schema#color) and [Palette](https://github.com/neoddish/color-palette-json-schema#palette) defined by the [color schema](https://github.com/neoddish/color-palette-json-schema#readme).

* [Palette Generation](#palette-generation)
  
* [Palette Optimization](#palette-optimization)
  
* [Color Simulation](#color-simulation)

* [Professional Test](#professional-test)
  
* [Get Palette](#get-palette)

* [Color Convertion](#color-convertion)

## Palette Generation

* [paletteGeneration](./generators.md#paletteGeneration) Automatic generation of continuous or categorical palette based on [color scheme](https://github.com/neoddish/color-palette-json-schema#colorschemetype).

## Palette Optimization

* [paletteOptimization](./optimizers.md#paletteOptimization) Automatic palette optimization enables colors in the palette to be distinguished more easily.
  
## Color Simulation

* [colorSimulation](./simulators.md#colorSimulation) Simulation of color in color blind and gray scale.

* [invertGrayScale](./simulators.md#invertGrayScale) Invert the new color from the gray value and the original color.

## Professional Test

Provide professional methods to color testing.

* [colorDistance](./professionalTest.md#colorDistance) Computes the Euclidean distance between two colors in La\*b\* color model.

## Get Palette

Get palettes from strings and images.

* [getPaletteFromImage](./getPalette.md#getPaletteFromImage) Get palettes from images.
* [getPaletteFromString](./getPalette.md#getPaletteFromString) Get palettes from strings.

## Color Conversion

Convert color into different formats.

* [colorToArray](./colorConversion.md#colorToArray) - Convert [Color](https://github.com/neoddish/color-palette-json-schema#color) into array.
* [arrayToColor](./colorConversion.md#arrayToColor) - Convert array into [Color](https://github.com/neoddish/color-palette-json-schema#color).
* [colorToHex](./colorConversion.md#colorToHex) - Convert [Color](https://github.com/neoddish/color-palette-json-schema#color) into hexadecimal string.
* [hexToColor](./colorConversion.md#hexToColor) - Convert hexadecimal string into [Color](https://github.com/neoddish/color-palette-json-schema#color).
* [colorToGray](./colorConversion.md#colorToGray) - Convert [Color](https://github.com/neoddish/color-palette-json-schema#color) into gray number.
* [grayToColor](./colorConversion.md#grayToColor) - Convert gray number into [Color](https://github.com/neoddish/color-palette-json-schema#color).
* [nameToColor](./colorConversion.md#nameToColor) - Convert valid css color name into [Color](https://github.com/neoddish/color-palette-json-schema#color).
