import React from 'react';
import Link from 'next/link';
import HeaderLink from './HeaderLink';

import styles from './Header.module.css';

const Header = () => {
  return (
    <div className={styles.Header}>
      <Link passHref href="/recommend">
        <HeaderLink>Recommend</HeaderLink>
      </Link>
      <Link passHref href="/">
        <HeaderLink>Home</HeaderLink>
      </Link>
      <Link passHref href="/rate">
        <HeaderLink>Rate</HeaderLink>
      </Link>
    </div>
  );
};

export default Header;
