import React from 'react';
import { Anchor } from 'antd';
import FEATURES from '../../constant/features';
import styles from './index.module.less';

const { Link } = Anchor;
const Nav = () => (
  <div className={styles.nav}>
    <h1 className={styles.title}>Smart Color</h1>
    <h2 className={styles.subtitle}>@antv/smart-color</h2>
    <Anchor>
      <Link href={'#intro'} title={'Features'}></Link>
      {FEATURES.map(({ name, url }) => (
        <Link key={name} href={url} title={name}></Link>
      ))}
    </Anchor>
  </div>
);

export default Nav;
