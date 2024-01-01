import expressAsyncHandler from "express-async-handler";
import Blog from "../../Schema/Blog.js";

const SUCCESS = "COUNT_BLOG_SUCCESS";
const FAILURE = "COUNT_BLOG_FAILURE";
// const LIMIT = 5;

const latestBlogCountController = expressAsyncHandler(async (req, res) => {
  try {
    const blog = await Blog.countDocuments({ draft: false });

    // .skip((page - 1) * LIMIT)

    res.status(200).json({
      status: true,
      code: SUCCESS,
      payload: {
        blogCount: blog,
      },
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

export default latestBlogCountController;
