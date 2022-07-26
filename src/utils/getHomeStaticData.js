import Brewery from "../models/breweryModel";
import Kombucha from "../models/kombuchaModel";

//helper function to get data required for Discover and Explore section on homepage
const getHomeStaticData = async () => {
  //when more user data is avaiable, fetch breweries documents based on popularity (number of hearts given)
  // lean converts mongoose.Document to Plain Javascript Object
  const breweryResult = await Brewery.find().limit(6).lean();

  const breweryList = breweryResult.map((doc) => {
    doc._id = doc._id.toString();
    doc.updatedAt = doc.updatedAt.toString();
    doc.favorite_list = doc.favorite_list.toString();
    return doc;
  });
  const kombuchaResult = await Kombucha.aggregate([
    //search kombucha with user reviews greater than 1
    //set to 0 for now since not enough ratings
    { $match: { review_count: { $gt: 0 } } },

    {
      $lookup: {
        from: "breweries",
        localField: "brewery_name",
        foreignField: "name",
        as: "brewery",
      },
    },
    //sort by highest ratings to lowest
    { $sort: { avg: -1 } },
    { $limit: 4 },
    { $unwind: "$brewery" },
  ]);
  const kombuchaList = kombuchaResult.map((doc) => {
    doc._id = doc._id.toString();
    doc.updatedAt = doc.updatedAt.toString();
    doc.brewery._id = doc.brewery._id.toString();
    doc.brewery.updatedAt = doc.brewery.updatedAt.toString();
    doc.brewery.favorite_list = doc.brewery.favorite_list.toString();
    return doc;
  });

  return { breweryList, kombuchaList };
};
export default getHomeStaticData;
