import { getMovieCredits } from 'utils/api';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import css from './Credits.module.css';
import PropTypes from 'prop-types';

const Credits = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  const getCast = async id => {
    const movieCast = await getMovieCredits(id);
    setCast(movieCast.cast);
  };

  useEffect(() => {
    getCast(movieId);
  }, [movieId]);

  return (
    <section>
      <div className={css.castContainer}>
        <h1>Cast</h1>
        <ul className={css.castList}>
          {cast.map(actor => (
            <li key={actor.id} className={css.castCard}>
              <img
                className={css.castImg}
                src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                alt={`${actor.name} profile`}
              />
              <p>{actor.name}</p>
              <p>Character: {actor.character}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

Credits.propTypes = {
  movieId: PropTypes.number,
  cast: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      character: PropTypes.string.isRequired,
      profile_path: PropTypes.string.isRequired,
    })
  ),
};

export default Credits;
