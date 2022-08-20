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
    let kombucha_id = mongoose.Types.ObjectId(req.query.id);

    const kombuchaReviews = await Review.aggregate([
      { $match: { product: kombucha_id } },
      //sort reviews by newest to oldest
      { $sort: { createdAt: -1 } },
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
                  //match the user_id stored in review item from with _id from users collection to get user data
                  $eq: ["$_id", "$$user_id"],
                },
              },
            },
            //$project has to be inside pipeline []
            //get only required fields in users collection required for review list
            {
              $project: {
                review_total: 1,
                username: 1,
                avatar: 1,
                city: 1,
                country: 1,
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
