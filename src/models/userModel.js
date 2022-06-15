import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      // select: false,
      //password will be not accesssible by default with select false
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
    // likes_received: {
    //   type: Number,
    //   default: 0,
    // },
    avatar: {
      type: String,
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

    wish_list: [{ type: mongoose.Types.ObjectId, ref: "Kombucha" }],
    favorite_brewery: [{ type: mongoose.Types.ObjectId, ref: "Brewery" }],
    // reviews_liked: [{ type: mongoose.Types.ObjectId, ref: "Review" }],
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
