import React, { PureComponent } from 'react';
import { Color } from '@antv/color-schema';
import { Input } from 'antd';
import Highlight from 'react-highlight';
import { colorToArray, arrayToColor, hexToColor, colorToHex, nameToColor, colorToGray } from '../../../../src';
import Block from '../Block';

const color: Color = {
  model: 'rgb',
  value: { r: 91, g: 143, b: 249 },
};

interface ColorConversionState {
  color: Color;
  name: string;
}

class ColorConversion extends PureComponent {
  readonly state: ColorConversionState = {
    color,
    name: 'aliceblue',
  };

  render() {
    const { color, name } = this.state;
    const colorArray = colorToArray(color);
    const hex = colorToHex(color);
    const hsvArray = colorToArray(color, 'hsv').map((d) => +d.toFixed(2)) as [number, number, number];

    return (
      <>
        <>
          <h3 id="colorToArray">
            <code>
              <a
                href="https://github.com/antvis/smart-color/blob/smartColorDemo/docs/api/colorConversion.md#colorToArray"
                target="_blank"
                rel="noreferrer"
              >
                colorToArray(color, colorModel)
              </a>
            </code>
          </h3>
          <p>
            Convert <code>Color</code> into array.
          </p>
          <h3 id="arrayToColor">
            <code>
              <a
                href="https://github.com/antvis/smart-color/blob/smartColorDemo/docs/api/colorConversion.md#arrayToColor"
                target="_blank"
                rel="noreferrer"
              >
                arrayToColor(array, colorModel)
              </a>
            </code>
          </h3>
          <p>
            Convert array into <code>Color</code>.
          </p>

          <h3 id="colorToHex">
            <code>
              <a
                href="https://github.com/antvis/smart-color/blob/smartColorDemo/docs/api/colorConversion.md#colorToHex"
                target="_blank"
                rel="noreferrer"
              >
                colorToHex(color)
              </a>
            </code>
          </h3>
          <p>
            Convert <code>Color</code> into hexadecimal string.
          </p>
          <h3 id="hexToColor">
            <code>
              <a
                href="https://github.com/antvis/smart-color/blob/smartColorDemo/docs/api/colorConversion.md#hexToColor"
                target="_blank"
                rel="noreferrer"
              >
                hexToColor(hex)
              </a>
            </code>
          </h3>
          <p>
            Convert array into <code>Color</code>.
          </p>
          <h3 id="colorToGray">
            <code>
              <a
                href="https://github.com/antvis/smart-color/blob/smartColorDemo/docs/api/colorConversion.md#colorToGray"
                target="_blank"
                rel="noreferrer"
              >
                colorToGray(color)
              </a>
            </code>
          </h3>
          <p>
            Convert <code>Color</code> into gray number.
          </p>
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

            <Highlight>{`const color = ${JSON.stringify(color)};
const colorArray = [${colorArray}]; // in ${color.model} model
const hex = "${hex}";`}</Highlight>

            <Highlight>{`colorToArray(color); // [${colorToArray(color)}]
arrayToColor(colorArray, 'rgb'); // ${JSON.stringify(arrayToColor(colorArray))}

const hsvArray = colorToArray(color, 'hsv'); // [${colorToArray(color, 'hsv').map((d) => +d.toFixed(2))}]
arrayToColor(hsvArray, 'hsv'); // ${JSON.stringify(arrayToColor(hsvArray, 'hsv'))}

colorToHex(color); // "${colorToHex(color)}"
hexToColor(hex); // ${JSON.stringify(hexToColor(hex))}

colorToGray(color); // ${colorToGray(color)}`}</Highlight>
          </div>

          <h3 id="nameToColor">
            <code>
              <a
                href="https://github.com/antvis/smart-color/blob/smartColorDemo/docs/api/colorConversion.md#nameToColor"
                target="_blank"
                rel="noreferrer"
              >
                nameToColor(name)
              </a>
            </code>
          </h3>
          <p>
            Convert valid css color name into <code>Color</code>.
          </p>
          <div className="smart-color-example">
            <h4>Example:</h4>
            <div className="attr">
              <div className="name">name:</div>
              <Input
                value={name}
                onChange={(event) => this.setState({ name: event.target.value })}
                style={{ width: '160px' }}
              />
            </div>

            <Highlight>{`nameToColor("${name}") // ${JSON.stringify(nameToColor(name))}`}</Highlight>
          </div>
        </>
      </>
    );
  }
}

export default ColorConversion;
