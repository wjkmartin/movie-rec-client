export default async function handler(req, res) {
    const { id } = req.query;
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
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
      console.log(data)
      res.status(200).json(data.results);
    }
  }
