# Professional Test

Provide professional methods to color testing.

## Usage

<a name="colorDistance" href="#colorDistance">#</a> **colorDistance**<i>(color1: Color, color2: Color, simulationType: SimulationType="normal") => number</i>

Computes the Euclidean distance between two colors in La\*b\* color model at different simulation type.

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

colorDistance(color1, color2); //41
colorDistance(color1, color2, "grayScale"); //23
```
