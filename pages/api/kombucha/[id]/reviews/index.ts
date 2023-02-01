import type { NextApiRequest, NextApiResponse } from "next";

import Review from "../../../../../src/models/reviewModel";
import Kombucha from "../../../../../src/models/kombuchaModel";
import User from "../../../../../src/models/userModel";
import connectDB from "../../../../../src/lib/connectDB";
import { getServerSession } from "../../../../../src/utils/getServerSession";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();

  switch (req.method) {
    case "GET":
      await getKombuchaReviews(req, res);
      break;
    case "POST":
      await postKombuchaReview(req, res);
      break;
  }
};

const getKombuchaReviews = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const kombuchaReviews = await Review.find({
      "kombucha.data": req.query.id,
    }).populate({
      path: "review_author.data",
      model: User,
    });

    return res.json(kombuchaReviews);
  } catch (error) {
    let msg: string;
    if (error instanceof Error) msg = error.message;
    else msg = String(error);
    return res.status(500).json({ err: msg });
  }
};

const postKombuchaReview = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  //protect API route
  if (!getServerSession(req, res)) {
    res.status(401).json({ msg: "Not authenticated!" });
    return;
  }

  try {
    const { rating, comment, served_in, review_author, kombucha } = req.body;

    const newReview = new Review({
      rating,
      comment,
      served_in,
      review_author,
      kombucha,
    });
    await newReview.save();

    await User.updateOne({ _id: review_author.data }, [
      {
        $set: {
          review_total: {
            $cond: [
              { $not: ["$review_total"] }, //check if field exists
              1, //set to 1 if it doesn't
              { $add: ["$review_total", 1] },
            ],
          },
        },
      },
    ]);
    //TODO: Refactor avg code
    //1. find kombucha by id and update review count and get sum of ratings
    //2. create a new $set stage to update kombucha's average rating
    await Kombucha.updateOne({ _id: kombucha.data }, [
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
          rating_avg: { $divide: ["$rating_sum", "$review_count"] },
        },
      },
    ]);

    res.json({ msg: "Review Added Successfully!" });
  } catch (error) {
    let msg: string;
    if (error instanceof Error) msg = error.message;
    else msg = String(error);
    return res.status(500).json({ err: msg });
  }
};

export default handler;
