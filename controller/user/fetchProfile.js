import expressAsyncHandler from "express-async-handler";
import User from "../../Schema/User.js";

const SUCCESS = "FETCH_USER_PROFILE_SUCCESS";
const FAILURE = "FETCH_USER_PROFILE_FAILURE";
// const LIMIT = 5;

const fetchUserProfileController = expressAsyncHandler(async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({
      "personal_info.username": username,
    }).select("-personal_info.password -google_auth -updatedAt -blogs");

    // .skip((page - 1) * LIMIT)

    res.status(200).json({
      status: true,
      code: SUCCESS,
      payload: user,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      code: FAILURE,
      payload: {
        error: error.message,
      },
    });
  }
});

export default fetchUserProfileController;
