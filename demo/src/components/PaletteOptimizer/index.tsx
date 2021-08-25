import React, { PureComponent } from 'react';
import { Select } from 'antd';
import { Palette } from '@antv/color-schema';
import Highlight from 'react-highlight';
import { paletteOptimization } from '../../../../src';
import { COLOR_DIFFERENCE_MEASURES } from '../../../../src/constant';
import { ColorDifferenceMeasure, SimulationType } from '../../../../src/types';
import SIMULATION_TYPES from '../../constant/simulationTypes';
import Swatch from '../Swatch';

const { Option } = Select;
interface PaletteOptimizerProps {
  palette: Palette;
}

interface PaletteOptimizerState {
  colorDifferenceMeasure: ColorDifferenceMeasure;
  simulationType: SimulationType;
  palette: Palette | undefined;
}

class PaletteOptimizer extends PureComponent<PaletteOptimizerProps, PaletteOptimizerState> {
  readonly state: PaletteOptimizerState = {
    colorDifferenceMeasure: COLOR_DIFFERENCE_MEASURES[0],
    simulationType: SIMULATION_TYPES[0],
    palette: undefined,
  };

  componentDidMount() {
    this.reoptimization({});
  }

  handleColorDifferenceMeasureChange = (colorDifferenceMeasure: ColorDifferenceMeasure) => {
    this.setState({
      colorDifferenceMeasure,
    });
    this.reoptimization({ colorDifferenceMeasure });
  };

  handleSimulationTypeChange = (simulationType: SimulationType) => {
    this.setState({
      simulationType,
    });
    this.reoptimization({ simulationType });
  };

  reoptimization = ({
    colorDifferenceMeasure = this.state.colorDifferenceMeasure,
    simulationType = this.state.simulationType,
  }) => {
    const { palette } = this.props;
    this.setState({
      palette: paletteOptimization(palette, { simulationType, colorDifferenceMeasure }),
    });
  };

  render() {
    const { colorDifferenceMeasure, simulationType } = this.state;
    return (
      <div>
        <h3>
          <code>
            <a
              href="https://github.com/antvis/smart-color/blob/smartColorDemo/docs/api/optimizers.md#paletteOptimization"
              target="_blank"
              rel="noreferrer"
            >
              paletteOptimization(palette, configuration)
            </a>
          </code>
        </h3>
        <p>
          Optimize palette to enhance color discriminability. Our optimization strategy is to increase the minimal
          difference among different pairs of colors.
        </p>
        <p>
          As shown in the figure below, we visualize the differences between colors through a matrix. The blocks
          highlighted in red are below the threshold and the corresponding two colors are not easily distinguishable. We
          expect to make the difference between all colors greater than a threshold with the help of an optimization
          algorithm.
        </p>
        <img
          src="https://gw.alipayobjects.com/zos/antfincdn/6VpNTw4PSE/optimize.svg"
          width="600"
          alt="optimize palette"
        ></img>
        <div className="smart-color-example">
          <h4>Example:</h4>

          <div className="attr">
            <div className="name">Color Difference Measure:</div>
            <Select
              value={colorDifferenceMeasure}
              style={{ width: 160 }}
              onChange={this.handleColorDifferenceMeasureChange}
            >
              {COLOR_DIFFERENCE_MEASURES.map((measure) => (
                <Option value={measure} key={measure}>
                  {measure}
                </Option>
              ))}
            </Select>
          </div>

          <div className="attr">
            <div className="name">Simulation Type:</div>
            <Select value={simulationType} style={{ width: 160 }} onChange={this.handleSimulationTypeChange}>
              {SIMULATION_TYPES.map((type) => (
                <Option value={type} key={type}>
                  {type}
                </Option>
              ))}
            </Select>
          </div>

          <div>Input Palette:</div>
          <Highlight>{`const palette = ${JSON.stringify(this.props.palette)};`}</Highlight>
          <Swatch palette={this.props.palette}></Swatch>
          <div>Output Palette (after optimization):</div>
          <Highlight>{`paletteOptimization(palette, ${JSON.stringify(
            JSON.parse(
              `{"colorDifferenceMeasure": "${colorDifferenceMeasure}", "simulationType": "${simulationType}"}`
            ),
            null,
            2
          )});`}</Highlight>
          {this.state.palette && <Swatch palette={this.state.palette}></Swatch>}
        </div>
      </div>
    );
  }
}

export default PaletteOptimizer;
