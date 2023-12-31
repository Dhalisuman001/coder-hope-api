import expressAsyncHandler from "express-async-handler";
import Blog from "../../Schema/Blog.js";

const SUCCESS = "FETCH_TRENDING_BLOG_SUCCESS";
const FAILURE = "FETCH_TRENDING_BLOG_FAILURE";
const LIMIT = 5;

const trendingBlogController = expressAsyncHandler(async (req, res) => {
  try {
    const blog = await Blog.find({ draft: false })
      .populate(
        "author",
        "personal_info.profile_img personal_info.fullname personal_info.username -_id"
      )
      .sort({
        "activity.total_read": -1,
        "activity.total_likes": -1,
        publishedAt: -1,
      })
      .select("blog_id title publishedAt -_id")
      .limit(LIMIT);

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

export default trendingBlogController;
