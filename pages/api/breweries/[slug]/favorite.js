import connectDB from "../../../../src/lib/connectDB";
import Brewery from "../../../../src/models/breweryModel";
import mongoose from "mongoose";

const handler = async (req, res) => {
  await connectDB();

  if (req.method !== "PATCH") {
    return;
  }
  try {
    const { slug } = req.query;
    const { user_id } = req.body;

    const userObjectId = mongoose.Types.ObjectId(user_id);

    //add or remove favorite (heart) for brewery
    await Brewery.updateOne({ slug }, [
      {
        $set: {
          favorite_list: {
            $cond: [
              {
                $in: [userObjectId, "$favorite_list"],
              },
              {
                $setDifference: ["$favorite_list", [userObjectId]],
              },
              {
                $concatArrays: ["$favorite_list", [userObjectId]],
              },
            ],
          },
          favorite_count: {
            $cond: [
              {
                //check if userId is in favorite_list array
                //returns boolean
                $in: [userObjectId, "$favorite_list"],
              },
              {
                //true-case
                //decrease favorite_count if user already favorited review (user found in favorite_list array)
                $add: ["$favorite_count", -1],
              },
              {
                //false-case
                //vice versa
                $add: ["$favorite_count", 1],
              },
            ],
          },
        },
      },
    ]);

    return res.json({ msg: "Update Success!" });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

export default handler;
