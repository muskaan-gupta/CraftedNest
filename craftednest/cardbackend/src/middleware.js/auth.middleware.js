import { ApiError } from "../utils/Apierrors.js";
import { asynchandler } from "../utils/asynchandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/users.models.js";

//res is not used inside the function so can be replaced with a underscore
const verifiedJWT = asynchandler(async (req, _, next) => {
  try {
    console.log("Cookies received:", req.cookies);
    const aToken =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    console.log("The token is ", aToken);

    if (!aToken) throw new ApiError("401", "Unauthorised Access");

    const decodedToken = jwt.verify(aToken, process.env.ACCESS_TOKEN_SECRET);
    console.log(decodedToken);
    const currentUser = await User.findById(decodedToken._id);

    if (!currentUser) throw new ApiError(401, "Invalid Access Token");

    req.user = currentUser;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});

export { verifiedJWT };