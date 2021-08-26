import React from 'react';
import { Divider } from 'antd';
import { CategoricalPalette } from '@antv/color-schema';
import ColorSimulator from './components/ColorSimulator';
import ColorEvaluator from './components/ColorEvaluator';
import PaletteGenerator from './components/PaletteGenerator';
import PaletteOptimizer from './components/PaletteOptimizer';
import PaletteExtraction from './components/PaletteExtraction';
import Nav from './components/Nav';
import COLOR_ASSET from './constant/colorAsset';
import FEATURES from './constant/features';
import styles from './index.module.less';

export default function App() {
  const palette = COLOR_ASSET.palettes[0] as CategoricalPalette;
  const [color1, color2] = palette.colors;
  const badPalette = COLOR_ASSET.palettes[1] as CategoricalPalette;
  return (
    <>
      <Nav />
      <div className={styles.content}>
        <div>
          <h3 id="intro">A JavaScript library for color computation.</h3>
          <p>@antv/smart-color can:</p>
          <ul>
            {FEATURES.map(({ name, desc }) => (
              <li key={name}>
                {name}: {desc}
              </li>
            ))}
          </ul>
          <p>
            We use the data structure{' '}
            <a href="https://github.com/antvis/color-schema#color" target="_blank" rel="noreferrer">
              Color
            </a>{' '}
            and{' '}
            <a href="https://github.com/antvis/color-schema#palette" target="_blank" rel="noreferrer">
              Palette
            </a>{' '}
            defined by the{' '}
            <a href="https://github.com/antvis/color-schema#readme" target="_blank" rel="noreferrer">
              @antv/color-schema
            </a>
            .
          </p>
        </div>
        <Divider />
        <h2 id="paletteGeneration">Palette Generation</h2>
        <PaletteGenerator />
        <Divider />
        <h2 id="paletteOptimization">Palette Optimization</h2>
        <PaletteOptimizer palette={badPalette} />
        <Divider />
        <h2 id="paletteExtraction">Palette Extraction</h2>
        <PaletteExtraction />
        <Divider />
        <h2 id="colorSimulation">Color Simulation</h2>
        <ColorSimulator palette={palette}></ColorSimulator>
        <Divider />
        <h2 id="colorEvaluation">Color Evaluation</h2>
        <ColorEvaluator color1={color1} color2={color2} />
        <Divider />
      </div>
    </>
  );
}
