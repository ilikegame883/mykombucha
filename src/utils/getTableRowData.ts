const createData = (
  name,
  brewery,
  kombucha_type,
  user_rating,
  rating_avg,
  review_date,
  kombucha_id,
  review_author,
  review_id,
  image,
  brewery_slug,
  review_comment
) => {
  return {
    name,
    brewery,
    kombucha_type,
    user_rating,
    rating_avg,
    review_date,
    kombucha_id,
    review_author,
    review_id,
    image,
    brewery_slug,
    review_comment,
  };
};

//TODO: refactor this function to be more readable
export const getUserReviewRowData = (userData) => {
  return userData.map(
    ({
      kombucha,
      rating,
      createdAt,
      review_author,
      _id: review_id,
      comment: review_comment,
    }) => {
      const review_date = createdAt.slice(0, createdAt.lastIndexOf("T"));
      const { name, kombucha_type, rating_avg, _id, image } = kombucha.data;
      const { brewery, brewery_slug } = kombucha;
      return createData(
        name,
        brewery,
        kombucha_type,
        rating,
        rating_avg.toFixed(2),
        review_date,
        _id,
        review_author,
        review_id,
        image,
        brewery_slug,
        review_comment
      );
    }
  );
};
