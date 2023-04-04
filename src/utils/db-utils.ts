import Brewery from "../models/breweryModel";
import Kombucha from "../models/kombuchaModel";

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
