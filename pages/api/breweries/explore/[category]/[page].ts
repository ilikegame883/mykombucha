import type { NextApiRequest, NextApiResponse } from "next";

import connectDB from "../../../../../src/lib/connectDB";
import Brewery from "../../../../../src/models/breweryModel";

// Similar to 'limit' (# of items per page)
const PAGE_SIZE = 8;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();

  if (req.method !== "GET") {
    return;
  }
  //Switch case used to create dynamic handler
  //hander function will be chosen by req.query category type, e.g., category = "new" will run getNewKombucha list
  switch (req.query.category) {
    case "popular":
      await getPopularBreweries(req, res);
      break;
    case "list":
      await getRecentBreweries(req, res);
      break;
  }
};

//1. Get list of breweries by highest to lowest number of favorites given
//2. Match breweries that has an favorite count > 0
//3. Fetch results based on page number passed in from req.query
const getPopularBreweries = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { page } = req.query;
  // skip = # of items to skip over to display the next set of fetched items for upcoming pages
  //e.g, Page 1 = Skip 0 items, show first 8 items (from PAGE_SIZE) per page
  //e.g. Page 2 = Skip 8 items, and display next set of items after skipping 8 items from page 1
  const skip = (+page - 1) * PAGE_SIZE;
  try {
    const popularBreweryList = await Brewery.aggregate([
      { $match: { favorite_count: { $gt: 0 } } },
      {
        $facet: {
          sorted_list: [
            { $sort: { favorite_count: -1 } },
            { $skip: skip },
            { $limit: PAGE_SIZE },
          ],
          total_breweries: [{ $count: "count" }],
        },
      },

      { $unwind: "$total_breweries" },
    ]);

    res.json(popularBreweryList);
  } catch (error) {
    let msg: string;
    if (error instanceof Error) msg = error.message;
    else msg = String(error);
    return res.status(500).json({ err: msg });
  }
};

//1. Get list of Brewery and sort by most recent
//2. Populate Brewery date with each review
//3. Fetch results based on page number passed in from req.query
const getRecentBreweries = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { page } = req.query;
  const skip = (+page - 1) * PAGE_SIZE; // For page 1, the skip is: (1 - 1) * 20 => 0 * 20 = 0
  //e.g, Page 1 = Skip 0 (from skip) items, limit to 2 (from PAGE_SIZE) items per page
  try {
    const recentBreweries = await Brewery.aggregate([
      {
        $facet: {
          sorted_list: [
            { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: PAGE_SIZE },
          ],
          total_breweries: [{ $count: "count" }],
        },
      },
      { $unwind: "$total_breweries" },
    ]);
    res.json(recentBreweries);
  } catch (error) {
    let msg: string;
    if (error instanceof Error) msg = error.message;
    else msg = String(error);
    return res.status(500).json({ err: msg });
  }
};

export default handler;
