import React, { PureComponent } from 'react';
import { Button, Select } from 'antd';
import { Palette } from '@antv/color-schema';
import { paletteOptimization } from '../../../../src';
import { COLOR_DIFFERENCE_METHODS } from '../../../../src/constant';
import { ColorDifferenceMethod } from '../../../../src/types';
import Swatch from '../Swatch';
import './index.less';

const { Option } = Select;
interface PaletteOptimizerProps {
  palette: Palette;
}

interface PaletteOptimizerState {
  colorDiffernce: ColorDifferenceMethod;
  palette: Palette | undefined;
}

class PaletteOptimizer extends PureComponent<PaletteOptimizerProps, PaletteOptimizerState> {
  readonly state: PaletteOptimizerState = {
    colorDiffernce: COLOR_DIFFERENCE_METHODS[0],
    palette: undefined,
  };

  componentDidMount() {
    this.reoptimization();
  }

  handleChange = (value: ColorDifferenceMethod) => {
    this.setState({
      colorDiffernce: value,
    });
    this.reoptimization(value);
  };

  reoptimization = (colorDiffernce = this.state.colorDiffernce) => {
    const { palette } = this.props;
    this.setState({
      palette: paletteOptimization(palette, { colorDiffernce }),
    });
  };

  render() {
    const { colorDiffernce } = this.state;
    return (
      <div>
        <div className="optimization-type">
          <div className="optimization-type-text">Color Difference:</div>
          <Select value={colorDiffernce} style={{ width: 160 }} onChange={this.handleChange}>
            {COLOR_DIFFERENCE_METHODS.map((method) => (
              <Option value={method} key={method}>
                {method}
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
