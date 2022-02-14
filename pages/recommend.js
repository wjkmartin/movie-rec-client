import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import userSlice from '../slices/userSlice';
import { getMovieData } from '../services/rec/tmdb';
import MovieBlock from '../components/common/MovieBlock';

import useSWR from 'swr';

import { request, gql } from 'graphql-request';

import commonStyles from '../styles/common.module.css';
import styles from '../styles/Rec.module.css';

import { Fab, Container, Button, CircularProgress } from '@mui/material';
import { ArrowBack, ArrowForward, Add, Visibility } from '@mui/icons-material';
import AddToSavedMoviesButton from '../components/_Recommend/AddToSavedMoviesButton';

import { getFirestore, doc, getDoc } from 'firebase/firestore';

export default function Recommend() {
  const dispatch = useDispatch();
  const [selectedMovieIndex, setSelectedMovieIndex] = useState(0);
  const didRateSinceLastRec = useSelector(
    (state) => state.user.didRateSinceLastRec
  );
  const savedRecommendations = useSelector(
    (state) => state.user.recommendations
  );

  
  const db = getFirestore();

  const RECS_TO_FETCH = 5;
  const RECS_TO_SHOW = 5;

  const GET_PREFSCORES = gql`
    query getPrefs($user: User!) {
      getPrefscores(user: $user) {
        movieId
        score
      }
    }
  `;

  const fetcher = ({ url, query, variables }) =>
    request(url, query, variables)
      .then((data) => {
        console.log('fetching data');
        const processedData = data.getPrefscores
          .sort((a, b) => b.score - a.score)
          .slice(0, RECS_TO_FETCH);
        return populateDataForPrefscoresArray(processedData);
      })
      .then((res) => {
        dispatch(userSlice.actions.setRecommendations(res));
        dispatch(userSlice.actions.setDidRateSinceLastRec(false));
        return res;
      })
      .catch((err) => console.log(err));

  const { data = savedRecommendations, error } = useSWR(
    didRateSinceLastRec
      ? {
          url: 'http://localhost:4000',
          query: GET_PREFSCORES,
          variables: {
            user: {
              id: currentUser.userIndexIdentifier,
              age: currentUser.age,
              gender: currentUser.gender,
            },
          },
        }
      : null,
    fetcher
  );

  const getDataForMovieAndAppendScore = async (movieId, score) => {
    console.log('fetching details for movie: ', movieId);
    const movie = await getMovieData(movieId);
    return {
      ...movie.data,
      prefScore: score,
    };
  };

  const populateDataForPrefscoresArray = async (prefscoresArray) => {
    return Promise.all(
      prefscoresArray.map(({ movieId, score }) => {
        return getDataForMovieAndAppendScore(movieId, score);
      })
    );
  };

  const handleNextButton = () => {
    // set the selected movie index to the next one, and if it's the last one, set it to 0
    setSelectedMovieIndex(
      selectedMovieIndex === data.length - 1 ? 0 : selectedMovieIndex + 1
    );
  };

  const handlePreviousButton = () => {
    // set the selected movie index to the previous one, and if it's 0, set it to the last one
    setSelectedMovieIndex(
      selectedMovieIndex === 0 ? data.length - 1 : selectedMovieIndex - 1
    );
  };

  if (error) {
    return (
      <Container className={commonStyles.ContainerLoading}>
        <h3>
          Error fetching recommendations! Please refresh the page. The developer
          responsible has been automatically fired 🥾.
        </h3>
      </Container>
    );
  }

  if (!data) {
    return (
      <Container className={commonStyles.ContainerLoading}>
        <CircularProgress />
        <p>Running the model for the freshest recs</p>
      </Container>
    );
  }

  return (
    <Container>
      <MovieBlock movie={data[selectedMovieIndex]} />
      <div className={styles.buttonContainerForBack}>
        <Fab
          className={styles.buttonForBack}
          onClick={() => handlePreviousButton()}
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
          <AddToSavedMoviesButton
            db={db}
            userId={currentUser.userIndexIdentifier}
            movieId={data[selectedMovieIndex]?.id}
            savedMovies={userProfile?.savedMoviesById}
          />
          <Button
            className={styles.bottomRowButton}
            color="inherit"
            variant="text"
          >
            <Visibility />
            <span>Seen it!</span>
          </Button>
        </div>
        <p>
          Pref score (higher is better):{' '}
          {String(data[selectedMovieIndex]?.prefScore)}
        </p>
      </div>
    </Container>
  );
}
