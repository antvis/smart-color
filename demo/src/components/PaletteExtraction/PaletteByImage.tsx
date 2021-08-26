import React, { Component } from 'react';
import { Palette } from '@antv/color-schema';
import { InputNumber, Input } from 'antd';
import Highlight from 'react-highlight';
import { isEqual } from 'lodash';
import { getPaletteFromImage } from '../../../../src';
import Swatch from '../Swatch';
import './index.less';

const IMG_URL = 'https://gw.alipayobjects.com/zos/antfincdn/JijeVImYC2/sea.jpeg';
interface PaletteByImageProps {}
interface PaletteByImageState {
  url: string;
  count: number;
  quality: number;
  palette: Palette | undefined;
}
class PaletteByImage extends Component<PaletteByImageProps, PaletteByImageState> {
  readonly state: PaletteByImageState = {
    url: IMG_URL,
    count: 8,
    quality: 10,
    palette: undefined,
  };

  shouldComponentUpdate(nextProps: PaletteByImageProps, nextState: PaletteByImageState) {
    if (
      this.state.count !== nextState.count ||
      this.state.url !== nextState.url ||
      this.state.quality !== nextState.quality ||
      !isEqual(this.state.palette, nextState.palette)
    ) {
      return true;
    }
    return false;
  }

  onUrlChange = (event: any) => {
    this.setState({
      url: event.target.value,
    });
  };

  onCountChange = (count: number) => {
    this.setState({
      count,
    });
  };

  onQualityChange = (quality: number) => {
    this.setState({
      quality,
    });
  };

  componentDidMount() {
    this.updatePalette();
  }

  componentDidUpdate() {
    this.updatePalette();
  }

  updatePalette = () => {
    const { url, count, quality } = this.state;
    getPaletteFromImage(url, count, quality)
      .then((palette) => {
        this.setState({ palette });
      })
      .catch(() => {
        this.setState({ palette: undefined });
      });
  };

  render() {
    const { palette, url, count, quality } = this.state;
    return (
      <div className="smart-color-example">
        <h4>Example:</h4>
        <div className="attr">
          <div className="name">url:</div>
          <Input size="small" value={url} onChange={this.onUrlChange} />
        </div>
        <img src={url} alt="origin image" className="img-preview"></img>

        <div className="attr">
          <div className="name">count:</div>
          <InputNumber min={1} max={20} value={count} onChange={this.onCountChange} />
        </div>

        <div className="attr">
          <div className="name">quality:</div>
          <InputNumber min={1} max={50} value={quality} onChange={this.onQualityChange} />
        </div>
        <Highlight>{`const url = "${url}";
getPaletteFromImage(url, ${count}, ${quality})
  .then((palette) => {
    // Display palette
    // When the image fails to load, palette is undefined.
  });`}</Highlight>
        {palette && <Swatch palette={palette}></Swatch>}
      </div>
    );
  }
}
export default PaletteByImage;
