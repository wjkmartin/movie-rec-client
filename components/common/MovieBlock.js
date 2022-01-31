import Image from 'next/image'
import styles from "./MovieBlock.module.css";


const MovieBlock = ({movie}) => {
  return (
    <div className={styles.MovieBlock}>
      <div className="movie-block__header">
        <div className="movie-block__title">
          <h1>
            {movie.title} ({movie.release_date.substring(0, 4)})
          </h1>
        </div>
      </div>
      <div className={styles.movieBlock__body}>
        <div className="movie-block__poster">
          <Image width={500} height={750} quality="85" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
        </div>
        <div className={styles.movieBlock__description}>
          <p>{movie.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieBlock;
