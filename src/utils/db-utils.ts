import Brewery from "../models/breweryModel";
import Kombucha from "../models/kombuchaModel";

//Home page - Explore Breweries Section
export const getExploreBreweries = async () => {
  //TODO: fetch breweries documents based on popularity (number of hearts given) when more data is available
  // lean converts mongoose.Document to Plain Javascript Object
  const breweryResult = await Brewery.find().sort({ _id: -1 }).limit(6).lean();

  //TODO: Update this with updated brewery fields
  const breweryData = breweryResult.map((doc) => {
    doc._id = doc._id.toString();
    doc.updatedAt = doc.updatedAt.toString();
    doc.createdAt = doc.createdAt.toString();
    doc.favorite_list = doc.favorite_list.toString();
    return doc;
  });
  return breweryData;
};

//Home page - Discover Kombucha Section
export const getTopRatedKombucha = async () => {
  //return top rated kombuchas by rating avg, limit to 5
  //set review_count 0 for now since not enough reviews
  const kombuchaRes = await Kombucha.find()
    .sort({ rating_avg: -1 })
    .limit(5)
    .lean();

  //TODO: Update this with updated kombucha fields
  const kombuchaData = kombuchaRes.map((doc) => {
    doc._id = doc._id.toString();
    doc.updatedAt = doc.updatedAt.toString();
    doc.createdAt = doc.createdAt.toString();
    doc.company.brewery_id = doc.company.brewery_id.toString();
    doc.brewery = doc.brewery.toString();
    doc.reviews = doc.reviews.map((review) => review.toString());
    return doc;
  });

  return kombuchaData;
};
