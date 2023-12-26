import expressAsyncHandler from "express-async-handler";
import { validationResult } from "express-validator";
import User from "../../Schema/User.js";
import getToken from "../../configs/token/getToken.js";

const SUCCESS = "SIGNIN_SUCCESS";
const FAILURE = "SIGNIN_FAILURE";

const formatResponse = (info, token) => {
  return {
    fullname: info.fullname,
    username: info.username,
    profile_img: info.profile_img,
    token,
  };
};

const loginController = expressAsyncHandler(async (req, res) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    let errors = result.array()[0].msg;
    return res.status(403).json({
      status: false,
      code: FAILURE,
      payload: {
        error: errors,
      },
    });
  }

  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      "personal_info.email": email,
    });

    if (!user) {
      return res.status(403).json({
        status: false,
        code: FAILURE,
        payload: {
          error: "Email not found",
        },
      });
    }

    let isMatch = await user.CheckPassword(password);

    if (!isMatch) {
      return res.status(403).json({
        status: false,
        code: FAILURE,
        payload: {
          error: "Password isn't correct",
        },
      });
    }

    let response = formatResponse(user.personal_info, getToken(user._id));

    return res.status(200).json({
      status: true,
      code: SUCCESS,
      payload: response,
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

export default loginController;
