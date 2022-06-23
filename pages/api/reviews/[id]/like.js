import Review from "../../../../src/models/reviewModel";
import connectDB from "../../../../src/lib/connectDB";
import mongoose from "mongoose";

const handler = async (req, res) => {
  await connectDB();

  switch (req.method) {
    case "PATCH":
      await updateReviewLikes(req, res);
      break;
  }
};

const updateReviewLikes = async (req, res) => {
  try {
    const { id } = req.query;
    const { user } = req.body;

    const reviewId = mongoose.Types.ObjectId(id);
    const userObjectId = mongoose.Types.ObjectId(user);

    await Review.updateOne({ _id: id }, [
      {
        //when user likes a review, add user_id to likes array
        $set: {
          likes: {
            //$cond requires all 3 arguments
            //{ $cond: [ <boolean-expression>, <true-case>, <false-case> ] }
            $cond: [
              {
                //check if userId is in likes array
                //returns boolean
                $in: [userObjectId, "$likes"],
              },
              {
                //$setDifference filters out duplicates
                //results in an array that contain only unique entries.
                $setDifference: ["$likes", [userObjectId]], //true-case
              },
              {
                $concatArrays: ["$likes", [userObjectId]], //false-case
              },
            ],
          },
          like_count: {
            $cond: [
              {
                //check if userId is in likes array
                //returns boolean
                $in: [userObjectId, "$likes"],
              },
              {
                //true-case
                //decrease like_count if user already liked review (user found in likes array)
                $add: ["$like_count", -1],
              },
              {
                //false-case
                //vice versa
                $add: ["$like_count", 1],
              },
            ],
          },
        },
      },
    ]);

    return res.json({ msg: "Update Success!" });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

export default handler;
