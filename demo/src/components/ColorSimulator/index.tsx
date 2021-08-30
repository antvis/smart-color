import React, { PureComponent } from 'react';
import { Color, Palette, isContinuousPalette, isMatrixPalette, CategoricalPalette } from '@antv/color-schema';
import { Select, InputNumber } from 'antd';
import { cloneDeep } from 'lodash';
import Highlight from 'react-highlight';
import { SimulationType, colorSimulation, invertGrayscale } from '../../../../src';
import SIMULATION_TYPES from '../../constant/simulationTypes';
import COLOR_ASSET from '../../constant/colorAsset';
import Swatch from '../Swatch';
import Block from '../Block';

const { Option } = Select;
const palette = COLOR_ASSET.palettes[0] as CategoricalPalette;
const [color] = palette.colors;

interface ColorSimulatorState {
  colorSimulationType: SimulationType;
  paletteSimulationType: SimulationType;
  simulatedColor: Color;
  invertColor: Color;
  grayscale: number;
}

function paletteSimulation(palette: Palette, type: SimulationType): Palette {
  const newPalette = cloneDeep(palette);
  if (!isContinuousPalette(palette) && !isMatrixPalette(palette)) {
    newPalette.colors = palette.colors.map((color: Color) => colorSimulation(color, type));
  }
  return newPalette;
}

class ColorSimulator extends PureComponent {
  readonly state: ColorSimulatorState = {
    colorSimulationType: SIMULATION_TYPES[0],
    paletteSimulationType: SIMULATION_TYPES[0],
    simulatedColor: color,
    invertColor: color,
    grayscale: 0.5,
  };

  handleColorSimulationTypeChange = (value: SimulationType) => {
    this.setState({
      colorSimulationType: value,
    });
  };

  handlePaletteSimulationTypeChange = (value: SimulationType) => {
    this.setState({
      paletteSimulationType: value,
    });
  };

  handleSimulatedColorChange = (color: Color) => {
    this.setState({ simulatedColor: color });
  };

  handleInvertColorChange = (color: Color) => {
    this.setState({ invertColor: color });
  };

  handleGrayscaleChange = (grayscale: number) => {
    this.setState({ grayscale });
  };

  render() {
    const { colorSimulationType, paletteSimulationType, simulatedColor, invertColor, grayscale } = this.state;
    return (
      <>
        <div>
          <h3 id="colorSimulationFunc">
            <code>
              <a
                href="https://github.com/antvis/smart-color/blob/master/docs/api/simulators.md#colorSimulation"
                target="_blank"
                rel="noreferrer"
              >
                colorSimulation(color, simulationType)
              </a>
            </code>
          </h3>
          <p>Simulate color blindness and color in grayscale.</p>
          <div className="smart-color-example">
            <h4>Example (color simulation):</h4>
            <div className="attr">
              <div className="name">color:</div>
              <div className="value">
                <Block color={simulatedColor} onChange={this.handleSimulatedColorChange} size={20}></Block>
              </div>
            </div>

            <div className="attr">
              <div className="name">simulation type:</div>
              <Select
                value={colorSimulationType}
                style={{ width: 160 }}
                onChange={this.handleColorSimulationTypeChange}
              >
                {SIMULATION_TYPES.map((type) => (
                  <Option value={type} key={type}>
                    {type}
                  </Option>
                ))}
              </Select>
            </div>

            <Highlight>{`const color = ${JSON.stringify(simulatedColor)};
colorSimulation(color, "${colorSimulationType}");`}</Highlight>
            <Block color={colorSimulation(simulatedColor, colorSimulationType)}></Block>
          </div>
          <div className="smart-color-example">
            <h4>Example (palette simulation):</h4>

            <div className="attr">
              <div className="name">simulation type:</div>
              <Select
                value={paletteSimulationType}
                style={{ width: 160 }}
                onChange={this.handlePaletteSimulationTypeChange}
              >
                {SIMULATION_TYPES.map((type) => (
                  <Option value={type} key={type}>
                    {type}
                  </Option>
                ))}
              </Select>
            </div>

            <div>Input Palette:</div>
            <Highlight>{`const palette = ${JSON.stringify(palette)};`}</Highlight>
            <Swatch palette={palette}></Swatch>
            <div>Output Palette (after color simuation):</div>
            <Highlight>{`import { Color, Palette, isContinuousPalette, isMatrixPalette } from '@antv/color-schema';
import { cloneDeep } from 'lodash';

function paletteSimulation(palette: Palette, type: SimulationType): Palette {
  const newPalette = cloneDeep(palette);
  if (!isContinuousPalette(palette) && !isMatrixPalette(palette)) {
    newPalette.colors = palette.colors.map((color: Color) => colorSimulation(color, type));
  }
  return newPalette;
}

paletteSimulation(palette, "${paletteSimulationType}");`}</Highlight>
            <Swatch palette={paletteSimulation(palette, paletteSimulationType)}></Swatch>
          </div>
        </div>
        <div>
          <h3 id="invertGrayscale">
            <code>
              <a
                href="https://github.com/antvis/smart-color/blob/master/docs/api/simulators.md#invertGrayscale"
                target="_blank"
                rel="noreferrer"
              >
                invertGrayscale(grayscale, color)
              </a>
            </code>
          </h3>
          <p>Invert the new color from the gray scale value and the original color.</p>
          <div className="smart-color-example">
            <h4>Example:</h4>

            <div className="attr">
              <div className="name">gray scale:</div>
              <InputNumber value={grayscale} min={0} max={1} step="0.01" onChange={this.handleGrayscaleChange} />
            </div>

            <div className="attr">
              <div className="name">color:</div>
              <div className="value">
                <Block color={invertColor} onChange={this.handleInvertColorChange} size={20}></Block>
              </div>
            </div>

            <Highlight>{`const color = ${JSON.stringify(invertColor)};
invertGrayscale(${grayscale}, color);`}</Highlight>
            <Block color={invertGrayscale(grayscale, invertColor)}></Block>
          </div>
        </div>
      </>
    );
  }
}

export default ColorSimulator;
