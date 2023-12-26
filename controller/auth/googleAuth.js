import expressAsyncHandler from "express-async-handler";
import { validationResult } from "express-validator";
import User from "../../Schema/User.js";
import getToken from "../../configs/token/getToken.js";
import admin from "firebase-admin";
import serviceAccount from "../../code-help-43432-firebase-adminsdk-p5kq8-d532c18a7a.json" assert { type: "json" };
import { getAuth } from "firebase-admin/auth";

const SUCCESS = "GOOGLE_AUTH_SUCCESS";
const FAILURE = "GOOGLE_AUTH_FAILURE";

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

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const googleAuthController = expressAsyncHandler(async (req, res) => {
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
    const { access_token } = req.body;
    const resp = await getAuth().verifyIdToken(access_token);

    const { email, name, picture, user_id } = resp;

    const profile_img = picture.replace("s96-c", "s384-c");

    let user = await User.findOne({
      "personal_info.email": email,
    });

    if (!user) {
      let username = await generateUsername(email);
      user = new User({
        personal_info: {
          fullname: name,
          username,
          password: user_id,
          profile_img,
          email,
        },
        google_auth: true,
      });
      user = await user.save();
    }

    let response = formatResponse(user.personal_info, getToken(user._id));

    return res.status(200).json({
      status: true,
      code: SUCCESS,
      payload: response,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      code: FAILURE,
      payload: {
        error: error.message,
      },
    });
  }
});

export default googleAuthController;
