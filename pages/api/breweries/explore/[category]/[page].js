import connectDB from "../../../../../src/lib/connectDB";
import Kombucha from "../../../../../src/models/kombuchaModel";
import Brewery from "../../../../../src/models/breweryModel";

connectDB();

// Similar to 'limit' (# of items per page - page size)
const PAGE_SIZE = 5;

const handler = async (req, res) => {
  console.log(req.query);
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

//1. Get list of breweries by highest to lowest number of ratings
//2. Match breweries that has an rating count > 0
//3. Paginate result based on page number from req.query.page
const getPopularBreweries = async (req, res) => {
  const { page } = req.query;
  const skip = (page - 1) * PAGE_SIZE; // For page 1, the skip is: (1 - 1) * 20 => 0 * 20 = 0
  //e.g, Page 1 = Skip 0 (from skip) items, limit to 2 (from PAGE_SIZE) items per page
  try {
    const popularBreweryList = await Brewery.aggregate([
      { $match: { favorite_count: { $gt: 0 } } },
      {
        $facet: {
          sorted_list: [
            { $sort: { avg: -1 } },
            { $skip: skip },
            { $limit: PAGE_SIZE },
            { $addFields: { insertTime: { $toDate: "$_id" } } },
          ],
          total: [{ $count: "count" }],
        },
      },

      { $unwind: "$total" },
    ]);

    // res.status(200).json(topRatedKombuchaList) or is it
    res.json(popularBreweryList);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

//1. Get list of Brewery and sort by most recent
//2. Populate Brewery date with each review
//3. Paginate result based on page number from req.query.page
const getRecentBreweries = async (req, res) => {
  const { page } = req.query;
  const skip = (page - 1) * PAGE_SIZE; // For page 1, the skip is: (1 - 1) * 20 => 0 * 20 = 0
  //e.g, Page 1 = Skip 0 (from skip) items, limit to 2 (from PAGE_SIZE) items per page
  try {
    const recentBreweries = await Brewery.aggregate([
      {
        $facet: {
          sorted_list: [
            { $sort: { _id: -1 } },
            { $skip: skip },
            { $limit: PAGE_SIZE },
            { $addFields: { insertTime: { $toDate: "$_id" } } },
          ],
          total: [{ $count: "count" }],
        },
      },
      { $unwind: "$total" },
    ]);

    // res.status(200).json(topRatedKombuchaList) or is it
    res.json(recentBreweries);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

export default handler;
