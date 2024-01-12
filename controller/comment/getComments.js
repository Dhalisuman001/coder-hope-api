import expressAsyncHandler from "express-async-handler";
import Comment from "../../Schema/Comment.js";

const SUCCESS = "FETCH_COMMENTS_BLOG_SUCCESS";
const FAILURE = "FETCH_COMMENTS_BLOG_FAILURE";
// const LIMIT = 5;

const getCommentsController = expressAsyncHandler(async (req, res) => {
  try {
    const { blog_id } = req.query;
    // const author = req.userId;
    if (!blog_id) throw new Error("Blog ID is required");

    const comment = await Comment.find({ blog_id })
      .populate(
        "commented_by",
        "personal_info.profile_img personal_info.fullname personal_info.username -_id"
      )
      .sort({ publishedAt: -1 });
    // .skip((page - 1) * LIMIT)
    if (comment) throw new Error("Blog not found");

    res.status(200).json({
      status: true,
      code: SUCCESS,
      payload: comment,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      code: FAILURE,
      payload: {
        error: "Blog not found",
      },
    });
  }
});

export default getCommentsController;
