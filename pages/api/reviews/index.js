import Review from "../../../src/models/reviewModel";
import User from "../../../src/models/userModel";
import Kombucha from "../../../src/models/kombuchaModel";
import connectDB from "../../../src/lib/connectDB";

const handler = async (req, res) => {
  await connectDB();

  switch (req.method) {
    case "POST":
      await postReview(req, res);
      break;
    case "DELETE":
      await deleteReview(req, res);
      break;
  }
};

const postReview = async (req, res) => {
  try {
    const {
      rating,
      comment,
      served_in,
      user,
      product,
      brewery,
      username,
      userAvatar,
    } = req.body;

    const newReview = new Review({
      rating,
      comment,
      served_in,
      user,
      username,
      userAvatar,
      product,
      brewery,
    });
    await newReview.save();

    // //find user by id, add +1 to review total for user
    await User.updateOne({ _id: user }, [
      {
        $set: {
          review_total: {
            $add: ["$review_total", 1],
          },
        },
      },
    ]);

    //move to new endpoint?
    //1. find kombucha by name and update review count and get sum of ratings
    //2. create a new $set stage to add avg field with the latest count / rating sum total
    await Kombucha.updateOne({ _id: product }, [
      {
        $set: {
          review_count: {
            $add: ["$review_count", 1],
          },
          rating_sum: {
            $add: ["$rating_sum", rating],
          },
        },
      },
      {
        $set: {
          avg: { $divide: ["$rating_sum", "$review_count"] },
        },
      },
    ]);

    res.json({ msg: "Review Added Successfully!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: "Unable to submit review." });
  }
};

const deleteReview = async (req, res) => {
  const { review_id, user_id, product_id, rating } = req.body;
  try {
    await Review.deleteOne({ _id: review_id });

    //find user by id, remove 1 from user review_total
    await User.updateOne({ _id: user_id }, [
      {
        $set: {
          review_total: {
            $subtract: ["$review_total", 1],
          },
        },
      },
    ]);

    //move to new endpoint?
    //1. find kombucha by name from review
    //2. subtract 1 from review count and subtract review rating from rating_sum
    //3. create a new $set stage to update avg field with the latest count and sum ratings
    await Kombucha.updateOne({ _id: product_id }, [
      {
        $set: {
          review_count: {
            $subtract: ["$review_count", 1],
          },
          rating_sum: {
            $subtract: ["$rating_sum", rating],
          },
        },
      },
      {
        $set: {
          avg: {
            $cond: [
              { $eq: ["$review_count", 0] },
              0,
              { $divide: ["$rating_sum", "$review_count"] },
            ],
          },
        },
      },
    ]);
    return res.json({ msg: "Review Deleted!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: err.message });
  }
};

export default handler;
