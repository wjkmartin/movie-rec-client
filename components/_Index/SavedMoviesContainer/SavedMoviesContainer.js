import { useSelector } from 'react-redux';
import { Box, Grid } from '@mui/material';
import MovieCard from '../../common/MovieCard/MovieCard';

const SavedMoviesContainer = () => {
  const savedMovies = useSelector(
    (state) => state.firebase.profile.savedMoviesById
  ) || [];

  return (
    <Box>
      <h1>Saved Movies</h1>
      <Grid container spacing={2}>
        {savedMovies.map((movieId, i) => (
          <Grid key={`SAVED-MOVIE-CARD-${i}`} item xs={4}>
            <MovieCard movieId={movieId} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default SavedMoviesContainer;