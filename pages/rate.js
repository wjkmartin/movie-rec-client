import { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useGetNextMovieToRateQuery } from '../services/rate/movie';
import rateSlice from '../components/_Rate/rateSlice';

import commonStyles from '../styles/common.module.css';
import styles from '../styles/Rate.module.css';

import { Button, Container } from '@mui/material';

import {
  getFirestore,
  query,
  collection,
  where,
  getDocs,
} from 'firebase/firestore';

import MovieBlock from '../components/common/MovieBlock';
import RateButtons from '../components/_Rate/RateButtons/RateButtons';
import { getMovieData } from '../services/rec/tmdb';

export default function Rate() {
  const [hasStartedRating, setHasStartedRating] = useState(false);

  const movieQuery = useGetNextMovieToRateQuery();
  const [movieData, setMovieData] = useState(null);
  const [foundUnratedMovie, setFoundUnratedMovie] = useState(false);

  const db = getFirestore();

  const dispatch = useDispatch();
  const didRate = useSelector((state) => state.rate.didRate);

  useEffect(() => {
    const checkIfRated = async (q) => {
      await getDocs(q).then((res) => {
        if (res.docs.length > 0) {
          dispatch(rateSlice.actions.setDidRate(true));
        } else {
          setFoundUnratedMovie(true);
        }
      });
    };

    if (didRate) {
      dispatch(rateSlice.actions.setDidRate(false));
      movieQuery.refetch();
    } else if (movieQuery.isSuccess) {
      console.log('movieQuery.data', movieQuery.data);
      const ratingsQuery = query(
        collection(db, 'Ratings'),
        where('tmdb_id', '==', movieQuery.data.getMovie.id)
      );
      checkIfRated(ratingsQuery);
    }

    if (foundUnratedMovie) {
      getMovieData(movieQuery.data.getMovie.id).then((res) => {
        setMovieData(res.data);
      });
      dispatch(rateSlice.actions.setRatingMovieID(movieQuery.data.getMovie.id));
    }
  }, [movieQuery, didRate, dispatch, db, foundUnratedMovie]);
  // get user index in users by uid

  return (
    <Container className={commonStyles.ContainerLoading}>
      {hasStartedRating ? (
        <>
          <MovieBlock data={movieData} />{' '}
          {/* REFACTOR TO PRESENTATIONAL COMPONENT ONLY */}
          <RateButtons />
        </>
      ) : (
        <Button
          variant="text"
          onClick={() => {
            setHasStartedRating(true);
          }}
        >
          Begin rating
        </Button>
      )}
    </Container>
  );
}
