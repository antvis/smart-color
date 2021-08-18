# Professional Test

Provide professional methods to color testing.

## Usage

<a name="colorDifference" href="#colorDifference">#</a> **colorDifference**<i>(color1: Color, color2: Color, configuration: ColorDifferenceConfiguration={}) => number</i>

Computes the differnce between `color1` and `color2`. It supports the assessment of colour differences by different measures, such as `Euclidean difference`, `CIEDE2000`, `contrast ratio`.

* ***configuration*** configure the calculation of color difference.
  
| Properties | Type | Description | Default|  
| ----| ---- | ---- | -----|
| measure | `ColorDifferenceMeasure` | The measure used to evaluate color differences. | `"euclidean"` |
| colorModel |  `ColorModel` | Only valid when measure is "euclidean", used to specify the color model used in computing the distance. | `"lab"` |

* Computes the **Euclidean distance** between two colors in a given color model (default is Lab). 
The range of Euclidean distance is depend on color model.

```ts
import { colorDifference } from '@antv/smart-color';

const color1 = {
  model: "rgb",
  value: { r: 91, g: 143, b: 249 },
}; 
const color2 = {
  model: "rgb",
  value: { r: 101, g: 120, b: 155 },
};

colorDifference(color1, color2); //40.71
colorDifference(color1, color2, {measure: 'euclidean', colorModel: 'rgb'}); //97.29
```

* Computes the difference between two colors by **[CIEDE2000](https://en.wikipedia.org/wiki/Color_difference#CIEDE2000)**.
The range of CIEDE2000 is [0, 100].

```ts
import { colorDifference } from '@antv/smart-color';

const color1 = {
  model: "rgb",
  value: { r: 91, g: 143, b: 249 },
}; 
const color2 = {
  model: "rgb",
  value: { r: 101, g: 120, b: 155 },
};

colorDifference(color1, color2, {measure: 'CIEDE2000'}); //14.12
```

* Computes the difference between two colors by **[Contrast ratio](https://www.w3.org/TR/WCAG21/#dfn-contrast-ratio)**.
The range of Contrast ratio is [1, 21].

```ts
import { colorDifference } from '@antv/smart-color';

const color1 = {
  model: "rgb",
  value: { r: 91, g: 143, b: 249 },
}; 
const color2 = {
  model: "rgb",
  value: { r: 101, g: 120, b: 155 },
};

colorDifference(color1, color2, {measure: 'contrastRatio'});  //1.43
```
