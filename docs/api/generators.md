# Palette Generation

## Usage

<a name="paletteGeneration" href="#paletteGeneration">#</a> **paletteGeneration**<i>(type: ColorSchemeType="monochromatic", configuration: OptimizerConfiguration={}) => GenerationResult</i>

Generate continuous or categorical palette based on [color scheme](https://github.com/neoddish/color-palette-json-schema#colorschemetype).

When a palette is successfully generated, the status is `success` and the generated palette is returned.

```ts
{
  status: 'success';
  palette: Palette;
}
```

When generating a palette fails, the status is `error` and an error message is returned.

```ts
{
  status: 'error';
  msg: string;
}
```

* ***type*** describes which color schema is used to generate the palettes. Different color schema will generate different types of palettes.
  
| Color scheme | Palette type | 
| ----| ---- | 
| monochromatic | discrete-scale | 
| analogous | discrete-scale | 
| achromatic | discrete-scale | 
| complementary | discrete-scale | 
| split-complementary |categorical | 
| triadic| categorical | 
| tetradic | categorical | 
| polychromatic | categorical | 
| customized| categorical| 

* ***configuration*** configure the palette optimization.
  
| Properties | Type | Description | Default|  
| ----| ---- | ---- | -----|
| count | `number` | The number of colors expected to be included in the palette. | `8` |
| color |  `Color` | The primary color, generally be the brand color. | random |
| colors | `(Color \| undefined)[]` | Each item in the array indicates that the same color is expected to appear at the same index of the generated palette. | `[]` |
| tendency | `tint \| shade` | Color trends of discrete-scale palette. | `tint` |

```ts
import { paletteGeneration } from '@antv/smart-color';

paletteGeneration("monochromatic", {
  color: {
    model: "rgb",
    value: { r: 91, g: 143, b: 249 },
  },
  colors: [{
    model: "rgb",
    value: { r: 0, g: 143, b: 249 },
  }]
  count: 7,
  tendency: "shade"
});
// {
//   status: 'error',
//   msg: 'Continuous palette cannot be generated when colors are locked.'
// }

paletteGeneration("monochromatic", {
  color: {
    model: "rgb",
    value: { r: 91, g: 143, b: 249 },
  },
  count: 7,
  tendency: "shade"
});
// {
//   status: 'success',
//   palette: {
//     name: 'monochromatic',
//     semantic: null,
//     type: 'discrete-scale',
//     colors: [
//       { model: 'lab', value: { l: 83.74, a: -6.81, b: -24.76 } },
//       { model: 'lab', value: { l: 71.69, a: 0.09, b: -43.46 },
//       { model: 'lab', value: { l: 59.67, a: 7.64, b: -59.28 }, 
//       { model: 'lab', value: { l: 46.47, a: 7.14, b: -59.32 },
//       { model: 'lab', value: { l: 34.34, a: 10.40, b: -57.50 },
//       { model: 'lab', value: { l: 23.17, a: 16.63, b: -54.50 },
//       { model: 'lab', value: { l: 12.94, a: 21.15, b: -49.67 }
//     ]
//   }
// }
```

<div align="center">
  <img src="https://gw.alipayobjects.com/zos/antfincdn/vmwgZKfSZB/jieping2021-07-01%252520xiawu3.01.26.png" alt="auto generated palette">
</div>
