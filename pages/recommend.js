import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';

import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Recommend() {
  // make a firebase connection
  // get the current state of the database
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const recsRef = ref(db, 'RecsByUID/' + 1);
    onValue(recsRef, (snapshot) => {
      const data = snapshot.val();
      let recs = Object.values(data);
      recs.sort((a, b) => b.pref_score - a.pref_score);
      setRecommendations(recs.slice(0, 10));
    });
  }, []);



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
        {recommendations.map((rec, i) => (
          <p key={`movierec${i}`}>{rec.tmdb_id}</p>
        ))}
      </main>
    </div>
  );
}
