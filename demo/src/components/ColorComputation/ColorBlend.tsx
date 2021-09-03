import React, { PureComponent } from 'react';
import { Select } from 'antd';
import { Color, CategoricalPalette } from '@antv/color-schema';
import Highlight from 'react-highlight';
import { colorBlend } from '../../../../src';
import { BlendMode } from '../../../../src/types';
import { BLEND_MODES } from '../../../../src/constant';
import COLOR_ASSET from '../../constant/colorAsset';
import Block from '../Block';

const { Option } = Select;
const palette = COLOR_ASSET.palettes[0] as CategoricalPalette;
const [colorTop, colorBottom] = palette.colors;

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
        {/* <img
          src="https://gw.alipayobjects.com/zos/antfincdn/kcm55MaLMt/coloroverlap.png"
          alt="color overlap"
          width="500"
        ></img> */}
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
              {BLEND_MODES.map((blendMode) => (
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
