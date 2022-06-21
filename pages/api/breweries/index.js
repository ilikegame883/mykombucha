import Brewery from "../../../src/models/breweryModel";
import connectDB from "../../../src/lib/connectDB";

connectDB();

//handler logic for Discover Breweries section on homepage
//limit results to 8
//revise operation in future to fetch breweries documents based on popularity (number of hearts given)

const handler = async (req, res) => {
  if (req.method !== "GET") {
    return;
  }
  try {
    const breweries = await Brewery.find().limit(8);
    res.status(200).json(breweries);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

export default handler;
