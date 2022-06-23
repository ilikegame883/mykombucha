import Review from "../../../../../src/models/reviewModel";
import connectDB from "../../../../../src/lib/connectDB";
import mongoose from "mongoose";

//get Kombucha user reviews
//KombuchaReviews.js
const handler = async (req, res) => {
  await connectDB();

  if (req.method !== "GET") {
    return;
  }
  try {
    let id = mongoose.Types.ObjectId(req.query.id);

    const kombuchaReviews = await Review.aggregate([
      { $match: { product: id } },

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
            //get only required fields in User collection required for review list
            {
              $project: {
                review_total: 1,
                avatar: 1,
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
