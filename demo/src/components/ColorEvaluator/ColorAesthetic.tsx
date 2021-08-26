import React, { PureComponent } from 'react';
import { Color, CategoricalPalette } from '@antv/color-schema';
import Highlight from 'react-highlight';
import { colorAesthetic } from '../../../../src';
import COLOR_ASSET from '../../constant/colorAsset';
import Block from '../Block';

const palette = COLOR_ASSET.palettes[0] as CategoricalPalette;
const [color1, color2] = palette.colors;

interface ColorAestheticState {
  color1: Color;
  color2: Color;
}
class PaletteByImage extends PureComponent {
  readonly state: ColorAestheticState = {
    color1,
    color2,
  };

  render() {
    const { color1, color2 } = this.state;

    return (
      <>
        <h3 id="colorAesthetic">
          <code>
            <a
              href="https://github.com/antvis/smart-color/blob/smartColorDemo/docs/api/evaluators.md#colorAesthetic"
              target="_blank"
              rel="noreferrer"
            >
              colorAesthetic(color1, color2, configuration)
            </a>
          </code>
        </h3>
        <p>
          Computes the aesthetic between <code>color1</code> and <code>color2</code>.
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
              Pair Preference
              <Highlight>{`colorAesthetic(color1, color2, ${JSON.stringify(
                JSON.parse('{"measure": "pairPreference"}'),
                null,
                2
              )}).toFixed(2); 
// ${colorAesthetic(color1, color2, { measure: 'pairPreference' }).toFixed(2)}`}</Highlight>
            </li>
          </ul>
        </div>
      </>
    );
  }
}
export default PaletteByImage;
