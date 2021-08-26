import React from 'react';

interface Feature {
  name: string;
  url: string;
  desc?: React.ReactElement;
  childeren?: Feature[];
}
const features: Feature[] = [
  {
    name: 'Palette Generation',
    url: '#paletteGeneration',
    desc: (
      <>
        Generate categorical or discrete scale palette based{' '}
        <a
          href="https://github.com/neoddish/color-palette-json-schema#colorschemetype"
          target="_blank"
          rel="noreferrer"
        >
          color scheme
        </a>
        .
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
    url: '#PaletteExtractor',
    desc: <>Get palettes from strings and images.</>,
    childeren: [
      {
        name: 'from image',
        url: '#getPaletteFromImage',
      },
      {
        name: 'from string',
        url: '#getPaletteFromString',
      },
    ],
  },
  {
    name: 'Color Simulation',
    url: '#colorSimulation',
    desc: <>Simulate color blindness and color in grayscale.</>,
    childeren: [
      {
        name: 'color simulation',
        url: '#colorSimulationFunc',
      },
      {
        name: 'invert grayscale',
        url: '#invertGrayscale',
      },
    ],
  },
  {
    name: 'Color Evaluation',
    url: '#colorEvaluation',
    desc: <>Evaluate color discriminability and aesthetics.</>,
    childeren: [
      {
        name: 'color difference',
        url: '#colorDifference',
      },
      {
        name: 'color aesthetic',
        url: '#colorAesthetic',
      },
    ],
  },
  {
    name: 'Color Computation',
    url: '#colorComputation',
    desc: <>Overlap colors, brighten or darken colors.</>,
    childeren: [
      {
        name: 'color overlap',
        url: '#colorOverlap',
      },
      {
        name: 'color brighten',
        url: '#colorBrighten',
      },
      {
        name: 'color darken',
        url: '#colorDarken',
      },
    ],
  },
  {
    name: 'Color Conversion',
    url: '#colorConversion',
    desc: <>Convert color into different formats.</>,
  },
];

export default features;
