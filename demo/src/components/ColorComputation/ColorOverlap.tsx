import React, { PureComponent } from 'react';
import { Color } from '@antv/color-schema';
import Highlight from 'react-highlight';
import { colorOverlap } from '../../../../src';
import Block from '../Block';

const colorTop: Color = {
  model: 'rgba',
  value: { r: 255, g: 0, b: 0, a: 0.4 },
};

const colorBottom: Color = {
  model: 'rgba',
  value: { r: 0, g: 0, b: 255, a: 0.8 },
};

interface ColorOverlapState {
  colorTop: Color;
  colorBottom: Color;
}
class ColorOverlap extends PureComponent {
  readonly state: ColorOverlapState = {
    colorTop,
    colorBottom,
  };

  render() {
    const { colorTop, colorBottom } = this.state;

    return (
      <>
        <h3 id="colorOverlap">
          <code>
            <a
              href="https://github.com/antvis/smart-color/blob/smartColorDemo/docs/api/colorComputation.md#colorOverlap"
              target="_blank"
              rel="noreferrer"
            >
              colorOverlap(colorTop, colorBottom)
            </a>
          </code>
        </h3>
        <p>
          Computes the color when the <code>colorTop</code> and the <code>colorBottom</code> are overlapped. Different
          overlapping order will result in different colors.
        </p>
        <img
          src="https://gw.alipayobjects.com/zos/antfincdn/kcm55MaLMt/coloroverlap.png"
          alt="color overlap"
          width="500"
        ></img>
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

          <Highlight>{`const colorTop = ${JSON.stringify(colorTop)};
const colorBottom = ${JSON.stringify(colorBottom)};
colorOverlap(colorTop, colorBottom);`}</Highlight>
          <Block color={colorOverlap(colorTop, colorBottom)}></Block>
        </div>
      </>
    );
  }
}
export default ColorOverlap;
