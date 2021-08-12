import React, { PureComponent } from 'react';
import { Button, Select } from 'antd';
import { Palette } from '@antv/color-schema';
import { paletteOptimization } from '../../../../src';
import { COLOR_DISTANCE_MEASURES } from '../../../../src/constant';
import { ColorDistanceMeasure } from '../../../../src/types';
import Swatch from '../Swatch';
import './index.less';

const { Option } = Select;
interface PaletteOptimizerProps {
  palette: Palette;
}

interface PaletteOptimizerState {
  colorDistanceMeasure: ColorDistanceMeasure;
  palette: Palette | undefined;
}

class PaletteOptimizer extends PureComponent<PaletteOptimizerProps, PaletteOptimizerState> {
  readonly state: PaletteOptimizerState = {
    colorDistanceMeasure: COLOR_DISTANCE_MEASURES[0],
    palette: undefined,
  };

  componentDidMount() {
    this.reoptimization();
  }

  handleChange = (value: ColorDistanceMeasure) => {
    this.setState({
      colorDistanceMeasure: value,
    });
    this.reoptimization(value);
  };

  reoptimization = (colorDistanceMeasure = this.state.colorDistanceMeasure) => {
    const { palette } = this.props;
    this.setState({
      palette: paletteOptimization(palette, { colorDistanceMeasure }),
    });
  };

  render() {
    const { colorDistanceMeasure } = this.state;
    return (
      <div>
        <div className="optimization-type">
          <div className="optimization-type-text">Color Difference:</div>
          <Select value={colorDistanceMeasure} style={{ width: 160 }} onChange={this.handleChange}>
            {COLOR_DISTANCE_MEASURES.map((measure) => (
              <Option value={measure} key={measure}>
                {measure}
              </Option>
            ))}
          </Select>
          <Button onClick={() => this.reoptimization()} className="optimization-btn" size="small">
            Reoptimization
          </Button>
        </div>
        <div>Origin Palette:</div>
        <Swatch palette={this.props.palette}></Swatch>
        <div>After Palette Optimization:</div>
        {this.state.palette && <Swatch palette={this.state.palette}></Swatch>}
      </div>
    );
  }
}

export default PaletteOptimizer;
