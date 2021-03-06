import React, { PureComponent } from 'react';
import { Color, colorToHex } from '@antv/color-schema';
import { ChromePicker } from 'react-color';
import './index.less';

interface BlockProps {
  color: Color;
  onChange?: (color: Color) => void;
  size: number;
}
interface BlockState {
  displayColorPicker: boolean;
}
class Block extends PureComponent<BlockProps, BlockState> {
  static defaultProps = {
    size: 80,
  };

  readonly state: BlockState = {
    displayColorPicker: false,
  };

  handleClick = () => {
    const { onChange } = this.props;
    if (onChange) {
      this.setState({ displayColorPicker: !this.state.displayColorPicker });
    }
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  handleChange = (color: any) => {
    const { onChange } = this.props;
    if (onChange) {
      const rgba = color.rgb;
      if (rgba.a === 1) {
        const { r, g, b } = rgba;
        onChange({
          model: 'rgb',
          value: { r, g, b },
        });
      } else {
        onChange({
          model: 'rgba',
          value: rgba,
        });
      }
    }
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
              <div onClick={(event: any) => event.stopPropagation()}>
                <ChromePicker color={hexColor} onChange={this.handleChange} className="color-picker" />
              </div>
            </div>
          ) : null}
        </div>
      </>
    );
  }
}

export default Block;
