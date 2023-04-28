import { MoviesList } from 'components/MoviesList/MoviesList';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovie } from 'utils/api';
import css from './Movies.module.css';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';

  useEffect(() => {
    if (query === null) return;

    async function loadMovies() {
      const searchedMovies = await searchMovie(query);
      setMovies(searchedMovies);
    }

    loadMovies();
  }, [query]);

  const handleSearch = e => {
    e.preventDefault();
    setSearchParams({ query: e.target[0].value });
    e.target.reset();
  };

  return (
    <div>
      <form onSubmit={handleSearch} className={css.searchForm}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
          className={css.searchInput}
        />
        <button type="submit" className={css.searchButton}>
          <span>Search</span>
        </button>
      </form>
      <MoviesList movies={movies} />
    </div>
  );
};

export default Movies;
