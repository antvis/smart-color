import React, { PureComponent } from 'react';
import { Select, InputNumber } from 'antd';
import { ColorSchemeType, Palette, Color } from '@antv/color-schema';
import Highlight from 'react-highlight';
import { paletteGeneration } from '../../../../src';
import Swatch from '../Swatch';
import Block from '../Block';

const { Option } = Select;
interface PaletteGeneratorProps {}
interface PaletteGeneratorState {
  type: ColorSchemeType;
  count: number;
  color: Color;
  palette: Palette | undefined;
}

const COLOR_SCHEME_TYPES: ColorSchemeType[] = [
  'monochromatic',
  'complementary',
  'split-complementary',
  'achromatic',
  'analogous',
  'triadic',
  'tetradic',
  'polychromatic',
  'customized',
];

class PaletteGenerator extends PureComponent<PaletteGeneratorProps, PaletteGeneratorState> {
  readonly state: PaletteGeneratorState = {
    type: COLOR_SCHEME_TYPES[0],
    count: 8,
    color: {
      model: 'rgb',
      value: {
        r: 91,
        g: 143,
        b: 249,
      },
    },
    palette: undefined,
  };

  componentDidMount() {
    this.regeneration({});
  }

  handleColorSchemeChange = (type: ColorSchemeType) => {
    this.setState({
      type,
    });
    this.regeneration({ type });
  };

  handleColorChange = (color: Color) => {
    this.setState({
      color,
    });
    this.regeneration({ color });
  };

  handleCountChange = (count: number) => {
    this.setState({
      count,
    });
    this.regeneration({ count });
  };

  regeneration = ({
    type = this.state.type,
    color = this.state.color,
    count = this.state.count,
  }: {
    type?: ColorSchemeType;
    color?: Color;
    count?: number;
  }) => {
    const palette = paletteGeneration(type, {
      color,
      count,
    });
    this.setState({
      palette,
    });
  };

  render() {
    const { type, palette, count, color } = this.state;

    return (
      <div>
        <h3>
          <code>
            <a
              href="https://github.com/antvis/smart-color/blob/master/docs/api/generators.md#paletteGeneration"
              target="_blank"
              rel="noreferrer"
            >
              paletteGeneration(colorScheme, configuration)
            </a>
          </code>
        </h3>
        <p>Generate categorical or discrete scale palette based on color scheme.</p>
        <p>
          Based on different color schemes, the algorithm can generate different types of palettes. The following figure
          shows their correspondence.
        </p>
        <img
          src="https://gw.alipayobjects.com/zos/antfincdn/xzoCX2mhQg/colorscheme.svg"
          width="600"
          alt="color scheme"
        ></img>

        <div className="smart-color-example">
          <h4>Example:</h4>
          <div className="attr">
            <div className="name">color scheme:</div>
            <Select value={type} style={{ width: 160 }} onChange={this.handleColorSchemeChange}>
              {COLOR_SCHEME_TYPES.map((type) => (
                <Option value={type} key={type}>
                  {type}
                </Option>
              ))}
            </Select>
          </div>

          <div className="attr">
            <div className="name">color:</div>
            <div className="value">
              <Block color={color} onChange={this.handleColorChange} size={20}></Block>
            </div>
          </div>

          <div className="attr">
            <div className="name">count:</div>
            <InputNumber value={count} min={2} max={20} step="1" onChange={this.handleCountChange} />
          </div>

          <Highlight>{`paletteGeneration("${type}", ${JSON.stringify(
            JSON.parse(`{"count": ${count}, "color": ${JSON.stringify(color)}}`),
            null,
            2
          )});`}</Highlight>
          {palette ? <Swatch palette={palette}></Swatch> : null}
        </div>
      </div>
    );
  }
}

export default PaletteGenerator;
