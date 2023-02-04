import type { NextApiRequest, NextApiResponse } from "next";

import connectDB from "../../../../../src/lib/connectDB";
import Kombucha from "../../../../../src/models/kombuchaModel";
import Review from "../../../../../src/models/reviewModel";
import User from "../../../../../src/models/userModel";

// Similar to 'limit' (# of items per page)
const PAGE_SIZE = 8;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();

  if (req.method !== "GET") {
    return;
  }

  //Switch case used to create dynamic handler
  //hander function will be chosen by req.query.category
  //(e.g., /kombucha/explore/new/[page]) will run getNewKombucha list
  switch (req.query.category) {
    case "recent":
      await getRecentKombuchaReviews(req, res);
      break;
    case "new":
      await getNewKombucha(req, res);
      break;
    case "top-rated":
      await getTopRatedKombucha(req, res);
      break;
    case "popular":
      await getPopularKombucha(req, res);
      break;
  }
};

//1. Get list of kombucha reviews and sort by most recent
//2. Return kombucha review date with each review
//3. Fetch results based on page number passed in from req.query
const getRecentKombuchaReviews = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { page } = req.query;

  // skip = # of items to skip over to display the next set of fetched items for upcoming pages
  //e.g, Page 1 = Skip 0 items, show first 8 items (from PAGE_SIZE) per page
  //e.g. Page 2 = Skip 8 items, and display next set of items after skipping 8 items from page 1
  const skip = (+page - 1) * PAGE_SIZE;
  try {
    const recentKombuchaReviews = await Review.aggregate([
      {
        $facet: {
          sorted_list: [
            { $sort: { _id: -1 } },
            { $skip: skip },
            { $limit: PAGE_SIZE },
            {
              $lookup: {
                from: "kombuchas",
                localField: "kombucha.data", //kombucha.data = kombucha_id saved in each review
                foreignField: "_id", //_id = kombucha _id: in kombucha collection
                as: "kombucha",
              },
            },
            {
              $lookup: {
                from: "users",
                localField: "review_author.data",
                foreignField: "_id", //_id = user _id: in user collection
                as: "review_author",
                pipeline: [{ $project: { "profile.image": 1, username: 1 } }],
              },
            },
            {
              $unwind: {
                path: "$review_author",
              },
            },
            { $unwind: "$kombucha" },
          ],
          total_kombucha: [{ $count: "count" }], //used for pagination
        },
      },
      { $unwind: "$total_kombucha" },
    ]);
    res.json(recentKombuchaReviews);
  } catch (error) {
    let msg: string;
    if (error instanceof Error) msg = error.message;
    else msg = String(error);
    return res.status(500).json({ err: msg });
  }
};

//1. Get list of kombucha by date created for now
//2. MongoDB ObjectId contain a timestamp, you can sort by 'created date' if you sort by objectId
//3. Fetch results based on page number passed in from req.query
const getNewKombucha = async (req: NextApiRequest, res: NextApiResponse) => {
  const { page } = req.query;
  const skip = (+page - 1) * PAGE_SIZE;
  try {
    const newKombuchaList = await Kombucha.aggregate([
      {
        $facet: {
          sorted_list: [
            { $sort: { _id: -1 } },
            { $skip: skip },
            { $limit: PAGE_SIZE },
          ],
          total_kombucha: [{ $count: "count" }],
        },
      },
      { $unwind: "$total_kombucha" },
    ]);
    res.json(newKombuchaList);
  } catch (error) {
    let msg: string;
    if (error instanceof Error) msg = error.message;
    else msg = String(error);
    return res.status(500).json({ err: msg });
  }
};

//1. Get list of kombucha by highest to lowest avg ratings
//2. Match all kombuchas that has an avg rating >= 3.50 (no rating = 0 avg)
//3. Fetch results based on page number passed in from req.query
const getTopRatedKombucha = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { page } = req.query;
  const skip = (+page - 1) * PAGE_SIZE;
  try {
    const topRatedKombuchaList = await Kombucha.aggregate([
      { $match: { rating_avg: { $gt: 3.75 }, review_count: { $gt: 0 } } },
      {
        $facet: {
          sorted_list: [
            { $sort: { rating_avg: -1 } },
            { $skip: skip },
            { $limit: PAGE_SIZE },
          ],
          total_kombucha: [{ $count: "count" }],
        },
      },

      { $unwind: "$total_kombucha" },
    ]);

    res.json(topRatedKombuchaList);
  } catch (error) {
    let msg: string;
    if (error instanceof Error) msg = error.message;
    else msg = String(error);
    return res.status(500).json({ err: msg });
  }
};

//1. Get list of kombucha by highest to lowest number of ratings
//2. Match all kombuchas that has an rating count > 0
//3. Fetch results based on page number passed in from req.query
const getPopularKombucha = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { page } = req.query;
  const skip = (+page - 1) * PAGE_SIZE;
  try {
    const popularKombuchaList = await Kombucha.aggregate([
      { $match: { review_count: { $gt: 0 } } },
      {
        $facet: {
          sorted_list: [
            { $sort: { review_count: -1 } },
            { $skip: skip },
            { $limit: PAGE_SIZE },
          ],
          total_kombucha: [{ $count: "count" }],
        },
      },

      { $unwind: "$total_kombucha" },
    ]);

    res.json(popularKombuchaList);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

export default handler;
