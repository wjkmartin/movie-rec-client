import React from 'react';

import Link from 'next/link';
import SignInScreen from '../components/Auth/Auth';

import commonStyles from '../styles/common.module.css';

export default function Home() {
  return (
      <main className={commonStyles.main}>
        <div>
          <Link passHref  href="/recommend">
            <button className={commonStyles.mainButton}>REC</button>
          </Link>
          <Link passHref className={commonStyles.mainButton} href="/rate">
            <button className={commonStyles.mainButton}>RATE</button>
          </Link>
        </div>
        <SignInScreen />
      </main>
  );
}
