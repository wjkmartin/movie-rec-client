import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDatabase, ref, get, child } from 'firebase/database';
import { getMovieData } from '../services/rec/tmdb';

import { gql, useQuery } from '@apollo/client';

import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Recommend() {
  // make a firebase connection
  // get the current state of the database
  const [recommendations, setRecommendations] = useState([]);
  // const [generatePrefsForUser, { isLoading: isUpdating, isSuccess: isSuccess }] = useGeneratePrefScoresMutation();
  const currentUser = useSelector((state) => state.auth);

  const GET_PREFSCORES = gql`
    query getPrefs($user: User!) {
      getPrefscores(user: $user) {
        movieId
        score
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_PREFSCORES, {
    variables: {
      user: {
        id: currentUser.userIndexIdentifier,
        age: 20,
        gender: 1,
      },
    },
  });

  if (error) {
    console.log(error);
  }

  useEffect(() => {
    setRecommendations([]);
    if (data) {
      const prefsFull = [...data.getPrefscores];
      prefsFull.sort((a, b) => b.score - a.score);

      const recsSubset = prefsFull.slice(0, 10);
      console.log(recsSubset);
      for (let i = 0; i < recsSubset.length; i++) {
        const populateData = async (_) => {
          await getMovieData(recsSubset[i].movieId).then((movie) => {
            setRecommendations((recommendations) => [
              ...recommendations,
              movie.data,
            ]);
          });
        };
        populateData();
      }
    }
  }, [data]);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {loading ? (
          'loading...'
        ) : (
          <div>
            <h1 className={styles.title}>Recommendations</h1>
            {recommendations.map((rec, i) => (
              <p key={`movierec${i}`}>{rec.original_title}</p>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
