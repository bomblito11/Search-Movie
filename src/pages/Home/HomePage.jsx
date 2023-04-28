import { getTrending } from 'utils/api';
import { useState, useEffect } from 'react';
import { MoviesList } from 'components/MoviesList/MoviesList';
import css from './HomePage.module.css';

const HomePage = () => {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    async function loadTrending() {
      const trendingMovies = await getTrending();
      setTrending([...trendingMovies]);
    }
    loadTrending();
  }, []);

  return (
    <div className={css.homeContainer}>
      <h1 className={css.trendingHeader}>Trending today</h1>
      <MoviesList movies={trending} />
    </div>
  );
};

export default HomePage;
