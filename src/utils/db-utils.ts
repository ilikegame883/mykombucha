import { StringExpressionOperator } from "mongoose";
import Brewery from "../models/breweryModel";
import Kombucha from "../models/kombuchaModel";
import Review from "../models/reviewModel";

const formatBreweryData = (doc) => {
  doc._id = doc._id.toString();
  doc.updatedAt = doc.updatedAt.toString();
  doc.createdAt = doc.createdAt.toString();
  doc.favorite_list = doc.favorite_list.toString();
  return doc;
};

const formatKombuchaData = (doc) => {
  doc._id = doc._id.toString();
  doc.updatedAt = doc.updatedAt.toString();
  doc.createdAt = doc.createdAt.toString();
  doc.company.brewery_id = doc.company.brewery_id.toString();
  doc.brewery = doc.brewery.toString();
  doc.reviews = doc.reviews.map((review) => review.toString());
  return doc;
};

//Home page - Explore Breweries Section
export const getExploreBreweries = async () => {
  //TODO: fetch breweries documents based on popularity (number of hearts given) when more data is available
  //lean() converts mongoose.Document to Plain Javascript Object
  try {
    const breweryResult = await Brewery.find()
      .sort({ _id: -1 })
      .limit(6)
      .lean();
    return breweryResult.map(formatBreweryData);
  } catch (error) {
    console.error("Error fetching explore breweries:", error);
    return [];
  }
};

//Home page - Discover Kombucha Section
export const getTopRatedKombucha = async () => {
  //return top rated kombuchas by rating avg, limit to 5
  //set review_count 0 for now since not enough reviews
  try {
    const kombuchaRes = await Kombucha.find()
      .sort({ rating_avg: -1 })
      .limit(5)
      .populate("brewery")
      .lean();

    return kombuchaRes.map(formatKombuchaData);
  } catch (error) {
    console.error("Error fetching top-rated kombucha:", error);
    return [];
  }
};

//Home page - For Search Bar
export const getBreweryAndKombuchaData = async () => {
  try {
    const [breweryRes, kombuchaRes] = await Promise.all([
      Brewery.find().lean(),
      Kombucha.find().lean(),
    ]);
    const breweryData = breweryRes.map((doc) => {
      doc._id = doc._id.toString();
      doc.updatedAt = doc.updatedAt.toString();
      doc.createdAt = doc.createdAt.toString();
      doc.favorite_list = doc.favorite_list.toString();
      return doc;
    });

    const kombuchaData = kombuchaRes.map((doc) => {
      doc._id = doc._id.toString();
      doc.updatedAt = doc.updatedAt.toString();
      doc.createdAt = doc.createdAt.toString();
      doc.company.brewery_id = doc.company.brewery_id.toString();
      doc.brewery = doc.brewery.toString();
      doc.reviews = doc.reviews.map((review) => review.toString());
      return doc;
    });

    return {
      breweries: breweryData,
      kombuchas: kombuchaData,
    };
  } catch (error) {
    console.error("Error fetching brewery and kombucha data:", error);
    return {
      breweries: [],
      kombuchas: [],
    };
  }
};

//pages/kombucha/[id]
export const getKombuchaById = async (id: string) => {
  try {
    const kombuchaRes = await Kombucha.findById({
      _id: id,
    }).populate({ path: "reviews", model: Review });

    return kombuchaRes;
  } catch (error) {
    console.error("Error fetching kombucha by id:", error);
    return [];
  }
};

//pages/breweries/[slug]
export const getBreweryById = async (slug: string) => {
  try {
    const breweryRes = await Brewery.aggregate([
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

    if (!breweryRes) {
      throw new Error("This brewery does not exist.");
    }
    return breweryRes;
  } catch (error) {
    let msg: string;
    if (error instanceof Error) msg = error.message;
    else msg = String(error);

    throw new Error(msg);
  }
};

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
