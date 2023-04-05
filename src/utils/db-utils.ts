import Brewery from "../models/breweryModel";
import Kombucha from "../models/kombuchaModel";
import Review from "../models/reviewModel";
import {
  EXPLORE_KOMBUCHA_PAGE_SIZE,
  EXPLORE_BREWERY_PAGE_SIZE,
} from "./consts";

//----------Home page - Explore and Discover Sections----------
export const getHomeSectionData = async () => {
  try {
    const exploreSectionData = await Brewery.find().sort({ _id: -1 }).limit(6);
    const topRatedKombucha = await Kombucha.find()
      .sort({ rating_avg: -1 })
      .limit(5)
      .populate("brewery");
    return { exploreSectionData, topRatedKombucha };
  } catch (error) {
    console.error("Error fetching getHomeSectionData:", error);
    return { exploreSectionData: [], topRatedKombucha: [] };
  }
};

//----------pages/kombucha/[id]----------
//----------pages/kombucha/[id]/corrections----------
export const getKombuchaById = async (id: string) => {
  try {
    const singleKombuchaData = await Kombucha.findById({
      _id: id,
    }).populate({ path: "reviews", model: Review });

    return singleKombuchaData;
  } catch (error) {
    console.error("Error fetching getKombuchaById:", error);
    return {};
  }
};

//----------pages/breweries/[slug]----------
//----------pages/breweries/[slug]/corrections----------
export const getBreweryBySlug = async (slug: string) => {
  try {
    const singleBreweryData = await Brewery.aggregate([
      {
        $match: { slug },
      },
      {
        $lookup: {
          from: "kombuchas",
          as: "kombuchas",
          localField: "_id",
          foreignField: "brewery",
        },
      },
      {
        $lookup: {
          from: "reviews",
          as: "reviews",
          localField: "name",
          foreignField: "brewery",
        },
      },
      {
        $addFields: {
          total_products: { $size: "$kombuchas" },
          kombucha_avg: { $round: [{ $avg: "$reviews.rating" }, 2] },
        },
      },
    ]);

    if (!singleBreweryData) {
      throw new Error("This brewery does not exist.");
    }
    return singleBreweryData;
  } catch (error) {
    console.error("Error fetching getBreweryBySlug:", error);
    return {};
  }
};

