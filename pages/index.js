import { useSelector } from 'react-redux';
import commonStyles from '../styles/common.module.css';
import Container from '@mui/material/Container';
import SavedMoviesContainer from '../components/_Index/SavedMoviesContainer/SavedMoviesContainer';
import { Typography, Stack } from '@mui/material';
import styles from '../styles/Home.module.css';
import MovieBackgroundGrid from '../components/_Index/MovieBackgroundGrid/MovieBackgroundGrid';

export default function Home({ moviePosters }) {
  const auth = useSelector((state) => state.firebase.auth);
  const loggedIn = auth.isLoaded && !auth.isEmpty;
  if (loggedIn) {
    return (
      <Container className={commonStyles.ContainerLoading}>
        <SavedMoviesContainer />
      </Container>
    );
  } else {
    return (
      <Container justify="center">
        <div className={styles.heroContainer}>
          <div>
            <Typography
              variant="h1"
              sx={{
                px: 3,
                mt: 5,
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              Stop wasting your time looking for good movies and start watching
              them.
            </Typography>
            <Typography
              variant="h2"
              sx={{
                px: 3,
                mt: 5,
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              With <span className={styles.rainbowText}>machine learning.</span>
            </Typography>
          </div>
          <MovieBackgroundGrid moviePosters={moviePosters} />
        </div>
      </Container>
    );
  }
}

export async function getServerSideProps() {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&page=1&sort_by=popularity.desc`,
    {
      method: 'GET',
      redirect: 'follow',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const movies = await res.json();
  // we only need the urls for the images in an array
  const moviePosters = movies.results.map((movie) => movie.poster_path);
  console.log(moviePosters);

  return { props: { moviePosters } };
}
