import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getMovieData } from '../../../services/rec/tmdb';
import { styled } from '@mui/material/styles';
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  CircularProgress,
  IconButton,
  Typography,
  CardActions,
  Stack,
  Button,
  Chip,
} from '@mui/material';
import {
  MoreVert,
  Favorite,
  AllOut,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';

import AddToSavedButton from '../AddToSavedButton/AddToSavedButton';

import styles from './MovieCard.module.css';
import FindButton from '../FindButton/FindButton';

const MovieCard = ({ movieId }) => {
  const profile = useSelector((state) => state.firebase.profile);
  const getMovieDataById = async (movieId) => {
    const movie = await getMovieData(movieId);
    return {
      ...movie.data,
    };
  };

  const [movieData, setMovieData] = useState(null);

  useEffect(() => {
    getMovieDataById(movieId).then((res) => {
      setMovieData(res);
    });
  }, [movieId]);

  function truncate(str, n, useWordBoundary) {
    if (str.length <= n) {
      return str;
    }
    const subString = str.substr(0, n - 1); // the original check
    return (
      (useWordBoundary
        ? subString.substr(0, subString.lastIndexOf(' '))
        : subString) + '...'
    );
  }

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleFavoriteClick = () => {};

  const handleFindClick = () => {
    // show the popup and set local state to the id
  };

  if (movieData) {
    return (
      <Card sx={{ maxWidth: 800 }}>
        <CardHeader
          sx={{ paddingBottom: 0 }}
          avatar={
            <Typography>
              {movieData.vote_average.toFixed(1) + ' ' + '/ 10'}
            </Typography>
          }
          titleTypographyProps={{
            variant: 'h7',
            color: 'textPrimary',
            fontWeight: 'bold',
          }}
          title={movieData.title}
          subHeader={movieData.release_date}
          action={
            <IconButton aria-label="settings">
              <MoreVert />
            </IconButton>
          }
        ></CardHeader>
        <Stack sx={{ pt: 0, pb: 2, px: 1 }} spacing={1} direction="row">
          {movieData.genres.map((genre) => (
            <Chip size="small" key={genre.id} label={genre.name} />
          ))}
        </Stack>
        <CardMedia
          component="img"
          height="194"
          image={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
          alt={movieData.title}
        />
        <CardContent>
          <Typography
            gutterBottom="true"
            paragraph="true"
            variant="body2"
            color="text.secondary"
          >
            {expanded
              ? movieData.overview
              : truncate(movieData.overview, 150, true)}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Stack direction="row" spacing={2}>
            <AddToSavedButton
              movieId={movieData.id}
              savedMoviesById={profile.savedMoviesById}
            />
            <FindButton movieId={movieData.id} />
          </Stack>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
      </Card>
    );
  } else {
    return <CircularProgress />;
  }
};

export default MovieCard;
