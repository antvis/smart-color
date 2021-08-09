# Palette Optimization

## Usage

<a name="paletteOptimization" href="#paletteOptimization">#</a> **paletteOptimization**<i>(palette: Palette, configuration: OptimizerConfiguration={}) => Palette</i>

Automatic palette optimization enables colors in the palette to be distinguished more easily.

* ***palette*** is the palette that needs to be optimized.
* ***configuration*** configure the palette optimization.
  
| Properties | Type | Description | Default|  
| ----| ---- | ---- | -----|
| simulationType | `SimulationType` |The types of simulations, the normal case, the eight different modes of color blindness, and the colors in grayscale mode. | `"normal"` |
| locked |  `boolean[]` | Each item in the array indicates whether the color of the same index in the color palette should be kept constant during optimization. | `[]` |
| colorDifference | `ColorDifferenceMethod` | Method used to assess colour differences when optimizing. You can find more details in [Professional Test](./professionalTest.md).  | `colorDistance` |
| threshold | `number` | The minimum distance expected to be achieved between the colors in the optimized palette. Since different color difference methods have different ranges of values, they have different default thresholds. However, this threshold is not always reached in each optimization, and it depends mainly on the number of colors in this palette and the distance at the beginning. | `30`(colorDistance)<br>`20`(CIEDE2000) |
| colorModel | `ColorModel` | The color model used in the optimization. Not effective in grayscale mode. | `hsv` |

```ts
import { PaletteOptimization } from '@antv/smart-color';

const palette = {
  name: "color4",
  semantic: null,
  type: "categorical",
  colors: [
    { model: "rgb", value: { r: 101, g: 120, b: 155 }, },
    { model: "rgb", value: { r: 91, g: 143, b: 249 }, },
    { model: "rgb", value: { r: 97, g: 221, b: 170 }, },
    { model: "rgb", value: { r: 246, g: 189, b: 22 }, }
  ],
}
paletteOptimization(palette, {
  locked: [true],
  simulationType: "grayScale"
});
// {
//   name: 'color4',
//   semantic: null,
//   type: 'categorical',
//   colors: [
//     { model: 'lab', value: { l: 50, a: 1.884390226403243, b: -21.110092594683195 } },
//     { model: 'lab', value: { l: 67, a: 15.189939985936984, b: -58.16592090107158 } },
//     { model: 'lab', value: { l: 88, a: -46.47148306857496, b: 14.77171302964486 } },
//     { model: 'lab', value: { l: 107, a: 7.792165626943515, b: 79.05751395687457 } }
//   ]
// }
```

<div align="center">
  <div>
    <span>Before:</span>
    <img src="https://gw.alipayobjects.com/zos/antfincdn/jT0dtYywS8/jieping2021-07-01%252520xiawu3.24.42.png" alt="palette before optimization">
  </div>
  <div>
    After:
    <img src="https://gw.alipayobjects.com/zos/antfincdn/HCdz8Z8kr%26/jieping2021-07-01%252520xiawu3.24.29.png" alt="palette after optimization" >
  </div>
</div>
