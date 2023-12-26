import expressAsyncHandler from "express-async-handler";
import { validationResult } from "express-validator";
import User from "../../Schema/User.js";
import { nanoid } from "nanoid";
import getToken from "../../configs/token/getToken.js";

const generateUsername = async (email) => {
  let username = email.split("@")[0];
  let isUnique = await User.exists({ "personal_info.username": username });
  if (isUnique) {
    return (username += nanoid().substring(0, 3));
  }
  return username;
};

const formatResponse = (info, token) => {
  return {
    fullname: info.fullname,
    username: info.username,
    profile_img: info.profile_img,
    token,
  };
};

const registerController = expressAsyncHandler(async (req, res) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    let errors = result.array()[0].msg;
    return res.status(403).json({
      status: false,
      code: "SIGNUP_FAILURE",
      payload: {
        error: errors,
      },
    });
  }

  try {
    const { fullname, email, password } = req.body;

    const isNotUniqueEmail = await User.exists({
      "personal_info.email": email,
    });

    if (isNotUniqueEmail) {
      return res.status(403).json({
        status: false,
        code: "SIGNUP_FAILURE",
        payload: {
          error: "Email already in use",
        },
      });
    }

    let username = await generateUsername(email);

    let user = new User({
      personal_info: { fullname, email, password: password, username },
    });
    user = await user.save();

    let response = formatResponse(user.personal_info, getToken(user._id));

    return res.status(200).json({
      status: true,
      code: "SIGNUP_SUCCESS",
      payload: response,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      code: "SIGNUP_FAILURE",
      payload: {
        error: error.message,
      },
    });
  }
});

export default registerController;
