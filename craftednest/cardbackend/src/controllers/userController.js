import mongoose from "mongoose";
import { ApiError } from "../utils/Apierrors.js";
import { asynchandler } from "../utils/asynchandler.js";
import { User } from "../models/users.models.js";
import { uploadonCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/Apiresponses.js";
import jwt from "jsonwebtoken";

const registeruser = asynchandler(async (req, res) => {
  //get user details from the frontend
  //validate all - not empty
  //check if user already existed : username and email
  //check from images,check for avatar(required)
  //upload on cloudinary,avatar
  //create user object-create entry in db
  //remove password and refresh token feild from response
  //check for user creation
  //return res

  const { username, fullname, email, password } = req.body;
  // console.log("username: ", username);
  // console.log("fullname: ", fullname);
  // console.log("email: ", email);
  // console.log("password : ", password);
  //console.log(req.body);

  if (!username) throw new ApiError(400, "UserName is required");
  if (!fullname) throw new ApiError(400, "FullName is required");
  if (!email) throw new ApiError(400, "Email is required");
  if (!password) throw new ApiError(400, "Password is required");

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  console.log(existedUser);
  if (existedUser)
    throw new ApiError(409, "User with email or username already exists");

  //multer working here to save files on our server temporarily
//   console.log(req.files);
//   const avatarLocalPath = await req.files?.avatar[0]?.buffer;
//   //const coverImageLocalFilePath = await req.files?.coverImage[0]?.path;
//   let coverImageLocalPath;
//   if (
//     req.files &&
//     Array.isArray(req.files.coverImage) &&
//     req.files.coverImage.length > 0
//   ) {
//     coverImageLocalPath = await req.files.coverImage[0].buffer;
//   }

//   if (!avatarLocalPath) throw new ApiError(400, "Avatar file is required");

//   const avatar = await uploadonCloudinary([
//     { buffer: avatarLocalPath, originalname: req.files.avatar[0].originalname },
//   ]);
//   const coverImage = await uploadonCloudinary([
//     {
//       buffer: coverImageLocalPath,
//       originalname: req.files.coverImage[0].originalname,
//     },
//   ]);

//   if (!avatar) throw new ApiError(400, "Avatar file is required");

  const newUser = await User.create({
    fullname,
    // avatar: avatar.url,
    // coverImage: coverImage?.url || "",
    email,
    password,
    username,
  });
  //select fields is used as to remove password and refreshToken from the response that has to be send to the user
  const createdUser = await User.findById(newUser._id).select(
    "-password -refreshToken"
  );
  console.log(createdUser);
  if (!createdUser) throw new ApiError(500, "Not able to Register the user");
  const { accessToken, refreshToken } = await generateAccessandRefreshTokens(
    createdUser._id
  );
  const options = {
    secure: true,
    sameSite: "None",
    httpOnly: true,
  };
  res
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options);
  return res
    .status(200)
    .json(new ApiResponse(200, createdUser, "SuccessFull Registration"));
});

//this fun generates access and refresh token during the fresh login
const generateAccessandRefreshTokens = async (userid) => {
  try {
    const user = await User.findById(userid);

    const accessToken = await user.generateAccessTokens();
    if (!accessToken) throw new ApiError(500, "can't generate token");
    const refreshToken = await user.generateRefreshTokens();
    //saving refresh tokens in db and saving it without any validation
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    // if (accessToken == "") console.log("No access Token");
    // if (!refreshToken) console.log("No refresh Token");

    //returning the access and refresh tokens
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating tokens");
  }
};

//this is meathod for logging in the user
const loginUser = asynchandler(async (req, res) => {
  //take username and password from the frontend
  //check if username already exist in the db
  //if exists the check if the password is correct or not
  //generate access and refresh tokens
  // if all correct then return the respose in cookies

  const { username, password } = req.body;

  if (!username) throw new ApiError(400, "UserName is required");
  if (!password) throw new ApiError(400, "password is required");

  const currentUser = await User.findOne({ username });
  console.log("current user :", currentUser);
  if (!currentUser) throw new ApiError(400, "Unknown User");

  const correctPassword = await currentUser.isPasswordCorrect(password);
  if (!correctPassword)
    throw new ApiError(400, "Please enter correct password");

  // const loggedinUser = User.findById(currentUser._id);

  const { accessToken, refreshToken } = await generateAccessandRefreshTokens(
    currentUser._id
  );

  //for security purpose of our cookies we set some options so that the cookies can only be modified from the server side and not from the frontend
  const options = {
    secure: true,
    sameSite: "None",
    httpOnly: true,
  };
  //new database call so that all the updated information can come in the new user
  const updatedloggedinUser = await User.findById(currentUser._id).select(
    "-password -refreshTokens"
  );
  console.log(updatedloggedinUser);
  res
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options);

  return res
    .status(200)
    .json(new ApiResponse(200, updatedloggedinUser, "Logged In SuccessFully"));
});

const logOutUser = asynchandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User LoggedOut SuccessFully"));
});

