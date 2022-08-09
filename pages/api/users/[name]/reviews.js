import connectDB from "../../../../src/lib/connectDB";
import Review from "../../../../src/models/reviewModel";

const handler = async (req, res) => {
  await connectDB();

  switch (req.method) {
    case "GET":
      await getUserReviews(req, res);
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
    ]);

    if (!userReviews)
      return res.status(400).json({ err: "Review does not exist." });
    res.json(userReviews);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: "Something went wrong." });
  }
};
export default handler;

//protect api route
