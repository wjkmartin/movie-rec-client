import React from 'react';

import Head from 'next/head';
import Link from 'next/link';
import SignInScreen from '../components/Auth/Auth';

import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>MovieApp</title>
        <meta
          name="description"
          content="Find the next movie that will change everything"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div>
          <Link passHref  href="/recommend">
            <button className={styles.mainButton}>REC</button>
          </Link>
          <Link passHref className={styles.mainButton} href="/rate">
            <button className={styles.mainButton}>RATE</button>
          </Link>
        </div>
        <SignInScreen />
      </main>
    </div>
  );
}
