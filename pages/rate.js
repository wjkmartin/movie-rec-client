import { useEffect, useState } from 'react';
import useSWR from 'swr';

import { useSelector, useDispatch } from 'react-redux';

import styles from '../styles/Rate.module.css';

import { Button, Container, CircularProgress } from '@mui/material';

import MovieBlock from '../components/common/MovieBlock/MovieBlock';
import RateButtons from '../components/_Rate/RateButtons/RateButtons';

import { getFirebase } from 'react-redux-firebase';

export default function Rate() {
  const [movieDataList, setMovieDataList] = useState([]);
  const [didRate, setDidRate] = useState(false);
  const [pageToFetch, setPageToFetch] = useState(1);

  const firebase = getFirebase();
  const profile = useSelector((state) => state.firebase.profile);
  const auth = useSelector((state) => state.firebase.auth);

  const fetcher = ({ url, page }) =>
    fetch(
      url,
      {
        method: 'GET',
        redirect: 'follow',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        const movieRecord = profile.movieRecordConfirmed || [];
        const confirmedWatchedOrUnwatchedById = Object.entries(movieRecord).map(
          ([id, watched]) => parseInt(id)
        );
        const unwatchedMovies = res.filter(
          (movie) => !confirmedWatchedOrUnwatchedById.includes(movie.id)
        );
        if (unwatchedMovies.length === 0) {
          console.log('no more movies to rate');
          setPageToFetch(pageToFetch + 1);
        } else {
          setMovieDataList(unwatchedMovies);
        }
        return unwatchedMovies;
      })
      .catch((err) => console.log(err));

  let { data, error } = useSWR(
    movieDataList.length === 0
      ? {
          url: `/api/suggest/${pageToFetch}`,
        }
      : null,
    fetcher
  );

  if (error) {
    return (
      <Container sx={{mx: 'auto'}} maxWidth="lg" >
        <p>We've messed up somehow... please try again.</p>
      </Container>
    );
  }

  useEffect(() => {
    if (didRate) {
      firebase.ref(`/users/${auth.uid}/needToRegenRecs`).set(true);
      if (movieDataList.length === 0) {
        setPageToFetch(pageToFetch + 1);
      } else {
        setMovieDataList(movieDataList.slice(1));
      }
      setDidRate(false);
    }
  }, [didRate]);

  if (movieDataList.length > 0) {
    return (
      <Container sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}} maxWidth="lg" >
        <MovieBlock movie={movieDataList[0]} />
        <RateButtons sx={{mx: 'auto'}} movieId={movieDataList[0].id} setDidRate={setDidRate} />
      </Container>
    );
  } else
    return (
      <Container sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', height:'90vh'}} >
        <CircularProgress />
      </Container>
    );
}
