import * as bcrypt from "bcryptjs";
import type { NextApiRequest, NextApiResponse } from "next";
import Users from "../../../src/models/userModel";
import connectDB from "./../../../src/lib/connectDB";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return;
  }

  await connectDB();

  try {
    const { username, email, password, cf_password } = req.body;

    const existingUser = await Users.findOne({ email });
    if (existingUser)
      return res.status(400).json({ err: "This email already exists." });

    const passwordHash = await bcrypt.hash(password, 12);

    const newUser = new Users({
      username,
      email,
      password: passwordHash,
      cf_password,
    });

    await newUser.save();
    res.json({ msg: "Register Success!" });
  } catch (error) {
    let msg: string;
    if (error instanceof Error) msg = error.message;
    else msg = String(error);
    return res.status(500).json({ err: msg });
  }
};

export default handler;
