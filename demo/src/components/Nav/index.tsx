import React from 'react';
import { Anchor } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import FEATURES from '../../constant/features';
import styles from './index.module.less';

const { Link } = Anchor;
const Nav = () => (
  <div className={styles.nav}>
    <div className={styles.header}>
      <h1 className={styles.title}>Smart Color</h1>
      <h2 className={styles.subtitle}>@antv/smart-color </h2>
      <a className={styles.git} href="https://github.com/antvis/smart-color" target="_blank" rel="noreferrer">
        <GithubOutlined />
      </a>
    </div>

    <Anchor>
      <Link href={'#intro'} title={'Features'}></Link>
      {FEATURES.map(({ name, url, childeren }) => (
        <Link key={name} href={url} title={name}>
          {childeren?.map(({ name, url }) => (
            <Link key={name} href={url} title={name} />
          ))}
        </Link>
      ))}
    </Anchor>
  </div>
);

export default Nav;
