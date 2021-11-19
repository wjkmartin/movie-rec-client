import React, { useState } from 'react';

import Head from 'next/head';
import styles from '../styles/Home.module.css';

import MovieBlock from '../components/_Rate/MovieBlock/MovieBlock';
import RateButtons from '../components/_Rate/RateButtons/RateButtons';

export default function Rate() {
  const [hasStartedRating, setHasStartedRating] = useState(false);
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
        <button
          onClick={() => {
            setHasStartedRating(true);
          }}
        >
          Show me some movies
        </button>
        <div>
          {hasStartedRating ? (
            <div>
              <MovieBlock />
              <RateButtons />
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
}
