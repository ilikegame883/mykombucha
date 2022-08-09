import Review from "../../../../src/models/reviewModel";
import connectDB from "../../../../src/lib/connectDB";

const handler = async (req, res) => {
  await connectDB();

  switch (req.method) {
    case "GET":
      await getTopUsers(req, res);
      break;
  }
};

const getTopUsers = async (req, res) => {
  try {
    const { slug } = req.query;
    //get top 3 raters for brewery
    //find users with the most kombucha reviews coming from the same brewery
    const topRaters = await Review.aggregate([
      //search reviews by brewery slug
      {
        $match: {
          brewery_slug: slug,
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
            //get only the required fields in User collection for top users
            {
              $project: {
                avatar: 1,
                username: 1,
              },
            },
          ],
        },
      },
      //sort by highest review to lowest
      { $sort: { total_reviews: -1 } },
      { $limit: 3 },
      { $unwind: "$user" },
    ]);
    return res.json(topRaters);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: err.message });
  }
};

export default handler;
