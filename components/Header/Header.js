import React from 'react';
import Link from 'next/link';

import styles from './Header.module.css';

const Header = () => {
  return (
    <div className={styles.Header}>
        <Link href="/recommend">Rec</Link>
        <Link href="/">Home</Link>
        <Link href="/rate">Rate</Link>
    </div>
  );
};

export default Header;
