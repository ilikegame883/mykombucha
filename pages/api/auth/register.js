import Users from "../../../src/models/userModel";
import bcrypt from "bcrypt";
import connectDB from "./../../../src/lib/connectDB";

const handler = async (req, res) => {
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
  } catch (err) {
    return res.status(500).json({ err: "Something went wrong." });
  }
};

export default handler;
