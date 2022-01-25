import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getMovieData } from '../services/rec/tmdb';
import MovieBlock from '../components/common/MovieBlock';

import { gql, useQuery } from '@apollo/client';

import commonStyles from '../styles/common.module.css';
import styles from '../styles/Rec.module.css';

import { Fab, Container, Button, CircularProgress } from '@mui/material';
import { ArrowBack, ArrowForward, Add, Visibility } from '@mui/icons-material';

export default function Recommend() {
  // make a firebase connection
  // get the current state of the database
  const [recommendations, setRecommendations] = useState([]);
  const [recommendationIndex, setRecommendationIndex] = useState(0);
  const [loadingMovieRecs, setLoadingMovieRecs] = useState(true);

  
  const currentUser = useSelector((state) => state.user);

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

  const { loadingUserData, error, data } = useQuery(GET_PREFSCORES, {
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
              setLoadingMovieRecs(false);
            }
          });
        };
        populateData();
      }
    }
  }, [data]);

  return (
    <Container className={loadingUserData || loadingMovieRecs ? commonStyles.ContainerLoading : ''}>
      {loadingUserData || loadingMovieRecs ? (
        <>
          <CircularProgress />
          <p>Running the model for the freshest recs</p>
        </>
      ) : (
        <>
          <MovieBlock data={recommendations[recommendationIndex]} />
          <div className={styles.buttonContainerForBack}>
            <Fab
              className={styles.buttonForBack}
              onClick={() => handlePrevButton()}
              color="default"
              aria-label="add"
            >
              <ArrowBack />
            </Fab>
            <Fab
              className={styles.buttonForBack}
              onClick={() => handleNextButton()}
              color="default"
              aria-label="add"
            >
              <ArrowForward />
            </Fab>
          </div>
          <div className={styles.bottomRow}>
            <div>
            <Button className={styles.bottomRowButton} color="inherit" variant="text">
              <Add />
              <span>Add to my saved movies</span>
            </Button>
            <Button className={styles.bottomRowButton} color="inherit" variant="text">
              <Visibility />
              <span>Seen it!</span>
            </Button>
            </div>
            <p>Pref score (higher is better): {String(recommendations[recommendationIndex]?.prefScore)}</p>
          </div>
        </>
      )}
    </Container>
  );
}
