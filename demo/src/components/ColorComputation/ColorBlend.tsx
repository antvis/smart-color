import React, { PureComponent } from 'react';
import { Select } from 'antd';
import { Color } from '@antv/color-schema';
import Highlight from 'react-highlight';
import { colorBlend } from '../../../../src';
import { BlendMode } from '../../../../src/types';
import { BLEND_MODES } from '../../../../src/constant';
import Block from '../Block';

const { Option } = Select;

const colorTop: Color = {
  model: 'rgba',
  value: { r: 255, g: 0, b: 0, a: 0.4 },
};
const colorBottom: Color = {
  model: 'rgba',
  value: { r: 0, g: 0, b: 255, a: 0.8 },
};

interface ColorBlendState {
  colorTop: Color;
  colorBottom: Color;
  mode: BlendMode;
}
class ColorBlend extends PureComponent {
  readonly state: ColorBlendState = {
    colorTop,
    colorBottom,
    mode: 'normal',
  };

  handleModeChange = (mode: BlendMode) => {
    this.setState({ mode });
  };

  render() {
    const { colorTop, colorBottom, mode } = this.state;

    return (
      <>
        <h3 id="colorBlend">
          <code>
            <a
              href="https://github.com/antvis/smart-color/blob/master/docs/api/colorComputation.md#colorBlend"
              target="_blank"
              rel="noreferrer"
            >
              colorBlend(colorTop, colorBottom, mode)
            </a>
          </code>
        </h3>
        <p>
          Computes the color when the <code>colorTop</code> and the <code>colorBottom</code> are overlapped. Different
          overlapping order will result in different colors.
        </p>
        <img
          src="https://gw.alipayobjects.com/zos/antfincdn/qKvUFLCEiD/overlap.png"
          alt="color blend order"
          width="500"
        />
        <p>
          Valid{' '}
          <a href="https://en.wikipedia.org/wiki/Blend_modes" target="_blank" rel="noreferrer">
            blend modes
          </a>{' '}
          are <code>normal</code>, <code>darken</code>, <code>multiply</code>, <code>colorBurn</code>,{' '}
          <code>linearBurn</code>, <code>lighten</code>, <code>screen</code>, <code>colorDodge</code>,{' '}
          <code>linearDodge</code>, <code>overlay</code>, <code>softLight</code>, <code>hardLight</code>,{' '}
          <code>vividLight</code>, <code>linearLight</code>, <code>pinLight</code>, <code>difference</code>,{' '}
          <code>exclusion</code> , <code>saturation</code>, <code>color</code>, <code>luminosity</code>.
        </p>
        <img
          src="https://gw.alipayobjects.com/zos/antfincdn/Jz%26koWbRhO/colorblend1.svg"
          alt="color blend mode"
          width="700"
        />
        <div className="smart-color-example">
          <h4>Example:</h4>
          <div className="attr">
            <div className="name">colorTop:</div>
            <div className="value">
              <Block
                size={20}
                color={colorTop}
                onChange={(color) => {
                  this.setState({ colorTop: color });
                }}
              />
            </div>
          </div>

          <div className="attr">
            <div className="name">colorBottom:</div>
            <div className="value">
              <Block
                size={20}
                color={colorBottom}
                onChange={(color) => {
                  this.setState({ colorBottom: color });
                }}
              />
            </div>
          </div>

          <div className="attr">
            <div className="name">mode:</div>
            <Select value={mode} style={{ width: 160 }} onChange={this.handleModeChange}>
              {BLEND_MODES.map((blendMode: BlendMode) => (
                <Option value={blendMode} key={blendMode}>
                  {blendMode}
                </Option>
              ))}
            </Select>
          </div>

          <Highlight>{`const colorTop = ${JSON.stringify(colorTop)};
const colorBottom = ${JSON.stringify(colorBottom)};
colorBlend(colorTop, colorBottom, "${mode}");`}</Highlight>
          <Block color={colorBlend(colorTop, colorBottom, mode)}></Block>
        </div>
      </>
    );
  }
}
export default ColorBlend;
