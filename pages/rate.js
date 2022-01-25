import { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import rateSlice from '../components/_Rate/rateSlice';

import commonStyles from '../styles/common.module.css';
import styles from '../styles/Rate.module.css';

import { gql, useQuery } from '@apollo/client';

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

  const GET_MOVIE_TO_RATE = gql`
    query Query($userId: Int!) {
      getMovie(userId: $userId) {
        id
      }
    }
  `;

  const { loading, error, data, refetch } = useQuery(
    GET_MOVIE_TO_RATE,
    {
      variables: {
        userId: 1,
      },
    }
  );
  // const [movieData, setMovieData] = useState(null);

  const [foundUnratedMovie, setFoundUnratedMovie] = useState(false);

  const db = getFirestore();

  const dispatch = useDispatch();
  const didRate = useSelector((state) => state.rate.didRate);
  const [movieData, setMovieData] = useState(null);

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
      refetch();
    } else if (data) {
      const ratingsQuery = query(
        collection(db, 'Ratings'),
        where('tmdb_id', '==', data.getMovie.id)
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
      dispatch(
        rateSlice.actions.setRatingMovieID(data.getMovie.id)
      );
    }
  }, [data, didRate, foundUnratedMovie, dispatch, refetch]);
  // get user index in users by uid
  return (
    <Container style={!hasStartedRating ? {justifyContent: 'center'} : {justifyContent: 'flex-start'}} className={ commonStyles.ContainerLoading }>
      {hasStartedRating ? (
        <>
          <MovieBlock data={movieData} /> 
          <RateButtons/>
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
