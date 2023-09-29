import React from "react";
import Movie from "./Movie";

const MovieList = ({ movies, onSelectedId }) => {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie key={movie.imdbID} movie={movie} onSelectedId={onSelectedId} />
      ))}
    </ul>
  );
};

export default MovieList;
