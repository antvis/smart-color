import React, { PureComponent } from 'react';
import { Input } from 'antd';
import Highlight from 'react-highlight';
import { getPaletteFromString } from '../../../../src';
import Swatch from '../Swatch';
import PaletteByImage from './PaletteByImage';
import './index.less';

const { TextArea } = Input;
interface PaletteExtractionState {
  colorString: string;
}

class PaletteExtraction extends PureComponent {
  readonly state: PaletteExtractionState = {
    colorString: '#FB9747,#DE5844,#52BFC1,#22A34C,#F1BF2A,#94674E,#FF9CB8,#A562C0',
  };

  inputColorString = (event: any) => {
    this.setState({
      colorString: event.target.value,
    });
  };

  render() {
    const { colorString } = this.state;
    return (
      <div>
        <PaletteByImage />
        <div>
          <h3 id="getPaletteFromString">
            <code>
              <a
                href="https://github.com/antvis/smart-color/blob/smartColorDemo/docs/api/extractors.md#getPaletteFromString"
                target="_blank"
                rel="noreferrer"
              >
                getPaletteFromString(string)
              </a>
            </code>
          </h3>
          <p>
            Get palettes from string. The <code>string</code> needs to be composed of hexadecimal string, split by
            commas.
          </p>
          <div className="smart-color-example">
            <h4>Example:</h4>
            <div className="attr">
              <div className="name">String:</div>
              <TextArea
                className={'color-string-input'}
                autoSize={{ minRows: 2, maxRows: 6 }}
                onChange={this.inputColorString}
                value={colorString}
              />
            </div>
            <Highlight>{`const str = "${colorString}";
getPaletteFromString(str);`}</Highlight>
            {colorString && <Swatch palette={getPaletteFromString(colorString)}></Swatch>}
          </div>
        </div>
      </div>
    );
  }
}

export default PaletteExtraction;
