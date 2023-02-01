import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "../../../../../src/utils/getServerSession";
import User from "../../../../../src/models/userModel";
import Kombucha from "../../../../../src/models/kombuchaModel";
import connectDB from "../../../../../src/lib/connectDB";
import mongoose from "mongoose";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();

  switch (req.method) {
    case "GET":
      await getUserWishList(req, res);
      break;
    case "PATCH":
      await updateUserWishList(req, res);
      break;
  }
};

//can't sort populated fields
//use aggregate to sort
//TODO: sort by add_date
const getUserWishList = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id: _id } = req.query;

    const { wish_list } = await User.findById({ _id })
      .populate({
        path: "wish_list",
        populate: {
          path: "kombucha_id",
          model: Kombucha,
        },
      })
      .select("wish_list");
    if (!wish_list) return res.json([]);

    res.json(wish_list);
  } catch (error) {
    let msg: string;
    if (error instanceof Error) msg = error.message;
    else msg = String(error);
    return res.status(500).json({ err: msg });
  }
};

//TODO: add wish_list item to user's wish_list - wish_list: [{kombucha_id: Object_id, add_date}]
const updateUserWishList = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  //protect API route
  if (!getServerSession(req, res)) {
    res.status(401).json({ msg: "Not authenticated!" });
    return;
  }

  try {
    const { id: _id, action } = req.query;
    const { kombucha_id, add_date } = req.body;

    //kombucha_id string to Object_id
    const objectId = new mongoose.Types.ObjectId(kombucha_id);
    let update = { kombucha_id: objectId, add_date };
    //TODO: add to db-utils
    if (action === "remove") {
      await User.updateOne({ _id }, [
        {
          $set: {
            //stage
            wish_list: {
              //if kombucha_id is in wish_list
              //filter arr to only include users that do not match
              $filter: {
                input: "$wish_list",
                as: "item",
                cond: { $ne: ["$$item.kombucha_id", objectId] },
              },
            },
          },
        },
      ]);
      res.json({ msg: "Kombucha removed from your wish list!" });
    }
    if (action === "add") {
      // @ts-ignore
      await User.updateOne({ _id }, { $addToSet: { wish_list: update } });
      res.json({ msg: "Kombucha added to your wish list!" });
    }
  } catch (error) {
    let msg: string;
    if (error instanceof Error) msg = error.message;
    else msg = String(error);
    return res.status(500).json({ err: msg });
  }
};

export default handler;
