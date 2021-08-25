import React from 'react';

interface Feature {
  name: string;
  url: string;
  desc: React.ReactElement;
}
const features: Feature[] = [
  {
    name: 'Palette Generation',
    url: '#paletteGeneration',
    desc: (
      <>
        Generate categorical or discrete scale palette based
        <a href="https://github.com/neoddish/color-palette-json-schema#colorschemetype">color scheme</a>.
      </>
    ),
  },
  {
    name: 'Palette Optimization',
    url: '#paletteOptimization',
    desc: <>Optimize palette to enhance color discriminability.</>,
  },
  {
    name: 'Palette Extraction',
    url: '#paletteExtraction',
    desc: <>Get palettes from strings and images.</>,
  },
  {
    name: 'Color Simulation',
    url: '#colorSimulation',
    desc: <>Simulate color blindness and color in grayscale.</>,
  },
  {
    name: 'Color Evaluation',
    url: '#colorEvaluation',
    desc: <>Evaluate color discriminability and aesthetics.</>,
  },
  {
    name: 'Color Computation',
    url: '#colorComputation',
    desc: <>Overlap colors, brighten or darken colors.</>,
  },
  {
    name: 'Color Conversion',
    url: '#colorConversion',
    desc: <>Convert color into different formats.</>,
  },
];

export default features;
