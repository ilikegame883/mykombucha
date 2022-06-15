import Brewery from "../../../src/models/breweryModel";
import connectDB from "../../../src/lib/connectDB";

connectDB();

//handler logic for returning brewery data
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
