import type { NextApiRequest, NextApiResponse } from "next";
import Users from "../../../src/models/userModel";
import connectDB from "../../../src/lib/connectDB";
import { hashPassword, verifyPassword } from "../../../src/utils/verify";
import { getServerSession } from "../../../src/utils/getServerSession";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "PATCH") {
    return;
  }
  const session = await getServerSession(req, res);

  if (!session) {
    res.status(401).json({ msg: "Not authenticated!" });
    return;
  }

  await connectDB();

  const { id: _id } = session.user;
  const { currentPassword, newPassword } = req.body;

  const user = await Users.findOne({ _id });

  if (!user) {
    res.status(404).json({ err: "User not found." });
    return;
  }

  const currentHash = user.password;

  const passwordsAreEqual = await verifyPassword(currentPassword, currentHash);
  if (!passwordsAreEqual) {
    res.status(403).json({ err: "Invalid password." });
    return;
  }

  const hashedPassword = await hashPassword(newPassword);

  await Users.updateOne({ _id }, { $set: { password: hashedPassword } });
  res.status(200).json({ msg: "Password updated!" });
};

export default handler;
