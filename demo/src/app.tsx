import React from 'react';
import { Divider } from 'antd';
import ColorSimulator from './components/ColorSimulator';
import ColorEvaluator from './components/ColorEvaluator';
import PaletteGenerator from './components/PaletteGenerator';
import PaletteOptimizer from './components/PaletteOptimizer';
import PaletteExtractor from './components/PaletteExtractor';
import ColorComputation from './components/ColorComputation';
import ColorConversion from './components/ColorConversion';
import Nav from './components/Nav';
import FEATURES from './constant/features';
import styles from './index.module.less';

export default function App() {
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
        <PaletteOptimizer />
        <Divider />
        <h2 id="PaletteExtractor">Palette Extraction</h2>
        <PaletteExtractor />
        <Divider />
        <h2 id="colorSimulation">Color Simulation</h2>
        <ColorSimulator />
        <Divider />
        <h2 id="colorEvaluation">Color Evaluation</h2>
        <ColorEvaluator />
        <Divider />
        <h2 id="colorComputation">Color Computation</h2>
        <ColorComputation />
        <h2 id="colorConversion">Color Conversion</h2>
        <ColorConversion />
        <Divider />
      </div>
    </>
  );
}
