import React from 'react';
import ColorBrighten from './ColorBrighten';
import ColorDarken from './ColorDarken';
import ColorOverlap from './ColorOverlap';
import ColorBlend from './ColorBlend';

const ColorComputation = () => {
  return (
    <>
      <ColorOverlap />
      <ColorBlend />
      <ColorBrighten />
      <ColorDarken />
    </>
  );
};

export default ColorComputation;
