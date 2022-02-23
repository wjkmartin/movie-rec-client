export default async function handler(req, res) {
  const { page } = req.query;
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&page=${page}&sort_by=popularity.desc`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  if (!response.ok) {
    throw Error(response.statusText);
  } else {
    const data = await response.json();
    res.status(200).json(data.results);
  }
}
