import type { NextApiRequest, NextApiResponse } from "next";

import connectDB from "../../../../src/lib/connectDB";
import Kombucha from "../../../../src/models/kombuchaModel";

const HERO_SEARCH_BAR_LIMIT = 5; //Number of results to show in the search bar

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();

  if (req.method !== "GET") {
    return;
  }
  const { str, limit } = req.query; //limit is the number of results to show on pages/search/[category]

  const limitNumber = Number(limit) ? +limit : HERO_SEARCH_BAR_LIMIT;

  try {
    if (str !== "") {
      const searchKombuchaData = await Kombucha.aggregate([
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
          $limit: limitNumber,
        },
      ]);

      if (!searchKombuchaData) {
        return res.status(400).json({ err: "This item does not exist." });
      }
      return res.json(searchKombuchaData);
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export default handler;
