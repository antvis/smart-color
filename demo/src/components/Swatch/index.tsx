import React from 'react';
import { message } from 'antd';
import { Color, Palette, colorToHex, isContinuousPalette, isMatrixPalette } from '@antv/color-schema';
import './index.less';

const copyToClipboard = (hexColor: string) => {
  const el = document.createElement('textarea');
  el.value = hexColor;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  message.success(
    <span>
      Copied
      <span style={{ color: hexColor }}> {hexColor}</span>
    </span>
  );
};

interface SwatchProps {
  palette: Palette;
}

interface ColorsProps {
  colorStyle: React.CSSProperties;
  colors: Color[];
}

const Colors = ({ colorStyle = {}, colors = [] }: ColorsProps) => {
  if (colors.length === 0) {
    return null;
  }
  return (
    <div className="colors">
      {colors.map((color) => {
        const hexValue = colorToHex(color);
        return (
          <div
            className="color"
            style={{
              ...colorStyle,
              backgroundColor: hexValue,
              color: hexValue,
            }}
            key={color.id || hexValue}
            onClick={() => {
              copyToClipboard(hexValue);
            }}
          />
        );
      })}
    </div>
  );
};

const Swatch = ({ palette }: SwatchProps) => {
  return (
    <div className="swatch">
      <div className="panel">
        {!isContinuousPalette(palette) && !isMatrixPalette(palette) && (
          <Colors
            colorStyle={{
              width: `calc(${100 / palette.colors.length}%)`,
            }}
            colors={palette.colors}
          />
        )}
      </div>
    </div>
  );
};

export default Swatch;
