import connectDB from "../../../../src/lib/connectDB";
import Brewery from "../../../../src/models/breweryModel";

const HERO_SEARCH_BAR_LIMIT = 5; //Number of results to show in the search bar

const handler = async (req, res) => {
  await connectDB();

  if (req.method !== "GET") {
    return;
  }
  const { str, limit } = req.query; //limit is the number of results to show on pages/search/[category]

  const limitNumber = Number(limit) ? +limit : HERO_SEARCH_BAR_LIMIT;

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
                //Indicates that only one character variation is allowed in the query string to match the query to a word in the documents.
                maxEdits: 1,
                //Indicates that the first character in the query string can't change when matching the query to a word in the documents.
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
