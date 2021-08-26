import React from 'react';
import ColorBrighten from './ColorBrighten';
import ColorDarken from './ColorDarken';
import ColorOverlap from './ColorOverlap';

const ColorComputation = () => {
  return (
    <>
      <ColorOverlap />
      <ColorBrighten />
      <ColorDarken />
    </>
  );
};

export default ColorComputation;
