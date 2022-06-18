import Review from "../../../../src/models/reviewModel";
import connectDB from "../../../../src/lib/connectDB";

connectDB();

const handler = async (req, res) => {
  switch (req.method) {
    case "GET":
      await getTopUsers(req, res);
      break;
    // case "PATCH":
    //   await updateKombucha(req, res);
    //   break;
  }
};

const getTopUsers = async (req, res) => {
  try {
    const { slug } = req.query;

    const newSlugStr = slug.replace(/-/g, "");

    //get top 5 raters for brewery
    //find users with the most reviews for products from the same brewery
    const topRaters = await Review.aggregate([
      //search reviews by brewery name
      {
        $match: {
          brewery: { $regex: `^${newSlugStr}$`, $options: "i" },
        },
      },

      //group by users
      //get total count of reviews by each user
      {
        $group: {
          _id: "$user",
          total_reviews: { $sum: 1 },
        },
      },

      {
        $lookup: {
          from: "users",
          as: "user",
          let: {
            user_id: "$_id",
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  //match each review with associated user
                  $eq: ["$_id", "$$user_id"],
                },
              },
            },
            //$project has to be inside pipeline []
            //get only required fields in User collection required for top users
            {
              $project: {
                avatar: 1,
                username: 1,
                //add in city and country, username?
              },
            },
          ],
        },
      },
      //sort by highest review to lowest
      { $sort: { total_reviews: -1 } },
      { $limit: 5 },
      { $unwind: "$user" },
    ]);
    return res.json(topRaters);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: err.message });
  }
};

export default handler;

//need total rating count for brewery - add all review_count for each kombucha
//total number likes for brewery
