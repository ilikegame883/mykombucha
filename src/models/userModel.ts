import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
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
    profile: {
      image: { type: String, default: null },
      image_id: { type: String, default: null },
      city: { type: String, default: null },
      country: { type: String, default: null },
      bio: { type: String, default: null },
    },
    reviews: {
      type: [
        {
          type: mongoose.Types.ObjectId,
          ref: "Review",
        },
      ],
    },
    //check if total and avg gets created for new oauth users - update: it does not
    review_total: {
      type: Number,
    },
    rating_avg: {
      type: Number,
      default: 0,
    },
    wish_list: {
      type: [
        {
          kombucha_id: { type: mongoose.Types.ObjectId, ref: "Kombucha" },
          add_date: { type: Date },
          // _id: false,
        },
      ],
    },
    favorite_breweries: {
      type: [
        {
          id: { type: mongoose.Types.ObjectId, ref: "Brewery" },
          add_date: { type: Date },
        },
      ],
    },
    createdAt: { type: Date },
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
