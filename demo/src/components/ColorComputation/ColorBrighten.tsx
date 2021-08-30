import React, { PureComponent } from 'react';
import { Color } from '@antv/color-schema';
import Highlight from 'react-highlight';
import { InputNumber } from 'antd';
import { colorBrighten } from '../../../../src';
import Block from '../Block';

const color: Color = {
  model: 'rgb',
  value: { r: 91, g: 143, b: 249 },
};

interface ColorBrightenState {
  color: Color;
  value: number;
}
class ColorBrighten extends PureComponent {
  readonly state: ColorBrightenState = {
    color,
    value: 1,
  };

  render() {
    const { color, value } = this.state;

    return (
      <>
        <h3 id="colorBrighten">
          <code>
            <a
              href="https://github.com/antvis/smart-color/blob/master/docs/api/colorComputation.md#colorBrighten"
              target="_blank"
              rel="noreferrer"
            >
              colorBrighten(color, value)
            </a>
          </code>
        </h3>
        <p>Get brighter color.</p>
        <div className="smart-color-example">
          <h4>Example:</h4>
          <div className="attr">
            <div className="name">color:</div>
            <div className="value">
              <Block
                size={20}
                color={color}
                onChange={(color) => {
                  this.setState({ color });
                }}
              />
            </div>
          </div>

          <div className="attr">
            <div className="name">value:</div>
            <InputNumber
              min={1}
              max={5}
              value={value}
              onChange={(value) => {
                this.setState({ value });
              }}
            />
          </div>

          <Highlight>{`const color = ${JSON.stringify(color)};
colorBrighten(color, ${value});`}</Highlight>
          <Block color={colorBrighten(color, value)}></Block>
        </div>
      </>
    );
  }
}
export default ColorBrighten;
