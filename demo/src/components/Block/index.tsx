import React, { PureComponent } from 'react';
import { Color, colorToHex } from 'color-schema-test';
import { ChromePicker } from 'react-color';
import { hexToColor } from '../../../../src';
import './index.less';

interface BlockProps {
  color: Color;
  onChange: (color: Color) => void;
}
interface BlockState {
  displayColorPicker: boolean;
}
class Block extends PureComponent<BlockProps, BlockState> {
  readonly state: BlockState = {
    displayColorPicker: false,
  };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  handleChange = (color: any) => {
    const { onChange } = this.props;
    onChange(hexToColor(color.hex));
  };

  render() {
    const { color } = this.props;
    const hexColor = colorToHex(color);
    return (
      <>
        <div className="color-block" style={{ background: hexColor }} onClick={this.handleClick}>
          <span>{hexColor}</span>
        </div>
        {this.state.displayColorPicker ? (
          <div className="popover">
            <div className="cover" onClick={this.handleClose} />
            <ChromePicker color={hexColor} onChange={this.handleChange} className="color-picker" />
          </div>
        ) : null}
      </>
    );
  }
}

export default Block;
