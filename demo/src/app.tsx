import React from 'react';
import { Divider } from 'antd';
import { CategoricalPalette } from '@antv/color-schema';
import ColorSimulator from './components/ColorSimulator';
import ColorDistance from './components/ColorDistance';
import PaletteGenerator from './components/PaletteGenerator';
import PaletteOptimizer from './components/PaletteOptimizer';
import GetPalette from './components/GetPalette';
import COLOR_ASSET from './constant/colorAsset';
import './index.less';

export default function App() {
  const palette = COLOR_ASSET.palettes[0] as CategoricalPalette;
  const [color1, color2] = palette.colors;
  const badPalette = COLOR_ASSET.palettes[1] as CategoricalPalette;
  return (
    <>
      <h1>Smart Color Demo</h1>
      <Divider />
      <h2>Palette Generation</h2>
      <PaletteGenerator />
      <Divider />
      <h2>Palette Optimization</h2>
      <PaletteOptimizer palette={badPalette} />
      <Divider />
      <h2>Palette Simulation</h2>
      <ColorSimulator palette={palette}></ColorSimulator>
      <Divider />
      <h2>Get Palette</h2>
      <GetPalette />
      <Divider />
      <h2>Professional Test</h2>
      <ColorDistance color1={color1} color2={color2} />
      <Divider />
    </>
  );
}
