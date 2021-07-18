import React, { Component } from 'react';
import { Palette } from '@antv/color-schema';
import { Slider, InputNumber } from 'antd';
import { isEqual } from 'lodash';
import { getPaletteFromImage } from '../../../../src';
import Swatch from '../Swatch';
import './index.less';

interface PaletteByImageProps {
  image: string;
}
interface PaletteByImageState {
  colorCount: number;
  palette: Palette | undefined;
}
class PaletteByImage extends Component<PaletteByImageProps, PaletteByImageState> {
  readonly state: PaletteByImageState = {
    colorCount: 8,
    palette: undefined,
  };

  shouldComponentUpdate(nextProps: PaletteByImageProps, nextState: PaletteByImageState) {
    if (
      this.state.colorCount !== nextState.colorCount ||
      this.props.image !== nextProps.image ||
      !isEqual(this.state.palette?.colors, nextState.palette?.colors)
    ) {
      return true;
    }
    return false;
  }

  onChange = (value: any) => {
    this.setState({
      colorCount: typeof +value === 'number' ? +value : 8,
    });
  };

  componentDidMount() {
    this.updatePalette();
  }

  componentDidUpdate() {
    this.updatePalette();
  }

  updatePalette = () => {
    const { image } = this.props;
    getPaletteFromImage(image, this.state.colorCount)
      .then((result) => {
        if (result) {
          this.setState({ palette: result });
        }
      })
      .catch(() => {
        this.setState({ palette: undefined });
      });
  };

  render() {
    const { palette, colorCount } = this.state;
    return (
      <>
        <div className="color-number">
          <span>Color Number</span>
          <Slider min={1} max={20} onChange={this.onChange} value={colorCount} className="color-number-slider" />
          <InputNumber
            size="small"
            min={1}
            max={20}
            value={colorCount}
            onChange={this.onChange}
            className="color-number-input"
          />
        </div>
        {palette && <Swatch palette={palette}></Swatch>}
      </>
    );
  }
}
export default PaletteByImage;
