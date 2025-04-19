import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
      index: true, //for optimum searching
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      //from cloudinary url where our images is stored
      type: String,
      required: true,
    },
    coverImage: {
      //from cloudinary url
      type: String,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
    watchHistory: [
      {
        type: String,
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  },
  { versionKey: false }
);

//some hooks or middlewares of mongoose are used
//pre is used as a middleware which performs the particuar task before any event that is going to happen.
//here it encrypt the password just before it is saved in db.

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});
//if condition is used that the password is only encrypted when the password is updated or saved. if any other info is changed then password nend not to be encrypted again.
//next moves towards the next middleware.

//Now create a function to check if the password entered is correct is not. for that we need to create a meathod.
userSchema.methods.isPasswordCorrect = async function (password) {
  console.log(password);
  console.log(this.password);
  
  return await bcrypt.compare(password, this.password);
};

//jwt tokens

userSchema.methods.generateAccessTokens = async function () {
  return await jwt.sign(
    {
      _id: this._id,
      // email: this.email,
      // username: this.username,
      // fullname: this.fullname,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateRefreshTokens = async function () {
  return await jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);