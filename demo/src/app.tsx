import React from 'react';
import { randomColor } from '../../src/generators/random';
import './index.less';

function ShowRandomColor() {
  const { model, value } = randomColor();
  if (model === 'rgb') {
    const { r, g, b } = value as any;
    return <div className="color-square" style={{ background: `rgb(${r},${g},${b})` }} />;
  }
  return null;
}

export default function App() {
  return (
    <>
      <h1>smart-color Demo</h1>
      <h2>random color</h2>
      <ShowRandomColor />
    </>
  );
}
