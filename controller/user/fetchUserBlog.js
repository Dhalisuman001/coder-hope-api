import expressAsyncHandler from "express-async-handler";
import Blog from "../../Schema/Blog.js";

const SUCCESS = "FETCH_USER_BLOG_SUCCESS";
const FAILURE = "FETCH_USER_BLOG_FAILURE";
const LIMIT = 5;

const fetchUserblogController = expressAsyncHandler(async (req, res) => {
  try {
    const { page = 1, user_id } = req.query;
    // const author = req.userId;
    const blog = await Blog.find({ author: user_id, draft: false })
      .populate(
        "author",
        "personal_info.profile_img personal_info.fullname personal_info.username -_id"
      )
      .sort({ publishedAt: -1 })
      .select("blog_id title banner des activity tags publishedAt -_id")
      .limit(LIMIT * page);
    // .skip((page - 1) * LIMIT)

    res.status(200).json({
      status: true,
      code: SUCCESS,
      payload: blog,
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

export default fetchUserblogController;
