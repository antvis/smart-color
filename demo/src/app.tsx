import React from 'react';
import { randomColor } from '../../src';
import './index.less';

export default function App() {
  const { r, g, b } = randomColor();
  return <div className="color-square" style={{ background: `rgb(${r},${g},${b})` }} />;
}
