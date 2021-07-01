# Color Simulation


## Usage

<a name="colorSimulation" href="#colorSimulation">#</a> **colorSimulation**<i>(color: Color, type: SimulationType="normal") => number</i>

Simulation of color in color blindness and gray scale.

* ***type*** describes the types of simulations that can be performed, the normal case, the eight different modes of color blindness, and the colors in grayscale mode
  * `normal`
  * color blindness (`protanopia`, `protanomaly`, `deuteranopia`, `deuteranomaly`, `tritanopia`, `tritanomaly`, `achromatopsia`, `achromatomaly`)
  * `grayScale`

```ts
import { colorSimulation } from '@antv/smart-color';

const color = {
  model: "rgb",
  value: { r: 91, g: 143, b: 249 },
}; 

colorSimulation(color); 
// { model: "rgb", value: { r: 91, g: 143, b: 249 } }
colorSimulation(color, "achromatopsia");
// { model: 'rgb', value: { r: 122, g: 141, b: 179 } }
colorSimulation(color, "grayScale");
// { model: 'rgb', value: { r: 140, g: 140, b: 140 } }
```

<a name="invertGrayScale" href="#invertGrayScale">#</a> **invertGrayScale**<i>(grayScaleValue: number, color: Color) => Color</i>

Invert the new color from the gray scale value and the original color.

* ***grayScaleValue*** takes values in the range [0,1], defines black at 0 and white at 1.

```ts
import { invertGrayScale } from '@antv/smart-color';

const color = {
  model: "rgb",
  value: { r: 91, g: 143, b: 249 },
}; 

invertGrayScale(0.8, color);
//{
//   model: 'lab',
//   value: { l: 86, a: 15.189939985936984, b: -58.16592090107158 }
// }
```
