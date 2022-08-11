import connectDB from "../../../../../src/lib/connectDB";
import Kombucha from "../../../../../src/models/kombuchaModel";
import Review from "../../../../../src/models/reviewModel";

// Similar to 'limit' (# of items per page - page size)
const PAGE_SIZE = 8;

const handler = async (req, res) => {
  await connectDB();

  if (req.method !== "GET") {
    return;
  }
  //Switch case used to create dynamic handler
  //hander function will be chosen by req.query.category
  //(e.g., /kombucha/explore/new/[page]) will run getNewKombucha list
  switch (req.query.category) {
    case "new":
      await getNewKombucha(req, res);
      break;
    case "top-rated":
      await getTopRatedKombucha(req, res);
      break;
    case "popular":
      await getPopularKombucha(req, res);
      break;
    case "recent":
      await getRecentKombuchaReviews(req, res);
      break;
  }
};

//1. Get list of kombucha by date created for now
//2. MongoDB ObjectId contain a timestamp, you can sort by 'created date' if you sort by objectId
//3. Paginate result based on page number from req.query
//Note: need to add in start date of production for each kombucha and sort by that field
const getNewKombucha = async (req, res) => {
  const { page } = req.query;
  const skip = (page - 1) * PAGE_SIZE; // For page 1, the skip is: (1 - 1) * 20 => 0 * 20 = 0
  //e.g, Page 1 = Skip 0 (from skip) items, limit to 2 (from PAGE_SIZE) items per page
  try {
    const newKombuchaList = await Kombucha.aggregate([
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
    res.json(newKombuchaList);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

//1. Get list of kombucha by highest to lowest avg ratings
//2. Match all kombuchas that has an avg rating > 0 (no rating = 0 avg)
//3. Paginate result based on page number from req.query.page
const getTopRatedKombucha = async (req, res) => {
  const { page } = req.query;
  const skip = (page - 1) * PAGE_SIZE; // For page 1, the skip is: (1 - 1) * 20 => 0 * 20 = 0
  //e.g, Page 1 = Skip 0 (from skip) items, limit to 2 (from PAGE_SIZE) items per page
  try {
    const topRatedKombuchaList = await Kombucha.aggregate([
      { $match: { avg: { $gt: 0 } } },
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

    res.json(topRatedKombuchaList);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

//1. Get list of kombucha by highest to lowest number of ratings
//2. Match all kombuchas that has an rating count > 0
//3. Paginate result based on page number from req.query.page
const getPopularKombucha = async (req, res) => {
  const { page } = req.query;
  const skip = (page - 1) * PAGE_SIZE; // For page 1, the skip is: (1 - 1) * 20 => 0 * 20 = 0
  //e.g, Page 1 = Skip 0 (from skip) items, limit to 2 (from PAGE_SIZE) items per page
  try {
    const popularKombuchaList = await Kombucha.aggregate([
      { $match: { review_count: { $gt: 0 } } },
      {
        $facet: {
          sorted_list: [
            { $sort: { review_count: -1 } },
            { $skip: skip },
            { $limit: PAGE_SIZE },
            { $addFields: { insertTime: { $toDate: "$_id" } } },
          ],
          total: [{ $count: "count" }],
        },
      },

      { $unwind: "$total" },
    ]);

    res.json(popularKombuchaList);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

//1. Get list of kombucha reviews and sort by most recent
//2. Populate kombucha date with each review
//3. Paginate result based on page number from req.query.page
const getRecentKombuchaReviews = async (req, res) => {
  const { page } = req.query;
  const skip = (page - 1) * PAGE_SIZE; // For page 1, the skip is: (1 - 1) * 20 => 0 * 20 = 0
  //e.g, Page 1 = Skip 0 (from skip) items, limit to 2 (from PAGE_SIZE) items per page
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
                localField: "product", //product = kombucha _id saved in submitted review
                foreignField: "_id", //_id = kombucha _id in kombuchas collection
                as: "kombucha",
              },
            },
            {
              $lookup: {
                from: "users",
                localField: "username",
                foreignField: "username",
                as: "review_user",
                pipeline: [{ $project: { avatar: 1 } }],
              },
            },

            { $unwind: "$kombucha" },
            { $unwind: "$review_user" },

            { $addFields: { insertTime: { $toDate: "$_id" } } },
          ],
          total: [{ $count: "count" }],
        },
      },
      { $unwind: "$total" },
    ]);

    res.json(recentKombuchaReviews);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

export default handler;
