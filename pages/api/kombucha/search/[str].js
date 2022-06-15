import connectDB from "../../../../src/lib/connectDB";
import Kombucha from "../../../../src/models/kombuchaModel";

connectDB();

const handler = async (req, res) => {
  if (req.method !== "GET") {
    return;
  }
  const { str } = req.query;
  try {
    let searchKombuchaData;
    if (str) {
      searchKombuchaData = await Kombucha.aggregate([
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

      if (!searchKombuchaData) {
        return res.status(400).json({ err: "This item does not exist." });
      }
      return res.json(searchKombuchaData);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: err.message });
  }
};

export default handler;
