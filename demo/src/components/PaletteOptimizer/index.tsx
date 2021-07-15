import React, { PureComponent } from 'react';
import { Button } from 'antd';
import { Palette } from '@antv/color-schema';
import { paletteOptimization } from '../../../../src';
import Swatch from '../Swatch';
import './index.less';

interface PaletteOptimizerProps {
  palette: Palette;
}

interface PaletteOptimizerState {
  palette: Palette | undefined;
}

class PaletteOptimizer extends PureComponent<PaletteOptimizerProps, PaletteOptimizerState> {
  readonly state: PaletteOptimizerState = {
    palette: undefined,
  };

  componentDidMount() {
    this.reoptimization();
  }

  reoptimization = () => {
    const { palette } = this.props;
    this.setState({
      palette: paletteOptimization(palette),
    });
  };

  render() {
    return (
      <div>
        <Button onClick={() => this.reoptimization()} className="optimization-btn" size="small">
          Reoptimization
        </Button>
        <div>Origin Palette:</div>
        <Swatch palette={this.props.palette}></Swatch>
        <div>After Palette Optimization:</div>
        {this.state.palette && <Swatch palette={this.state.palette}></Swatch>}
      </div>
    );
  }
}

export default PaletteOptimizer;
