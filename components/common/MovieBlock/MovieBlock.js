import { Container, Stack, Typography } from '@mui/material';
import Image from 'next/image'
import styles from "./MovieBlock.module.css";


const MovieBlock = ({moviePrefIndex = null, movie, children}) => {
  return (
    <Container sx={{mt: 2}} className={styles.flexColumnCentered}>
        <Stack spacing={2}>
          <Typography noWrap sx={{height: 40}} variant={movie.title.length < 25 ? 'h4' : 'h6'}>
            {movie.title} ({movie.release_date.substring(0, 4)})
          </Typography>
          <Typography variant='h6' sx={{textAlign: 'center', color: 'secondary.main'}}>{moviePrefIndex != null ? `Your #${moviePrefIndex + 1} Pick` : ''}</Typography>
        </Stack>
      <div className={styles.movieBlock__body}>
        <div className="movie-block__poster">
          <Image width={500} height={750} quality="85" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
        </div>
        {children}
        <div className={styles.movieBlock__description}>
          <p>{movie.overview}</p>
        </div>
      </div>
    </Container>
  );
};

export default MovieBlock;
