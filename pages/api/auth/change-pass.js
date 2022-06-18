import { getSession } from "next-auth/react";
import Users from "../../../src/models/userModel";
import connectDB from "./../../../src/lib/connectDB";
import { hashPassword, verifyPassword } from "../../../src/utils/verify";

connectDB();

async function handler(req, res) {
  if (req.method !== "PATCH") {
    return;
  }

  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: "Not authenticated!" });
    return;
  }
  const { _id } = session.user;
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

  //what does updateOne return?
  await Users.updateOne({ _id }, { $set: { password: hashedPassword } });

  res.status(200).json({ msg: "Password updated!" });
}

export default handler;
