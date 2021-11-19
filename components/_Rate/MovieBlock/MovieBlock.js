import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetMovieRandomQuery } from '../../../services/movie';
import rateSlice from '../rateSlice';

const MovieBlock = () => {
  const query = useGetMovieRandomQuery();
  const [movieData, setMovieData] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isError, setIsError] = React.useState(false);

  const didRate = useSelector((state) => state.rate.didRate);
  const dispatch = useDispatch();

  useEffect(() => {
    if (didRate) {
      dispatch(rateSlice.actions.setDidRate(false));
      query.refetch();
    }
    if (query.isSuccess) {
      setIsLoading(false);
      setMovieData(query.data.getRandomMovie);
      dispatch(rateSlice.actions.setRatingMovieIMDBID(query.data.getRandomMovie.IMDB_ID));
    }
  }, [query, didRate, dispatch]);

  const movie = (
    <div className="movie-block">
      <div className="movie-block__header">
        <div className="movie-block__title">
          <h1>
            {movieData?.title} ({movieData?.release_date.substring(0, 4)})
          </h1>
        </div>
        <div className="movie-block__rating">
          {/* <h2>{movieData?.popularity}</h2> */}
        </div>
      </div>
      <div className="movie-block__body">
        <div className="movie-block__poster">
          {/* <img src={`https://http://img.omdbapi.com/?i=${movie.IMDB_ID}&h=600&apikey=${API_KEY}`} alt="poster" /> */}
        </div>
        <div className="movie-block__description">
          {/* <p>{movieData?.overview}</p> */}
        </div>
      </div>
    </div>
  );
  return <>{isLoading ? <div>Loading...</div> : movie}</>;
};

export default MovieBlock;
