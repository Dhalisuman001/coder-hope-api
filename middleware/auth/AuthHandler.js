import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

const STATUS = 401;
const MESSAGE_1 = "PLease attach bearer token";
const MESSAGE_2 = "Unauthorized access";
// const MESSAGE_3 = "Token expired, login again";
const FAILURE = "ACCESS_DENIED";

const AuthHandel = expressAsyncHandler(async (req, res, next) => {
  let token;
  if (!req.headers.authorization?.startsWith("Bearer")) {
    return res.status(STATUS).json({
      status: false,
      code: FAILURE,
      payload: {
        error: MESSAGE_1,
      },
    });
  }
  try {
    token = req.headers.authorization.replace("Bearer ", "");
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      // console.log(decoded);

      //find the user by _id
      // const user = await User.findById(decoded?.id).select("_id");

      //attach the user the request object
      req.userId = decoded?.id;
      next();
    } else {
      return res.status(STATUS).json({
        status: false,
        code: FAILURE,
        payload: {
          error: MESSAGE_2,
        },
      });
    }
  } catch (error) {
    return res.status(STATUS).json({
      status: false,
      code: FAILURE,
      payload: {
        error: MESSAGE_2,
      },
    });
  }
});

export default AuthHandel;
