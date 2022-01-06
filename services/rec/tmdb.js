import axios from 'axios';

export async function getMovieData(id) {
  return await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`);
}