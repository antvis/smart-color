import React from 'react';
import ColorBrighten from './ColorBrighten';
import ColorDarken from './ColorDarken';
import ColorOverlap from './ColorOverlap';

const ColorEvaluator = () => {
  return (
    <>
      <ColorOverlap />
      <ColorBrighten />
      <ColorDarken />
    </>
  );
};

export default ColorEvaluator;
