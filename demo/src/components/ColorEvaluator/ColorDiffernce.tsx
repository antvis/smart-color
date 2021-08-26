import React, { PureComponent } from 'react';
import { Select } from 'antd';
import { Color, CategoricalPalette, ColorModel } from '@antv/color-schema';
import Highlight from 'react-highlight';
import { colorDifference } from '../../../../src';
import COLOR_ASSET from '../../constant/colorAsset';
import Block from '../Block';

const { Option } = Select;
const COLOR_MODELS: ColorModel[] = ['hsl', 'hsv', 'hsi', 'rgb', 'rgba', 'lab', 'lch', 'cmyk'];
const palette = COLOR_ASSET.palettes[0] as CategoricalPalette;
const [color1, color2] = palette.colors;

interface ColorDiffernceState {
  color1: Color;
  color2: Color;
  colorModel: ColorModel;
}
class ColorDiffernce extends PureComponent {
  readonly state: ColorDiffernceState = {
    color1,
    color2,
    colorModel: 'lab',
  };

  handleColorModelChange = (colorModel: ColorModel) => {
    this.setState({
      colorModel,
    });
  };

  render() {
    const { color1, color2, colorModel } = this.state;
    return (
      <>
        <h3 id="colorDifference">
          <code>
            <a
              href="https://github.com/antvis/smart-color/blob/smartColorDemo/docs/api/evaluators.md#colorDifference"
              target="_blank"
              rel="noreferrer"
            >
              colorDifference(color1, color2, configuration)
            </a>
          </code>
        </h3>
        <p>
          Computes the discriminability between <code>color1</code> and <code>color2</code>.
        </p>
        <div className="smart-color-example">
          <h4>Example:</h4>
          <div className="attr">
            <div className="name">color1:</div>
            <div className="value">
              <Block
                size={20}
                color={color1}
                onChange={(color) => {
                  this.setState({ color1: color });
                }}
              />
            </div>
          </div>

          <div className="attr">
            <div className="name">color2:</div>
            <div className="value">
              <Block
                size={20}
                color={color2}
                onChange={(color) => {
                  this.setState({ color2: color });
                }}
              />
            </div>
          </div>

          <Highlight>{`const color1 = ${JSON.stringify(color1)};
const color2 = ${JSON.stringify(color2)};`}</Highlight>

          <ul>
            <li>
              Euclidean Distance
              <div className="attr">
                <div className="name">color scheme:</div>
                <Select value={colorModel} style={{ width: 160 }} onChange={this.handleColorModelChange}>
                  {COLOR_MODELS.map((model) => (
                    <Option value={model} key={model}>
                      {model}
                    </Option>
                  ))}
                </Select>
              </div>
              <Highlight>{`colorDifference(color1, color2, ${JSON.stringify(
                JSON.parse(`{"measure": "euclidean", "colorModel": "${colorModel}"}`),
                null,
                2
              )}).toFixed(2);
// ${colorDifference(color1, color2, { measure: 'euclidean', colorModel }).toFixed(2)}`}</Highlight>
            </li>
            <li>
              CIEDE2000
              <Highlight>{`colorDifference(color1, color2, ${JSON.stringify(
                JSON.parse('{"measure": "CIEDE2000"}'),
                null,
                2
              )}).toFixed(2);
// ${colorDifference(color1, color2, { measure: 'CIEDE2000' }).toFixed(2)}`}</Highlight>
            </li>
            <li>
              Contrast Ratio
              <Highlight>{`colorDifference(color1, color2, ${JSON.stringify(
                JSON.parse('{"measure": "contrastRatio"}'),
                null,
                2
              )}).toFixed(2);
// ${colorDifference(color1, color2, { measure: 'contrastRatio' }).toFixed(2)}`}</Highlight>
            </li>
          </ul>
        </div>
      </>
    );
  }
}
export default ColorDiffernce;
