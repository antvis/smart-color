# Color Conversion

Computation between colors.

## Usage

<a name="colorOverlap" href="#colorOverlap">#</a> **colorOverlap**<i>(colorTop: Color, colorBottom: Color) => Color</i>

Computes the color when two colors are overlaid on top and bottom.

```ts
import { colorOverlap } from '@antv/smart-color';

const red = {
  model: 'rgba',
  value: { r: 255, g: 0, b: 0, a: 0.4 },
};

const blue = {
  model: 'rgba',
  value: { r: 0, g: 0, b: 255, a: 0.8 },
};

const color1 = colorOverlap(blue, red);
// { model: 'rgba', value: { r: 23, g: 0, b: 232, a: 0.88 } } 
const color2 = colorOverlap(red, blue);
// { model: 'rgba', value: { r: 116, g: 0, b: 139, a: 0.88 } }
```

<div align="center">
  <img src="https://gw.alipayobjects.com/zos/antfincdn/hQzDd28BSp/colorOverlap.jpg" alt="auto generated palette">
</div>
