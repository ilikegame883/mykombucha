import type { NextApiRequest, NextApiResponse } from "next";
import Brewery from "../../../../src/models/breweryModel";
import connectDB from "../../../../src/lib/connectDB";

//handler logic for returning brewery data by slug
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();

  switch (req.method) {
    case "GET":
      await getBreweryData(req, res);
      break;
  }
};
const getBreweryData = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { slug } = req.query;
    //need to change to get brewery data, average, # of people favorite count, # of kombuchas
    // const brewery = await Brewery.findOne({ name }).populate("products");
    const breweryData = await Brewery.aggregate([
      {
        $match: { slug },
      },
      //lookup brewery id in kombucha collection
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
          kombucha_avg: { $round: [{ $avg: "$reviews.rating" }, 2] },
        },
      },
    ]);
    if (!breweryData)
      return res.status(400).json({ err: "This brewery does not exist." });
    res.json(breweryData);
  } catch (error) {
    let msg: string;
    if (error instanceof Error) msg = error.message;
    else msg = String(error);
    return res.status(500).json({ err: msg });
  }
};

export default handler;
