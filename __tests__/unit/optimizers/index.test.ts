import { CategoricalPalette } from '@antv/color-schema';
import { paletteOptimization, colorDifference, SimulationType, colorSimulation } from '@src/index';

const getMinDifference = (palette: CategoricalPalette, simulationType: SimulationType = 'normal') => {
  let minDifference = Infinity;
  const { colors } = palette;
  for (let i = 0; i < colors.length; i += 1) {
    for (let j = i + 1; j < colors.length; j += 1) {
      minDifference = Math.min(
        colorDifference(colorSimulation(colors[i], simulationType), colorSimulation(colors[j], simulationType)),
        minDifference
      );
    }
  }
  return minDifference;
};

const palette: CategoricalPalette = {
  name: 'AntV10',
  semantic: null,
  type: 'categorical',
  colors: [
    {
      model: 'rgb',
      value: {
        r: 91,
        g: 143,
        b: 249,
      },
    },
    {
      model: 'rgba',
      value: {
        r: 45,
        g: 148,
        b: 179,
        a: 1,
      },
    },
    {
      model: 'rgb',
      value: {
        r: 101,
        g: 120,
        b: 155,
      },
    },
    {
      model: 'rgba',
      value: {
        r: 22,
        g: 90,
        b: 246,
        a: 1,
      },
    },
    {
      model: 'rgb',
      value: {
        r: 114,
        g: 98,
        b: 253,
      },
    },
    {
      model: 'rgb',
      value: {
        r: 120,
        g: 211,
        b: 248,
      },
    },
    {
      model: 'rgb',
      value: {
        r: 150,
        g: 97,
        b: 188,
      },
    },
    {
      model: 'rgba',
      value: {
        r: 20,
        g: 208,
        b: 135,
        a: 1,
      },
    },
    {
      model: 'rgb',
      value: {
        r: 0,
        g: 134,
        b: 133,
      },
    },
    {
      model: 'rgba',
      value: {
        r: 122,
        g: 24,
        b: 149,
        a: 1,
      },
    },
  ],
};
describe('Palette optimization', () => {
  test('palette optimization in normal case', () => {
    const minDifference = getMinDifference(palette);
    const newPalette = paletteOptimization(palette) as CategoricalPalette;
    expect(getMinDifference(newPalette)).toBeGreaterThanOrEqual(minDifference);
  });
  test('palette optimization by CIEDE2000', () => {
    const minDifference = getMinDifference(palette);
    const newPalette = paletteOptimization(palette, { colorDifferenceMeasure: 'CIEDE2000' }) as CategoricalPalette;
    expect(getMinDifference(newPalette)).toBeGreaterThanOrEqual(minDifference);
  });
  test('palette optimization in grayScale', () => {
    const minDifference = getMinDifference(palette, 'grayScale');
    const newPalette = paletteOptimization(palette, {
      simulationType: 'grayScale',
    }) as CategoricalPalette;
    expect(getMinDifference(newPalette, 'grayScale')).toBeGreaterThanOrEqual(minDifference);
  });
  test('palette optimization in color blind simulation', () => {
    const minDifference = getMinDifference(palette, 'protanomaly');
    const newPalette = paletteOptimization(palette, {
      simulationType: 'protanomaly',
    }) as CategoricalPalette;
    expect(getMinDifference(newPalette, 'protanomaly')).toBeGreaterThanOrEqual(minDifference);
  });
});
