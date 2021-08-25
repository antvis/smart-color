import React, { PureComponent } from 'react';
import { Color, colorToHex } from '@antv/color-schema';
import { ChromePicker } from 'react-color';
import { hexToColor } from '../../../../src';
import './index.less';

interface BlockProps {
  color: Color;
  onChange: (color: Color) => void;
  size: number;
}
interface BlockState {
  displayColorPicker: boolean;
}
class Block extends PureComponent<BlockProps, BlockState> {
  static defaultProps = {
    size: 70,
  };

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
    const { color, size } = this.props;
    const hexColor = colorToHex(color);
    return (
      <>
        <div
          className="color-block"
          style={{ background: hexColor, width: `${size}px`, height: `${size}px` }}
          onClick={this.handleClick}
        >
          {size >= 70 && <span>{hexColor}</span>}
          {this.state.displayColorPicker ? (
            <div className="popover">
              <div className="cover" onClick={this.handleClose} />
              <ChromePicker color={hexColor} onChange={this.handleChange} className="color-picker" />
            </div>
          ) : null}
        </div>
      </>
    );
  }
}

export default Block;
