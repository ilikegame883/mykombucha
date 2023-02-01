import type { NextApiRequest, NextApiResponse } from "next";

import connectDB from "../../../../../src/lib/connectDB";
import Review from "../../../../../src/models/reviewModel";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();

  switch (req.method) {
    case "GET":
      await getTopUsers(req, res);
      break;
  }
};

const getTopUsers = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { slug } = req.query;
    //get top 3 raters for brewery
    //find users with the most kombucha reviews coming from the same brewery
    const topRaters = await Review.aggregate([
      //search reviews by brewery slug
      {
        $match: {
          brewery_slug: slug,
        },
      },
      //group by users with reviews for the products belonging to the same brewery
      //get total # of reviews for each user
      {
        $group: {
          _id: "$review_author.data",
          review_total: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "users",
          as: "user",
          let: {
            user_id: "$_id",
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
            //get only the required fields in User collection for top users
            {
              $project: {
                "profile.image": 1,
                username: 1,
              },
            },
          ],
        },
      },
      //sort by highest review to lowest
      //limit to 3 users
      { $sort: { review_total: -1 } },
      { $limit: 3 },
      { $unwind: "$user" },
    ]);
    return res.json(topRaters);
  } catch (error) {
    let msg: string;
    if (error instanceof Error) msg = error.message;
    else msg = String(error);
    return res.status(500).json({ err: msg });
  }
};

export default handler;
