import type { NextApiRequest, NextApiResponse } from "next";

import connectDB from "../../../../../src/lib/connectDB";
import Kombucha from "../../../../../src/models/kombuchaModel";
import Review from "../../../../../src/models/reviewModel";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();

  switch (req.method) {
    case "GET":
      await getUserReviews(req, res);
      break;
  }
};

const getUserReviews = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id: _id } = req.query;

    const userReviews = await Review.find({
      "review_author.data": _id,
    }).populate({
      //populate nested kombucha field: kombucha.data = ObjectId
      path: "kombucha",
      populate: {
        path: "data",
        model: Kombucha,
      },
    });

    if (!userReviews)
      return res.status(400).json({ err: "Review does not exist." });
    res.json(userReviews);
  } catch (error) {
    let msg: string;
    if (error instanceof Error) msg = error.message;
    else msg = String(error);
    return res.status(500).json({ err: msg });
  }
};
export default handler;

//protect api route
