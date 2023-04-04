import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../../src/lib/connectDB";
import Kombucha from "../../../../src/models/kombuchaModel";
import Brewery from "../../../../src/models/breweryModel";

const HERO_SEARCH_BAR_LIMIT = 5; //Number of results to show in the search bar

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return;
  }

  await connectDB();

  const { str } = req.query;

  try {
    const [searchKombuchaData, searchBreweryData] = await Promise.all([
      Kombucha.aggregate([
        {
          $search: {
            index: "kombucha",
            autocomplete: {
              query: str,
              path: "name",
              fuzzy: {
                maxEdits: 1,
                prefixLength: 1,
              },
              tokenOrder: "any",
            },
          },
        },
        {
          $limit: HERO_SEARCH_BAR_LIMIT,
        },
      ]),
      Brewery.aggregate([
        {
          $search: {
            index: "brewery",
            autocomplete: {
              query: str,
              path: "name",
              fuzzy: {
                maxEdits: 1,
                prefixLength: 1,
              },
              tokenOrder: "any",
            },
          },
        },
        {
          $limit: HERO_SEARCH_BAR_LIMIT,
        },
      ]),
    ]);

    if (!searchKombuchaData.length && !searchBreweryData.length) {
      return res.status(404).json({ error: "No matching items found" });
    }

    return res.json({
      kombucha: searchKombuchaData,
      brewery: searchBreweryData,
    });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

export default handler;
