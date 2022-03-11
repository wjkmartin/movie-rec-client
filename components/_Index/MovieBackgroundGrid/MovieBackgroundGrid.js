import { Container, Grid as div } from '@mui/material';
import { useEffect } from 'react';
import Image from 'next/image';
import styles from './MovieBackgroundGrid.module.css';

export default function MovieBackgroundGrid({ moviePosters }) {
  return (
    <Container
      
      className={styles.MovieBackgroundGrid}
    >
      <div className={styles.MovieBackgroundGrid__wrapper}>
        {moviePosters.slice(0, 18).map((moviePoster, index) => (
          <div key={index} className={styles.MovieBackgroundGrid__poster}>
            <Image
              src={`https://image.tmdb.org/t/p/w500${moviePoster}`}
              alt=""
              width={140}
              height={210}
            />
          </div>
        ))}
      </div>
    </Container>
  );
}
