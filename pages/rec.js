import React, { useState } from 'react';

import Head from 'next/head';
import styles from '../styles/Home.module.css';


export default function Rate() {
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
        
      </main>
    </div>
  );
}