import expressAsyncHandler from "express-async-handler";
import Blog from "../../Schema/Blog.js";

const SUCCESS = "FETCH_BLOG_DETAILS_SUCCESS";
const FAILURE = "FETCH_BLOG_DETAILS_FAILURE";

const fetchUserblogController = expressAsyncHandler(async (req, res) => {
  try {
    const { blog_id } = req.params;

    const increment = 1;

    const blog = await Blog.findOneAndUpdate(
      { blog_id },
      { $inc: { "activity.total_reads": increment } }
    )
      .populate(
        "author",
        "personal_info.profile_img personal_info.fullname personal_info.username "
      )
      .select(
        "blog_id title banner content des activity tags publishedAt -_id"
      );

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
