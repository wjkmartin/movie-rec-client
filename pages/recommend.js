import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFirebase, useFirebaseConnect } from 'react-redux-firebase';
import userSlice from '../slices/userSlice';
import { getMovieData } from '../services/rec/tmdb';
import MovieBlock from '../components/common/MovieBlock/MovieBlock';

import useSWR from 'swr';

import AddToSavedButton from '../components/common/AddToSavedButton/AddToSavedButton';

import { Fab, Container, Button, CircularProgress } from '@mui/material';
import { ArrowBack, ArrowForward, Add, Visibility } from '@mui/icons-material';
import commonStyles from '../styles/common.module.css';
import styles from '../styles/Rec.module.css';

export default function Recommend() {
  const dispatch = useDispatch();
  const firebase = getFirebase();
  const [selectedMovieIndex, setSelectedMovieIndex] = useState(0);
  const userData = useSelector((state) => state.firebase.profile);
  const auth = useSelector((state) => state.firebase.auth);
  const needToRegenRecs = userData.needToRegenRecs;

  const RECS_TO_FETCH = 5;
  const RECS_TO_SHOW = 5;

  const fetcher = ({ url, uid, gender, age }) =>
    fetch(`${url}?uid=${uid}&gender=${gender}&age=${age}`, {
      method: 'GET',
      redirect: 'follow',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        const processedData = json
          .sort((a, b) => b.score - a.score)
          .slice(0, RECS_TO_FETCH);
        return populateDataForPrefscoresArray(processedData);
      })
      .then((res) => {
        firebase.set(`users/${auth.uid}/recommendations`, res);
        firebase.set(`users/${auth.uid}/needToRegenRecs`, false);
        return res;
      })
      .catch((err) => console.log(err));

  let { data, error } = useSWR(
    needToRegenRecs 
      ? {
          url: '/api/prefscores',
          uid: userData.id,
          gender: userData.gender,
          age: new Date().getFullYear() - userData.yob,
        }
      : null,
    fetcher
  );

  if (!data) {
    data = userData.recommendations
  } 

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
          <AddToSavedButton movieId={data[selectedMovieIndex].id} savedMoviesById={userData.savedMoviesById} />
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
