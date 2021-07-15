import React, { PureComponent } from 'react';
import { Select, Button } from 'antd';
import { ColorSchemeType, Palette } from '@antv/color-schema';
import { paletteGeneration } from '../../../../src';
import Swatch from '../Swatch';
import './index.less';

const { Option } = Select;
interface PaletteGeneratorProps {}
interface PaletteGeneratorState {
  type: ColorSchemeType;
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
    palette: undefined,
  };

  componentDidMount() {
    this.regeneration();
  }

  handleChange = (value: ColorSchemeType) => {
    this.setState({
      type: value,
    });
    this.regeneration(value);
  };

  regeneration = (type: ColorSchemeType = this.state.type) => {
    const result = paletteGeneration(type);
    if (result.status === 'success') {
      this.setState({
        palette: result.palette,
      });
    } else {
      this.setState({
        palette: undefined,
      });
    }
  };

  render() {
    const { type, palette } = this.state;

    return (
      <div>
        <div className="generation-type">
          <div className="generation-type-text">Color Scheme:</div>
          <Select value={type} style={{ width: 160 }} onChange={this.handleChange}>
            {COLOR_SCHEME_TYPES.map((type) => (
              <Option value={type} key={type}>
                {type}
              </Option>
            ))}
          </Select>
          <Button onClick={() => this.regeneration()} className="generation-btn" size="small">
            Regeneration
          </Button>
        </div>
        {palette ? <Swatch palette={palette}></Swatch> : null}
      </div>
    );
  }
}

export default PaletteGenerator;
