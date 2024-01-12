import expressAsyncHandler from "express-async-handler";
import { validationResult } from "express-validator";
import Blog from "../../Schema/Blog.js";
// import Blog from "../../Schema/Blog.js";

const SUCCESS = "FETCH_LIKE_BLOG_SUCCESS";
const FAILURE = "FETCH_LIKE_BLOG_FAILURE";

const fetchLikeBlogController = expressAsyncHandler(async (req, res) => {
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

  // const authorID = req.userId;
  const { blog_id } = req.params;

  try {
    let blog = await Blog.findOne({ blog_id }).select(
      "activity.total_likes  activity.likedBy -_id"
    );

    if (!blog) throw new Error("Blog does not exist!");

    return res.status(200).json({
      status: true,
      code: SUCCESS,
      payload: blog.activity,
    });

    // console.log(blog);
  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      status: false,
      code: FAILURE,
      payload: {
        error: error.message,
      },
    });
  }
});

export default fetchLikeBlogController;
