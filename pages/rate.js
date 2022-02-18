import { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import rateSlice from '../components/_Rate/rateSlice';

import commonStyles from '../styles/common.module.css';
import styles from '../styles/Rate.module.css';

import { gql, useQuery } from '@apollo/client';

import { Button, Container, CircularProgress } from '@mui/material';

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
  const GET_MOVIE_TO_RATE = gql`
    query Query($userId: Int!) {
      getMovie(userId: $userId) {
        id
      }
    }
  `;

  const { loading, error, data, refetch } = useQuery(GET_MOVIE_TO_RATE, {
    variables: {
      userId: 1,
    },
  });
  // const [movieData, setMovieData] = useState(null);

  const [foundUnratedMovie, setFoundUnratedMovie] = useState(false);

  const db = getFirestore();

  const dispatch = useDispatch();
  const didRate = useSelector((state) => state.rate.didRate);
  const [movieData, setMovieData] = useState(null);
  const [movieIdsToRate, setMovieIdsToRate] = useState([]);

  if (data && movieIdsToRate.length < 10) {
    if (!movieIdsToRate.some((id) => id === data.getMovie.id)) {
      setMovieIdsToRate([...movieIdsToRate, data.getMovie.id]);
      refetch();
      console.log('movieIdsToRate', movieIdsToRate);
    }
  }

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
      // remove first movie from movieIdsToRate
      const newMovieIdsToRate = movieIdsToRate.slice(1);
      setMovieIdsToRate(newMovieIdsToRate);
      setFoundUnratedMovie()
      dispatch(rateSlice.actions.setDidRate(false));
    } else if (movieIdsToRate.length > 0) {
      const ratingsQuery = query(
        collection(db, 'Ratings'),
        where('tmdb_id', '==', movieIdsToRate[0])
      );
      checkIfRated(ratingsQuery);
    } else if (loading) {
      // do nothing
    } else if (error) {
      console.log(error);
    }

    if (foundUnratedMovie) {
      getMovieData(data.getMovie.id).then((res) => {
        setMovieData(res.data);
      });
      dispatch(rateSlice.actions.setRatingMovieID(data.getMovie.id));
    }
  }, [didRate, foundUnratedMovie, dispatch, refetch]);
  // get user index in users by uid
  return (
    <Container className={''}>
      {loading ? <CircularProgress /> : <MovieBlock data={movieData} />}
      <RateButtons />
    </Container>
  );
}
