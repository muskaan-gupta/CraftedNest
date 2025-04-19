import { Router } from "express";
//import { logOutUser, registeruser } from "../controllers/user.controllers.js";
//import { loginUser } from "../controllers/user.controllers.js";
//for handling the files
import { upload } from "../middlewares/multer.middleware.js";
import { verifiedJWT } from "../middlewares/auth.middleware.js";
import {
  registeruser,
  loginUser,
  logOutUser,
  refreshAccessToken,
  updatePassword,
  updateOtherDetails,
  updateAvatar,
  updateCoverImage,
  getCurrentUser,
  getUserProfile,
  getWatchHistory,
  getUploadedVideos,
} from "../controllers/user.controllers.js";
const router = Router();

router.route("/register").post(
  //files handling using multer middleware
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registeruser
);
//https://localhost:5000/users/register

router.route("/login").post(loginUser);
//verifiedJWT is used as a middleware
router.route("/logout").post(verifiedJWT, logOutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/updatePassword").post(verifiedJWT, updatePassword);
router.route("/updateOtherDetails").patch(verifiedJWT, updateOtherDetails);
router.route("/getCurrentUser").get(verifiedJWT, getCurrentUser);

router
  .route("/updateavatar")
  .patch(verifiedJWT, upload.single("avatar"), updateAvatar);

router
  .route("/updateCoverImage")
  .patch(verifiedJWT, upload.single("avatar"), updateCoverImage);

//for request coming from params
router.route("/c/:username").get(verifiedJWT, getUserProfile);
router.route("/getWatchHistory").get(verifiedJWT, getWatchHistory);
router.route("/getUploadedVideo").get(verifiedJWT, getUploadedVideos);
export default router;