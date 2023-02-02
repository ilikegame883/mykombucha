const createData = (
  name: string,
  brewery_name: string,
  kombucha_type: string,
  user_rating: number,
  rating_avg: number,
  review_date: string,
  kombucha_id: string,
  review_author: string,
  review_id: string,
  image: string,
  brewery_slug: string,
  review_comment: string
) => {
  return {
    name,
    brewery_name,
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
      const {
        name,
        kombucha_type,
        rating_avg,
        _id,
        image,
        brewery_name,
        brewery_slug,
      } = kombucha.data;
      return createData(
        name,
        brewery_name,
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
