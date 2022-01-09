import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getMovieData } from '../services/rec/tmdb';
import MovieBlock from '../components/common/MovieBlock';

import { gql, useQuery } from '@apollo/client';

import commonStyles from '../styles/common.module.css';
import styles from '../styles/Rec.module.css';

import Image from 'next/image';

export default function Recommend() {
  // make a firebase connection
  // get the current state of the database
  const [recommendations, setRecommendations] = useState([]);
  const [recommendationIndex, setRecommendationIndex] = useState(0);

  // const [generatePrefsForUser, { isLoading: isUpdating, isSuccess: isSuccess }] = useGeneratePrefScoresMutation();
  const currentUser = useSelector((state) => state.auth);

  const RECS_TO_FETCH = 100;
  const RECS_TO_SHOW = 10;

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

  const handleNextButton = () => {
    if (recommendationIndex >= recommendations.length - 1) {
      setRecommendationIndex(0);
    } else setRecommendationIndex(recommendationIndex + 1);
  };

  const handlePrevButton = () => {
    if (recommendationIndex === 0) {
      setRecommendationIndex(recommendations.length - 1);
    } else setRecommendationIndex(recommendationIndex - 1);
  };

  // fetch rated movies

  if (error) {
    console.log(error);
  }

  useEffect(() => {
    setRecommendations([]);
    if (data) {
      const prefsFull = [...data.getPrefscores];

      prefsFull.sort((a, b) => b.score - a.score);
      let recsSubset = [];

      if (prefsFull.length > RECS_TO_SHOW) {
        recsSubset = prefsFull.slice(0, RECS_TO_FETCH);
      } else {
        recsSubset = prefsFull;
      }

      for (let i = 0; i < recsSubset.length; i++) {
        const populateData = async (_) => {
          await getMovieData(recsSubset[i].movieId).then((movie) => {
            // check if movie is within given critera - english, non-adult,
            const dataWithPrefscore = {
              ...movie.data,
              prefScore: recsSubset[i].score,
            };
            if (
              movie.data.adult === false &&
              dataWithPrefscore.original_language === 'en'
            ) {
              setRecommendations((prev) => [...prev, dataWithPrefscore]);
            }
          });
        };
        populateData();
      }
    }
  }, [data, recommendationIndex]);

  return (
      <main className={commonStyles.main}>
        {loading ? (
          <div className={commonStyles.loadingBlock}>
            <Image
              className={commonStyles.loadingIcon}
              height="75px"
              width="75px"
              src="/loadingIcon.png"
              alt="loading"
            />
            <p>Running the model for the freshest recs</p>
          </div>
        ) : (
          <>
            <MovieBlock data={recommendations[recommendationIndex]} />
            <button onClick={() => handlePrevButton()}> Prev </button>
            <button> Seen it! </button>{' '}
            {/* this button will be used to mark the movie as seen and give a modal to rate it */}
            <button onClick={() => handleNextButton()}> Next </button>
            <h2>{recommendations[recommendationIndex]?.prefScore}</h2>
            {recommendations.map((rec, i) => (
              <p key={`movierec${i}`}>{rec.original_title}</p>
            ))}
          </>
        )}
      </main>
  );
}
