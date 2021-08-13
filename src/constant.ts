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
export const COLOR_DISTANCE_MEASURES = ['euclidean', 'CIEDE2000'] as const;
