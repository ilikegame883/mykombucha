import type { NextApiRequest, NextApiResponse } from "next";
import Review from "../../../../src/models/reviewModel";
import connectDB from "../../../../src/lib/connectDB";
import mongoose from "mongoose";
import { getServerSession } from "../../../../src/utils/getServerSession";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  //protect API route
  if (!getServerSession(req, res)) {
    res.status(401).json({ msg: "Not authenticated!" });
    return;
  }
  await connectDB();

  switch (req.method) {
    case "PATCH":
      await updateReviewLikes(req, res);
      break;
  }
};

const updateReviewLikes = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id: _id } = req.query;
    const { user } = req.body; //user_id

    const userObjectId = new mongoose.Types.ObjectId(user as string);

    await Review.updateOne({ _id }, [
      {
        //when user likes a review, add user_id to likes array
        $set: {
          likes: {
            //$cond requires all 3 arguments
            //{ $cond: [ <boolean-expression>, <true-case>, <false-case> ] }
            $cond: [
              {
                //check if user liked review already (userId is in likes array)
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
  } catch (error) {
    let msg: string;
    if (error instanceof Error) msg = error.message;
    else msg = String(error);
    return res.status(500).json({ err: msg });
  }
};

export default handler;
