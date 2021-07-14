import React, { PureComponent } from 'react';
import { Color, Palette, isContinuousPalette, isMatrixPalette } from 'color-schema-test';
import { Select } from 'antd';
import { cloneDeep } from 'lodash';
import { SimulationType, colorSimulation } from '../../../../src';
import SIMULATION_TYPES from '../../constant/simulationTypes';
import Swatch from '../Swatch';
import './index.less';

const { Option } = Select;

interface ColorSimulatorProps {
  palette: Palette;
}

interface ColorSimulatorState {
  type: SimulationType;
}

function getSimulatedPalette(palette: Palette, type: SimulationType): Palette {
  const newPalette = cloneDeep(palette);
  if (!isContinuousPalette(palette) && !isMatrixPalette(palette)) {
    newPalette.colors = palette.colors.map((color: Color) => colorSimulation(color, type));
  }
  return newPalette;
}

class ColorSimulator extends PureComponent<ColorSimulatorProps> {
  readonly state: ColorSimulatorState = {
    type: SIMULATION_TYPES[0],
  };

  handleChange = (value: SimulationType) => {
    this.setState({
      type: value,
    });
  };

  render() {
    const { type } = this.state;
    const { palette } = this.props;
    return (
      <div>
        <div className="simualtion-type">
          <div className="simualtion-type-text">Simulation Type:</div>
          <Select value={type} style={{ width: 160 }} onChange={this.handleChange}>
            {SIMULATION_TYPES.map((type) => (
              <Option value={type} key={type}>
                {type}
              </Option>
            ))}
          </Select>
        </div>
        <div>Origin Palette:</div>
        <Swatch palette={palette}></Swatch>
        <div>After Color Simuation:</div>
        <Swatch palette={getSimulatedPalette(palette, type)}></Swatch>
      </div>
    );
  }
}

export default ColorSimulator;
