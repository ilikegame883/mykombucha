import connectDB from "../../../../src/lib/connectDB";
import Brewery from "../../../../src/models/breweryModel";

connectDB();

const handler = async (req, res) => {
  if (req.method !== "GET") {
    return;
  }
  try {
    const { str } = req.query;
    console.log(str);
    if (str) {
      const searchBreweryData = await Brewery.aggregate([
        {
          $search: {
            index: "brewery",
            autocomplete: {
              query: str,
              path: "name",
              fuzzy: {
                maxEdits: 1,
                // prefixLength: 1,
              },
              tokenOrder: "any",
            },
          },
        },
        {
          $limit: 5,
        },
        // {
        //   $project: {
        //     _id: 1,
        //     name: 1,
        //     brewery_name: 1,
        //     avg: 1,
        //     score: { $meta: "searchScore" },
        //   },
        // },
      ]);
      if (!searchBreweryData) {
        return res.status(400).json({ err: "This item does not exist." });
      }
      return res.json(searchBreweryData);
    }
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

export default handler;
