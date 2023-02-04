import type { NextApiRequest, NextApiResponse } from "next";

import connectDB from "../../../../../../src/lib/connectDB";
import Kombucha from "../../../../../../src/models/kombuchaModel";
import Review from "../../../../../../src/models/reviewModel";
import User from "../../../../../../src/models/userModel";
import { getServerSession } from "../../../../../../src/utils/getServerSession";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  //protect API route
  if (!getServerSession(req, res)) {
    res.status(401).json({ msg: "Not authenticated!" });
    return;
  }
  await connectDB();

  //TODO: add logic for updating user_reviews (comments, rating, etc...) - PATCH
  switch (req.method) {
    case "DELETE":
      await deleteReview(req, res);
      break;
  }
};

const deleteReview = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, review_id } = req.query;
  const { review_author, user_rating } = req.body;
  try {
    await Review.deleteOne({ _id: review_id });

    //find user by id, remove 1 from user review_total
    await User.updateOne({ _id: review_author.data }, [
      {
        $set: {
          review_total: {
            $subtract: ["$review_total", 1],
          },
        },
      },
    ]);

    await Kombucha.updateOne({ _id: id }, [
      {
        $set: {
          review_count: {
            $subtract: ["$review_count", 1],
          },
          rating_sum: {
            $subtract: ["$rating_sum", user_rating],
          },
        },
      },
      {
        $set: {
          rating_avg: {
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
  } catch (error) {
    let msg: string;
    if (error instanceof Error) msg = error.message;
    else msg = String(error);
    return res.status(500).json({ err: msg });
  }
};

export default handler;
