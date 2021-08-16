import React, { PureComponent } from 'react';
import { Color } from '@antv/color-schema';
import Block from '../Block';
import { colorDifference } from '../../../../src';
import { ColorDifferenceMeasure } from '../../../../src/types';
import './index.less';

interface ColorEvaluatorProps {
  color1: Color;
  color2: Color;
}

interface ColorEvaluatorState {
  color1: Color | undefined;
  color2: Color | undefined;
}
interface ColorDiffernceInfo {
  measure: ColorDifferenceMeasure;
  name: string;
}
const COLOR_DIFFERENCE_INFO: ColorDiffernceInfo[] = [
  {
    measure: 'euclidean',
    name: 'Euclidean distance',
  },
  {
    measure: 'CIEDE2000',
    name: 'CIEDE2000',
  },
  {
    measure: 'contrastRatio',
    name: 'color contrast ratio',
  },
];

class ColorEvaluator extends PureComponent<ColorEvaluatorProps, ColorEvaluatorState> {
  readonly state: ColorEvaluatorState = {
    color1: undefined,
    color2: undefined,
  };

  render() {
    const color1 = this.state.color1 || this.props.color1;
    const color2 = this.state.color2 || this.props.color2;

    return (
      <>
        <h3>Color Difference</h3>
        {COLOR_DIFFERENCE_INFO.map(({ measure, name }) => (
          <div className="content" key={measure}>
            <span>
              The <b>{name}</b> between
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
            <div>is {colorDifference(color1, color2, { measure }).toFixed(2)} .</div>
          </div>
        ))}
      </>
    );
  }
}

export default ColorEvaluator;
