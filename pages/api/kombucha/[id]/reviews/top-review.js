import Review from "../../../../../src/models/reviewModel";
import connectDB from "../../../../../src/lib/connectDB";
import mongoose from "mongoose";

//KombuchaReviews.js
//get top-review for kombucha with highest number of user likes and > 1 like
const handler = async (req, res) => {
  await connectDB();

  if (req.method !== "GET") {
    return;
  }
  try {
    let id = mongoose.Types.ObjectId(req.query.id);

    const kombuchaReviews = await Review.aggregate([
      //get reviews by kombucha id and greater than 1 likes
      { $match: { product: id, like_count: { $gt: 1 } } },

      //sort top_review by highest number of likes and
      //by highest number of review comment characters (need to add in)
      {
        $sort: { like_count: -1 },
      },
      {
        $limit: 1,
      },

      {
        $lookup: {
          from: "users",
          as: "review_by",
          let: {
            user_id: "$user", //from Review.user (review creator)
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  //match each review with associated user
                  $eq: ["$_id", "$$user_id"],
                },
              },
            },
            //$project has to be inside pipeline []
            //get only required fields in User collection to render review list
            {
              $project: {
                review_total: 1,
                avatar: 1,
                username: 1,
                city: 1,
                country: 1,
                //add in city and country, username?
              },
            },
          ],
        },
      },

      {
        $unwind: "$review_by",
      },
    ]);

    return res.json(kombuchaReviews);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

export default handler;

//need total rating count for brewery - add all review_count for each kombucha
//total number likes for brewery