//In case of expiry of access token and donot want to relogin the user can access to this to generate new accesstoken
const refreshAccessToken = asynchandler(async (req, res) => {
  const newRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
  if (!newRefreshToken) throw new ApiError(401, "No user Found");

  const verifiedToken = jwt.verify(
    newRefreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );
  const user = await User.findById(verifiedToken?._id);
  if (!user) throw new ApiError(401, "Unauthorised Access");
  if (newRefreshToken !== user?.refreshToken)
    throw new ApiError(401, "Refresh Toeken has been used");

  const options = {
    httpOnly: true,
    secure: true,
  };

  const { accessToken, refreshToken } = await generateAccessandRefreshTokens(
    user._id
  );

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { accessToken, refreshToken: newRefreshToken },
        "Access token refreshed"
      )
    );
});

const updatePassword = asynchandler(async (req, res) => {
  const { oldPassword, newPassword, ConfirmPassword } = req.body;

  const user = await User.findById(req.user?._id);
  const verifyPassword = await user.isPasswordCorrect(oldPassword);
  if (!verifyPassword) throw new ApiError(401, "Invalid Old Password");

  if (newPassword !== ConfirmPassword)
    throw new ApiError(401, "New Password and Confirm Password are not same");

  const currentUser = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        password: newPassword,
      },
    },
    { new: true }
  ).select("-password -refreshToken");

  return res
    .status(200)
    .json(new ApiResponse(200, currentUser, "Updated Password Correctly"));
});

const updateOtherDetails = asynchandler(async (req, res) => {
  const { email, fullname } = req.body;

  if (!email && !fullname) throw new ApiError(401, "Both fields are required");

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        fullname: fullname,
        email: email,
      },
    },
    {
      new: true,
    }
  ).select("-password -refreshToken");
  console.log(user);

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Details Updated Successfully"));
});

const updateAvatar = asynchandler(async (req, res) => {
  const avatarLocalPath = await req.file?.path;
  if (!avatarLocalPath) throw new ApiError(401, "Avatar is required to change");

  const updatedAvatar = await uploadonCloudinary(avatarLocalPath);
  if (!updatedAvatar.url)
    throw new ApiError(500, "Avatar is not uploaded on cloudinary");

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        avatar: updatedAvatar?.url,
      },
    },
    {
      new: true,
    }
  ).select("-password -refreshToken");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Avatar Updated Successfully"));
});

// const updateCoverImage = asynchandler(async (req, res) => {
//   const CoverImageLocalPath = req.file?.path;
//   if (!CoverImageLocalPath)
//     throw new ApiError(401, "Cover Image is required to change");

//   const updatedCoverImage = await uploadonCloudinary(avatarLocalPath);
//   if (!updatedCoverImage)
//     throw new ApiError(500, "Cover Image is not uploaded on cloudinary");

//   const user = await User.findByIdAndUpdate(
//     req.user?._id,
//     {
//       $set: {
//         coverImage: updatedCoverImage?.url,
//       },
//     },
//     {
//       new: true,
//     }
//   ).select("-password -refreshToken");

//   return res
//     .status(200)
//     .json(new ApiResponse(200, user, "Cover Image Updated Successfully"));
// });

const getCurrentUser = asynchandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "this is the current user"));
});

// const getUserProfile = asynchandler(async (req, res) => {
//   //request generally comes from urls
//   const { username } = await req.params;
//   const userid = req.user?._id;
//   if (!userid) throw new ApiError(400, "Id not found");
//   if (!username?.trim()) throw new ApiError(400, "UserName not found");

//   //here aggregation pipelines are used
//   const profile = await User.aggregate([
//     //for matching the username
//     {
//       $match: {
//         username: username,
//       },
//     },
//     {
//       //for finding the subscribers of the channel we are in user right now
//       $lookup: {
//         from: "subscriptionschemas",
//         localField: "_id",
//         foreignField: "channel",
//         as: "tsubscribers",
//       },
//     },
//     {
//       //for finding the channel we have subscribed
//       $lookup: {
//         from: "subscriptionschemas",
//         localField: "_id",
//         foreignField: "subscriber",
//         as: "totalChannelSubscribed",
//       },
//     },
//     {
//       //adding extra fields in the model
//       $addFields: {
//         totalSubscribersCount: {
//           $size: "$tsubscribers",
//         },
//         totalChannelSubscribedCount: {
//           $size: "$totalChannelSubscribed",
//         },
//         isSubscribed: {
//           $cond: {
//             if: {
//               $in: [userid, "$tsubscribers.subscriber"],
//             },
//             then: true,
//             else: false,
//           },
//         },
//       },
//     },
//     {
//       //what info we want to show
//       $project: {
//         fullname: 1,
//         username: 1,
//         avatar: 1,
//         coverImage: 1,
//         totalSubscribersCount: 1,
//         totalChannelSubscribedCount: 1,
//         isSubscribed: 1,
//       },
//     },
//   ]);
//   if (!profile?.length) throw new ApiError(404, "Profile not Found");

//   console.log(profile);

//   return res
//     .status(200)
//     .json(new ApiResponse(200, profile[0], "This is the User profile"));
// });


export {
  registeruser,
  loginUser,
  logOutUser,
  refreshAccessToken,
  updatePassword,
  updateOtherDetails,
  updateAvatar,
  getCurrentUser,
  getUserProfile,

};