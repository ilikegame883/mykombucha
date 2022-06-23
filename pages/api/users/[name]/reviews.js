import connectDB from "../../../../src/lib/connectDB";
import Kombucha from "../../../../src/models/kombuchaModel";
import Review from "../../../../src/models/reviewModel";

const handler = async (req, res) => {
  await connectDB();

  switch (req.method) {
    case "GET":
      await getUserReviews(req, res);
      break;
    case "DELETE":
      await deleteUserReview(req, res);
      break;
  }
};
const getUserReviews = async (req, res) => {
  try {
    const { name: username } = req.query;

    const userReviews = await Review.aggregate([
      //get reviews by username to populate review table under user profile
      {
        $match: { username },
      },
      {
        $lookup: {
          from: "kombuchas",
          as: "kombucha_info",
          localField: "product",
          foreignField: "_id",
        },
      },
      {
        $unwind: "$kombucha_info",
      },
      {
        $lookup: {
          from: "breweries",
          as: "brewery_slug",
          localField: "brewery",
          foreignField: "name",
        },
      },
      {
        $addFields: {
          brewery_slug: "$brewery_slug.slug",
        },
      },
      {
        $unwind: "$brewery_slug",
      },
    ]);

    if (!userReviews)
      return res.status(400).json({ err: "Reviews do not exist." });
    res.json(userReviews);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: err.message });
  }
};

const deleteUserReview = async (req, res) => {};

export default handler;

//protect api route
