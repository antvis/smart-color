import React, { PureComponent } from 'react';
import { Input } from 'antd';
import { getPaletteFromString } from '../../../../src';
import Swatch from '../Swatch';
import PaletteByImage from './PaletteByImage';
import './index.less';

const { TextArea } = Input;
const IMG_URL = 'https://gw.alipayobjects.com/zos/antfincdn/JijeVImYC2/sea.jpeg';

interface GetPaletteProps {}

interface GetPaletteState {
  colorString: string;
}

class GetPalette extends PureComponent<GetPaletteProps> {
  readonly state: GetPaletteState = {
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
        <h3>By String</h3>
        <TextArea
          className={'color-string-input'}
          autoSize={{ minRows: 3, maxRows: 6 }}
          onChange={this.inputColorString}
          value={colorString}
        />
        {colorString && <Swatch palette={getPaletteFromString(colorString)}></Swatch>}
        <h3 style={{ marginTop: '10px' }}>By Image</h3>
        <img src={IMG_URL} alt="origin image"></img>
        <PaletteByImage image={IMG_URL}></PaletteByImage>
      </div>
    );
  }
}

export default GetPalette;
