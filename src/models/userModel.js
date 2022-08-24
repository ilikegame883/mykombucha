import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      // select: false,
      //password will be not accesssible by default with select: false
    },
    role: {
      type: String,
      default: "user",
    },
    root: {
      type: Boolean,
      default: false,
    },
    review_total: {
      type: Number,
      default: 0,
    },
    avatar: {
      image: { type: String, default: "" },
      public_id: { type: String },
    },
    city: {
      type: String,
    },
    country: {
      type: String,
    },
    bio: {
      type: String,
    },
    wish_list: {
      type: [{ type: mongoose.Types.ObjectId, ref: "Kombucha" }],
    },
    favorite_brewery: {
      type: [{ type: mongoose.Types.ObjectId, ref: "Brewery" }],
    },
  },
  {
    timestamps: true,
  }
);

//create the model for our schema
//model() method makes a copy of all we defined on the schema.
//It also contains all Mongoose methods we will use to interact with the database.
let User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
