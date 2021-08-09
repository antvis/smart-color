import React, { PureComponent } from 'react';
import { Color } from '@antv/color-schema';
import Block from '../Block';
import { colorDistance, CIEDE2000 } from '../../../../src';
import './index.less';

interface ColorDistanceProps {
  color1: Color;
  color2: Color;
}

interface ColorDistanceState {
  color1: Color | undefined;
  color2: Color | undefined;
}

class ColorDistance extends PureComponent<ColorDistanceProps, ColorDistanceState> {
  readonly state: ColorDistanceState = {
    color1: undefined,
    color2: undefined,
  };

  render() {
    const color1 = this.state.color1 || this.props.color1;
    const color2 = this.state.color2 || this.props.color2;

    return (
      <>
        <div>
          <h3>Color Distance</h3>
          <div className="content">
            <span>
              The <b>Euclidean distance</b> between
            </span>
            <Block
              color={color1}
              onChange={(color) => {
                this.setState({ color1: color });
              }}
            ></Block>
            <span>and</span>
            <Block
              color={color2}
              onChange={(color) => {
                this.setState({ color2: color });
              }}
            ></Block>
            <div>in La*b* is {colorDistance(color1, color2).toFixed(2)} .</div>
          </div>
        </div>
        <div>
          <h3>CIEDE2000</h3>
          <div className="content">
            <span>
              The color difference <b>CIEDE2000</b> between
            </span>
            <Block
              color={color1}
              onChange={(color) => {
                this.setState({ color1: color });
              }}
            ></Block>
            <span>and</span>
            <Block
              color={color2}
              onChange={(color) => {
                this.setState({ color2: color });
              }}
            ></Block>
            <div> is {CIEDE2000(color1, color2).toFixed(2)} .</div>
          </div>
        </div>
      </>
    );
  }
}

export default ColorDistance;
