import Kombucha from "../../../../src/models/kombuchaModel";

//return kombuchas with highest rating to lowest
//for landing page top kombuchas section
const handler = async (req, res) => {
  if (req.method !== "GET") {
    return;
  }

  try {
    const kombuchaList = await Kombucha.aggregate([
      //search kombucha with review greater than 1
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
    res.json(kombuchaList);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: err.message });
  }
};

export default handler;
