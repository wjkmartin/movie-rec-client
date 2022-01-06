import React, { useEffect, useState } from 'react';
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux';
import { useGetMovieRandomQuery } from '../../../services/rate/movie';

const MovieBlock = () => {
  const query = useGetMovieRandomQuery();
  const [movieData, setMovieData] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isError, setIsError] = React.useState(false);


  const dispatch = useDispatch();

  useEffect(() => {
    
  }, []);

  const movie = (
    <div className="movie-block">
      <div className="movie-block__header">
        <div className="movie-block__title">
          <h1>
            {movieData?.title} ({movieData?.release_date.substring(0, 4)})
          </h1>
        </div>
        <div className="movie-block__rating">
          <h2>{movieData?.popularity}</h2>
        </div>
      </div>
      <div className="movie-block__body">
        <div className="movie-block__poster">
          <Image width="500px" height="750px" src={`https://image.tmdb.org/t/p/w500${movieData?.poster_path}`} alt="poster" />
        </div>
        <div className="movie-block__description">
          <p>{movieData?.overview}</p>
        </div>
      </div>
    </div>
  );
  return <>{isLoading ? <div>Loading...</div> : movie}</>;
};

export default MovieBlock;
