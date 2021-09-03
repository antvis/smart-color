import { Color } from '@antv/color-schema';

export const COLOR_BLINDNESS_SIMULATION_TYPES = [
  'normal',
  'protanomaly',
  'deuteranomaly',
  'tritanomaly',
  'protanopia',
  'deuteranopia',
  'tritanopia',
  'achromatomaly',
  'achromatopsia',
] as const;
// color optimization configuration
export const TENDENCIES = ['tint', 'shade'] as const;
export const COLOR_DIFFERENCE_MEASURES = ['euclidean', 'CIEDE2000', 'contrastRatio'] as const;

export const COLOR_AESTHETIC_MEASURES = ['pairPreference', 'harmony'] as const;

export const WHITE: Color = {
  model: 'rgb',
  value: {
    r: 255,
    g: 255,
    b: 255,
  },
};

// Separable blend modes https://www.w3.org/TR/compositing/#blendingseparable
export const SEPARABLE_BLEND_MODES = [
  'normal',
  'darken',
  'multiply',
  'colorBurn',
  'linearBurn',
  'lighten',
  'screen',
  'colorDodge',
  'linearDodge',
  'overlay',
  'softLight',
  'hardLight',
  'vividLight',
  'linearLight',
  'pinLight',
  'difference',
  'exclusion',
];

// Non-separable blend modes https://www.w3.org/TR/compositing/#blendingnonseparable
export const NON_SEPARABLE_BLEND_MODES = ['hue', 'saturation', 'color', 'luminosity'] as const;

export const BLEND_MODES = [...SEPARABLE_BLEND_MODES, ...NON_SEPARABLE_BLEND_MODES] as const;
