import { getMovieReviews } from 'utils/api';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import css from './Reviews.module.css';
import PropTypes from 'prop-types';

const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  const getReviews = async id => {
    const movieReviews = await getMovieReviews(id);
    setReviews(movieReviews.results);
  };

  useEffect(() => {
    getReviews(movieId);
  }, [movieId]);

  return (
    <section>
      {reviews.length === 0 ? (
        <p style={{ textAlign: 'center' }}>
          There are yet no reviews for this movie.
        </p>
      ) : (
        <div className={css.reviewsContainer}>
          <h1>Reviews</h1>
          <ul className={css.reviewsList}>
            {reviews.map(review => (
              <li key={review.id} className={css.reviewCard}>
                <span style={{ fontWeight: 700 }}>Author:</span> {review.author}
                <p>{review.content}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

Reviews.propTypes = {
  movieId: PropTypes.number,
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      author: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })
  ),
};

export default Reviews;
