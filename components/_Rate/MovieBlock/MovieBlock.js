import React from "react";
import { useGetMovieRandomQuery } from "../../../services/movie"

const MovieBlock = () => {
    const { data, error, isLoading } = useGetMovieRandomQuery();
    const movieData = data?.getRandomMovie;

    const movie = <div className="movie-block">
    <div className="movie-block__header">
        <div className="movie-block__title">
        <h1>{movieData?.title} ({movieData?.release_date.substring(0, 4)})</h1>
        </div>
        <div className="movie-block__rating">
        <h2>{movieData?.popularity}</h2>
        </div>
    </div>
    <div className="movie-block__body">
        <div className="movie-block__poster">
        {/* <img src={`https://http://img.omdbapi.com/?i=${movie.IMDB_ID}&h=600&apikey=${API_KEY}`} alt="poster" /> */}
        </div>
        <div className="movie-block__description">
        <p>
            {movieData?.overview}
        </p>
        </div>
    </div>
    </div>;
    return (
        <>
            {isLoading ? <div>Loading...</div> : movie}
        </>
    );
}

export default MovieBlock;