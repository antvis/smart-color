import React from 'react';
import ColorBrighten from './ColorBrighten';
import ColorDarken from './ColorDarken';
import ColorBlend from './ColorBlend';

const ColorComputation = () => {
  return (
    <>
      <ColorBlend />
      <ColorBrighten />
      <ColorDarken />
    </>
  );
};

export default ColorComputation;
