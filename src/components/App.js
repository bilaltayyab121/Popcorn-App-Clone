import { useReducer, useState } from "react";

import Box from "./Box";
import Main from "./Main";
import NavBar from "./NavBar";
import Loading from "./Loading";
import MovieList from "./MovieList";
import SearchBar from "./SearchBar";
import NumResults from "./NumResults";
import MovieDetails from "./MovieDetails";
import ErrorMessage from "./ErrorMessage";
import WatchedSummary from "./WatchedSummary";
import WatchedMoviesList from "./WatchedMoviesList";
import useMovies from "../hooks/useMovies";
import useLocalStroageState from "./../hooks/useLocalStroageState";

// const initialState = { query: "" };
// const reducer = (state, action) => {
//   switch (action.type) {
//     case "setQuery":
//       return { ...state, query: action.payload };
//     default:
//       throw new Error("Unknown Error");
//   }
// };

export default function App() {
  // const [state, dispatch] = useReducer(reducer, initialState);
  // const { query } = state;
  const [query, setQuery] = useState("");
  const { movies, isLoading, error } = useMovies(query);
  const [selectedId, setSelectedId] = useState(null);
  const [watched, setWatched] = useLocalStroageState([], "watched");

  const handleSelectedId = (id) => {
    setSelectedId(selectedId === id ? null : id);
  };

  function handleOnClose() {
    setSelectedId(null);
  }

  const handleAddWatched = (movie) => {
    setWatched((watched) => [...watched, movie]);
  };

  const handleDeleteWatched = (id) => {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  };

  return (
    <>
      <NavBar>
        <SearchBar
          query={query}
          // setQuery={dispatch({ type: "setQuery", payload: query })}
          setQuery={setQuery}
        />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loading />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectedId={handleSelectedId} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onClose={handleOnClose}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
