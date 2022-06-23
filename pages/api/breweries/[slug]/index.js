import Brewery from "../../../../src/models/breweryModel";
import connectDB from "../../../../src/lib/connectDB";

//handler logic for returning brewery data by slug
const handler = async (req, res) => {
  await connectDB();

  if (req.method !== "GET") {
    return;
  }
  try {
    const { slug } = req.query;
    //need to change to get brewery data, average, # of people favorite count, # of kombuchas
    // const brewery = await Brewery.findOne({ name }).populate("products");
    const breweryData = await Brewery.aggregate([
      //get brewery by query name
      {
        $match: { slug },
      },

      //lookup brewery id inside kombucha collection
      //retrieve matched kombucha items
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
          avg: { $round: [{ $avg: "$reviews.rating" }, 2] },
        },
      },
      //remove array from breweryName
      //   { $unwind: "$kombuchas" },
    ]);
    if (!breweryData)
      return res.status(400).json({ err: "This brewery does not exist." });
    res.json(breweryData);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

export default handler;
