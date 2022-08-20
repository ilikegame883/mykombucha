import connectDB from "../../../../src/lib/connectDB";
import User from "../../../../src/models/userModel";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

const handler = async (req, res) => {
  await connectDB();

  switch (req.method) {
    case "GET":
      await getSingleUser(req, res);
      break;
    case "PATCH":
      await updateUser(req, res);
      break;
  }
};
const getSingleUser = async (req, res) => {
  try {
    const { name: username } = req.query;

    const userData = await User.aggregate([
      //get user by username to populate user profile page
      {
        $match: { username },
      },
      {
        $lookup: {
          from: "kombuchas",
          localField: "wish_list",
          foreignField: "_id", //Kombucha collection _ids
          as: "wish_list",
        },
      },
      {
        $lookup: {
          from: "reviews",
          localField: "username",
          foreignField: "username",
          as: "avg_rating",
        },
      },
      {
        $addFields: {
          avg_rating: { $avg: "$avg_rating.rating" },
        },
      },
      //return only required items
      {
        $project: {
          role: 0,
          password: 0,
          root: 0,
          updatedAt: 0,
        },
      },
    ]);

    if (!userData)
      return res.status(400).json({ err: "This user does not exist." });
    res.json(userData);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: err.message });
  }
};

const updateUser = async (req, res) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ msg: "Not authenticated!" });
    return;
  }

  try {
    //get current username
    const { name: username } = req.query;

    //get revised info
    const { avatar, city, country, bio } = req.body;

    const update = {
      avatar,
      city,
      country,
      bio,
    };
    const option = { new: true };

    const updatedUser = await User.findOneAndUpdate(
      { username },
      update,
      option
    );

    if (!updatedUser)
      return res.status(400).json({ err: "This user does not exist." });

    res.json({ msg: "Changes Saved!" });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

export default handler;

//protect api route
