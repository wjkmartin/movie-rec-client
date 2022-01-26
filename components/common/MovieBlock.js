import { useEffect, useState } from 'react';
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux';
import styles from "./MovieBlock.module.css";


const MovieBlock = (props) => {
  const [movieData, setMovieData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (props.data) {
      setMovieData(props.data);
      setIsLoading(false);
    }
  }, [props.data]);

  const movie = (
    <div className={styles.MovieBlock}>
      <div className="movie-block__header">
        <div className="movie-block__title">
          <h1>
            {movieData?.title} ({movieData?.release_date.substring(0, 4)})
          </h1>
        </div>
      </div>
      <div className={styles.movieBlock__body}>
        <div className="movie-block__poster">
          <Image width="500px" height="750px" src={`https://image.tmdb.org/t/p/w500${movieData?.poster_path}`} alt="poster" />
        </div>
        <div className={styles.movieBlock__description}>
          <p>{movieData?.overview}</p>
        </div>
      </div>
    </div>
  );
  return <>{movie}</>;
};

export default MovieBlock;
