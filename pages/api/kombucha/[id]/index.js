import Kombucha from "../../../../src/models/kombuchaModel";
import connectDB from "../../../../src/lib/connectDB";
import mongoose from "mongoose";

connectDB();

const handler = async (req, res) => {
  switch (req.method) {
    case "GET":
      await getSingleKombucha(req, res);
      break;
    // case "PATCH":
    //   await updateKombucha(req, res);
    //   break;
  }
};

//getKombuchaProfileData
const getSingleKombucha = async (req, res) => {
  if (req.method !== "GET") {
    return;
  }
  try {
    let id = mongoose.Types.ObjectId(req.query.id);

    const kombuchaData = await Kombucha.aggregate([
      //get kombucha by id
      {
        $match: { _id: id },
      },

      //singeKombucha data only has _id of brewery
      //need actual name of brewery to use in KombuchaProfile.js
      //lookup brewery id inside brewery collection
      //retrieve brewery data
      {
        $lookup: {
          from: "breweries",
          as: "brewery_slug",
          localField: "brewery",
          foreignField: "_id",
        },
      },
      //replace brewery data with only brewery slug, rest not needed for kombucha page
      {
        $addFields: {
          brewery_slug: "$brewery_slug.slug", //from look up as:
        },
      },
      // remove array from brewery_slug
      { $unwind: "$brewery_slug" },
    ]);
    if (!kombuchaData) {
      return res.status(400).json({ err: "This product does not exist." });
    }

    res.json(kombuchaData);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: err.message });
  }
};

export default handler;
