import connectDB from "../../../../src/lib/connectDB";
import Brewery from "../../../../src/models/breweryModel";

const DEFAULT_LIMIT_VALUE = 5;

const handler = async (req, res) => {
  await connectDB();

  if (req.method !== "GET") {
    return;
  }
  const { str, limit } = req.query;

  const limitNumber = Number(limit) ? +limit : DEFAULT_LIMIT_VALUE;

  try {
    if (str) {
      const searchBreweryData = await Brewery.aggregate([
        {
          $search: {
            index: "brewery",
            autocomplete: {
              query: str,
              path: "name",
              fuzzy: {
                //maxEdits field represents how many consecutive characters must match
                maxEdits: 1,
                //prefixLength indicates the number of characters at the beginning of each term in the result that must match exactly
                prefixLength: 1,
              },
              tokenOrder: "any",
            },
          },
        },
        {
          $limit: limitNumber,
        },
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
