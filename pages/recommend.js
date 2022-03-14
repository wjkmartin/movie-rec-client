import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFirebase } from 'react-redux-firebase';
import { getMovieData } from '../services/rec/tmdb';
import MovieBlock from '../components/common/MovieBlock/MovieBlock';

import useSWR from 'swr';

import AddToSavedButton from '../components/common/AddToSavedButton/AddToSavedButton';

import { Fab, Container, Button, CircularProgress, Stack } from '@mui/material';
import { ArrowBack, ArrowForward, Add } from '@mui/icons-material';

import styles from '../styles/Rec.module.css';
import SeenItButton from '../components/_Recommend/SeenItButton/SeenItButton';
import DontRecButton from '../components/_Recommend/DontRecButton/DontRecButton';

export default function Recommend() {
  const dispatch = useDispatch();
  const firebase = getFirebase();
  const userData = useSelector((state) => state.firebase.profile);
  const moviesToHide = Object.values(userData.moviesToNotRecommend || {});

  const auth = useSelector((state) => state.firebase.auth);

  const RECS_TO_FETCH = 100;

  const [selectedMovieIndex, setSelectedMovieIndex] = useState(0);
  const [movieData, setMovieData] = useState(null);

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
          .filter((movie) => moviesToHide.includes(movie.id) === false)
          .slice(0, RECS_TO_FETCH);
        return populateDataForPrefscoresArray(processedData);
      })
      .then((res) => {
        firebase.set(`users/${auth.uid}/recommendations`, res);
        firebase.set(`users/${auth.uid}/needToRegenRecs`, false);
        setMovieData(res);
        return res;
      })
      .catch((err) => console.log(err));

  let { data, error } = useSWR(
    userData.needToRegenRecs
      ? {
          url: '/api/prefscores',
          uid: userData.id,
          gender: userData.gender,
          age: new Date().getFullYear() - userData.yob,
        }
      : null,
    fetcher
  );

  useEffect(() => {
    if (!data && !movieData) {
      setMovieData(userData.recommendations);
    }
  }, []);

  useEffect(() => { 
    if (movieData && movieData.some((r) => moviesToHide.indexOf(r.id) >= 0)) {
      setMovieData(
        movieData.filter((movie) => moviesToHide.includes(movie.id) === false)
      );
      // setSelectedMovieIndex(
      //   selectedMovieIndex === movieData.length - 1 ? 0 : selectedMovieIndex + 1
      // );
      // handle case where you are on the last movie and you click the do not show button
    }
  }, [moviesToHide]);

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
      selectedMovieIndex === movieData.length - 1 ? 0 : selectedMovieIndex + 1
    );
  };

  const handlePreviousButton = () => {
    // set the selected movie index to the previous one, and if it's 0, set it to the last one
    setSelectedMovieIndex(
      selectedMovieIndex === 0 ? movieData.length - 1 : selectedMovieIndex - 1
    );
  };

  if (error) {
    return (
      <Container
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '90vh',
        }}
      >
        <h3>
          Error fetching recommendations! Please refresh the page. The developer
          responsible has been automatically fired 🥾.
        </h3>
      </Container>
    );
  }

  if (!movieData) {
    return (
      <Container
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '90vh',
        }}
      >
        <Stack spacing={4} sx={{display: 'flex', flexDirection: 'column' ,alignItems: 'center'}}>
          <CircularProgress />
          <p>
            Running the model for the freshest recs. This can take up to a
            minute, so hold on!
          </p>
        </Stack>
      </Container>
    );
  }

  return (
    <Container>
      <MovieBlock
        moviePrefIndex={selectedMovieIndex}
        movie={movieData[selectedMovieIndex]}
      />
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
          <AddToSavedButton
            movieId={movieData[selectedMovieIndex].id}
            savedMoviesById={userData.savedMoviesById}
          />
          <SeenItButton movieId={movieData[selectedMovieIndex].id} />
          <DontRecButton movieId={movieData[selectedMovieIndex].id} />
        </div>
        <p>
          Pref score (higher is better):{' '}
          {String(movieData[selectedMovieIndex]?.prefScore)}
        </p>
      </div>
    </Container>
  );
}
