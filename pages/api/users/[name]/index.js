import connectDB from "../../../../src/lib/connectDB";
import User from "../../../../src/models/userModel";

connectDB();

const handler = async (req, res) => {
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
  try {
    //get current username
    const { name: username } = req.query;

    //get new name
    const { firstname, lastname, avatar, city, country, bio } = req.body;

    const update = {
      firstname,
      lastname,
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

    res.json({ msg: "Update Success!" });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

export default handler;

//protect api route
