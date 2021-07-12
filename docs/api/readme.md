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

## Color Convertion

Convet color into different formats.

* [colorToArray](./colorConvertion.md#colorToArray) - Convet [Color](https://github.com/neoddish/color-palette-json-schema#color) into array.
* [arrayToColor](./colorConvertion.md#arrayToColor) - Convet array into [Color](https://github.com/neoddish/color-palette-json-schema#color).
* [colorToHex](./colorConvertion.md#colorToHex) - Convet [Color](https://github.com/neoddish/color-palette-json-schema#color) into hexadecimal string.
* [hexToColor](./colorConvertion.md#hexToColor) - Convet hexadecimal string into [Color](https://github.com/neoddish/color-palette-json-schema#color).
* [colorToGray](./colorConvertion.md#colorToGray) - Convet [Color](https://github.com/neoddish/color-palette-json-schema#color) into gray number.
* [grayToColor](./colorConvertion.md#grayToColor) - Convet gray number into [Color](https://github.com/neoddish/color-palette-json-schema#color).
* [nameToColor](./colorConvertion.md#nameToColor) - Convet valid css color name into [Color](https://github.com/neoddish/color-palette-json-schema#color).
