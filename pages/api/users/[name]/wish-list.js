import connectDB from "../../../../src/lib/connectDB";
import Kombucha from "../../../../src/models/kombuchaModel";
import User from "../../../../src/models/userModel";

import mongoose from "mongoose";

const handler = async (req, res) => {
  await connectDB();

  if (req.method !== "PATCH") {
    return;
  }
  try {
    const { name } = req.query;
    const { kombucha_id, date: current_date } = req.body;

    let kombuchaObjectId = mongoose.Types.ObjectId(kombucha_id);

    //grab kombucha by _id to access wish_list_users list
    //add/remove user and date info from kombucha wish_list_users list, by username
    await Kombucha.updateOne({ _id: kombucha_id }, [
      {
        $set: {
          //stage
          wish_list_users: {
            $cond: [
              {
                //check to see if user is in wish_list_users.username
                //somehow .username grabs the object data inside wish_list_users array?
                $in: [name, "$wish_list_users.username"],
              },
              {
                //if user is included in wish_list_users already,
                //filter arr to only include users that do not match
                $filter: {
                  input: "$wish_list_users",
                  as: "item",
                  cond: { $ne: ["$$item.username", name] },
                },
              },
              {
                //if user is not inclduded in wish_list_users,
                //add user and date added to wish_list_users
                $concatArrays: [
                  "$wish_list_users",
                  [{ username: name, date: current_date }],
                ],
              },
            ],
          },
        },
      },
    ]);

    await User.updateOne({ username: name }, [
      {
        $set: {
          wish_list: {
            $cond: [
              {
                $in: [kombuchaObjectId, "$wish_list"],
              },
              {
                $setDifference: ["$wish_list", [kombuchaObjectId]],
              },
              {
                $concatArrays: ["$wish_list", [kombuchaObjectId]],
              },
            ],
          },
        },
      },
    ]);

    return res.json({ msg: "Wish List Updated!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: "Something went wrong." });
  }
};

export default handler;
