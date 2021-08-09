# Professional Test

Provide professional methods to color testing.

## Usage

<a name="colorDistance" href="#colorDistance">#</a> **colorDistance**<i>(color1: Color, color2: Color, colorModel: ColorModel="lab") => number</i>

Computes the Euclidean distance between two colors in a given color model (default is Lab).

```ts
import { colorDistance } from '@antv/smart-color';

const color1 = {
  model: "rgb",
  value: { r: 91, g: 143, b: 249 },
}; 
const color2 = {
  model: "rgb",
  value: { r: 101, g: 120, b: 155 },
};

colorDistance(color1, color2); //40.71
colorDistance(color1, color2, "rgb"); //97.29
```

<a name="CIEDE2000" href="#CIEDE2000">#</a> **CIEDE2000**<i>(color1: Color, color2: Color) => number</i>

Computes the difference between two colors in [CIEDE2000 color difference algorithm](https://en.wikipedia.org/wiki/Color_difference#CIEDE2000).

```ts
import { CIEDE2000 } from '@antv/smart-color';

const color1 = {
  model: "rgb",
  value: { r: 91, g: 143, b: 249 },
}; 
const color2 = {
  model: "rgb",
  value: { r: 101, g: 120, b: 155 },
};

CIEDE2000(color1, color2); //40.71
```