//----------pages/breweries/[slug]----------
export const getTopUsersByBrewery = async (slug: string) => {
  try {
    //find top 3 users with the most kombucha reviews coming from the same brewery
    const topUsersRes = await Review.aggregate([
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
    return topUsersRes;
  } catch (error) {
    console.error("Error fetching top users for brewery:", error);
    return [];
  }
};

//----------pages/breweries/explore/[category]/[page]----------
export const getPopularBreweries = async (page: string) => {
  //1. Get list of breweries by highest to lowest number of favorites given
  //2. Match breweries that has an favorite count > 0
  //3. Fetch results based on page number passed in from req.query

  // skip = # of items to skip over to display the next set of fetched items for upcoming pages
  //e.g, Page 1 = Skip 0 items, show first 8 items (from EXPLORE_BREWERY_PAGE_SIZE) per page
  //e.g. Page 2 = Skip 8 items, and display next set of items after skipping 8 items from page 1
  const skip = (+page - 1) * EXPLORE_BREWERY_PAGE_SIZE;
  try {
    const popularBreweryList = await Brewery.aggregate([
      { $match: { favorite_count: { $gt: 0 } } },
      {
        $facet: {
          sorted_list: [
            { $sort: { favorite_count: -1 } },
            { $skip: skip },
            { $limit: EXPLORE_BREWERY_PAGE_SIZE },
          ],
          total_breweries: [{ $count: "count" }],
        },
      },

      { $unwind: "$total_breweries" },
    ]);

    return popularBreweryList;
  } catch (error) {
    console.error("Error fetching getPopularBreweries:", error);
    return [];
  }
};

//----------pages/breweries/explore/[category]/[page]----------
export const getRecentBreweries = async (page: string) => {
  //1. Get list of Brewery and sort by most recent
  //2. Populate Brewery date with each review
  //3. Fetch results based on page number passed in from req.query
  const skip = (+page - 1) * EXPLORE_BREWERY_PAGE_SIZE; // For page 1, the skip is: (1 - 1) * 20 => 0 * 20 = 0
  try {
    const recentBreweries = await Brewery.aggregate([
      {
        $facet: {
          sorted_list: [
            { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: EXPLORE_BREWERY_PAGE_SIZE },
          ],
          total_breweries: [{ $count: "count" }],
        },
      },
      { $unwind: "$total_breweries" },
    ]);
    return recentBreweries;
  } catch (error) {
    console.error("Error fetching getRecentBreweries:", error);
    return [];
  }
};

//----------pages/kombucha/explore/[category]/[page]----------
export const getRecentKombuchaReviews = async (page: string) => {
  //1. Get list of kombucha reviews and sort by most recent
  //2. Return kombucha review date with each review
  //3. Fetch results based on page number passed in from req.query
  const skip = (+page - 1) * EXPLORE_KOMBUCHA_PAGE_SIZE;
  try {
    const recentKombuchaReviews = await Review.aggregate([
      {
        $facet: {
          sorted_list: [
            { $sort: { _id: -1 } },
            { $skip: skip },
            { $limit: EXPLORE_KOMBUCHA_PAGE_SIZE },
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
    return recentKombuchaReviews;
  } catch (error) {
    console.error("Error fetching getRecentKombuchaReviews:", error);
    return [];
  }
};

//----------pages/kombucha/explore/[category]/[page]----------
export const getNewKombucha = async (page: string) => {
  //1. Get list of kombucha by date created for now
  //2. MongoDB ObjectId contain a timestamp, you can sort by 'created date' if you sort by objectId
  //3. Fetch results based on page number passed in from req.query
  const skip = (+page - 1) * EXPLORE_KOMBUCHA_PAGE_SIZE;
  try {
    const newKombuchaList = await Kombucha.aggregate([
      {
        $facet: {
          sorted_list: [
            { $sort: { _id: -1 } },
            { $skip: skip },
            { $limit: EXPLORE_KOMBUCHA_PAGE_SIZE },
          ],
          total_kombucha: [{ $count: "count" }],
        },
      },
      { $unwind: "$total_kombucha" },
    ]);
    return newKombuchaList;
  } catch (error) {
    console.error("Error fetching getNewKombucha:", error);
    return [];
  }
};

//----------pages/kombucha/explore/[category]/[page]----------
export const getTopAvgRatedKombucha = async (page: string) => {
  //1. Get list of kombucha by highest to lowest avg ratings
  //2. Match all kombuchas that has an avg rating >= 3.50 (no rating = 0 avg)
  //3. Fetch results based on page number passed in from req.query
  const skip = (+page - 1) * EXPLORE_KOMBUCHA_PAGE_SIZE;
  try {
    const topAvgRatedKombuchaList = await Kombucha.aggregate([
      { $match: { rating_avg: { $gt: 3.75 }, review_count: { $gt: 0 } } },
      {
        $facet: {
          sorted_list: [
            { $sort: { rating_avg: -1 } },
            { $skip: skip },
            { $limit: EXPLORE_KOMBUCHA_PAGE_SIZE },
          ],
          total_kombucha: [{ $count: "count" }],
        },
      },

      { $unwind: "$total_kombucha" },
    ]);

    return topAvgRatedKombuchaList;
  } catch (error) {
    console.error("Error fetching topAvgRatedKombuchaList:", error);
    return [];
  }
};

//----------pages/kombucha/explore/[category]/[page]----------
export const getPopularKombucha = async (page: string) => {
  //1. Get list of kombucha by highest to lowest number of ratings
  //2. Match all kombuchas that has an rating count > 0
  //3. Fetch results based on page number passed in from req.query
  const skip = (+page - 1) * EXPLORE_KOMBUCHA_PAGE_SIZE;
  try {
    const popularKombuchaList = await Kombucha.aggregate([
      { $match: { review_count: { $gt: 0 } } },
      {
        $facet: {
          sorted_list: [
            { $sort: { review_count: -1 } },
            { $skip: skip },
            { $limit: EXPLORE_KOMBUCHA_PAGE_SIZE },
          ],
          total_kombucha: [{ $count: "count" }],
        },
      },

      { $unwind: "$total_kombucha" },
    ]);

    return popularKombuchaList;
  } catch (error) {
    console.error("Error fetching getPopularKombucha:", error);
    return [];
  }
};
