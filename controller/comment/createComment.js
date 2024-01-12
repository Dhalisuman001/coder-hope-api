import expressAsyncHandler from "express-async-handler";
import { validationResult } from "express-validator";
import Blog from "../../Schema/Blog.js";
import Comment from "../../Schema/Comment.js";
import Notification from "../../Schema/Notification.js";

const SUCCESS = "CREATE_COMMENT_SUCCESS";
const FAILURE = "CREATE_COMMENT_FAILURE";

const createCommentController = expressAsyncHandler(async (req, res) => {
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
    let { comment, blog_id, blog_author } = req.body;
    const commented_by = req.userId;

    // Creating comment document
    let commentObj = new Comment({
      blog_id,
      blog_author,
      comment,
      commented_by,
    });

    const resp = await commentObj.save();

    await Blog.findByIdAndUpdate(blog_id, {
      $push: { comments: resp._id },
      $inc: { "activity.total_comments": 1 },
      "acitvity.total_parent_comments": 1,
    });
    // console.log("working", update_blog);

    let notiObject = new Notification({
      type: "comment",
      blog: blog_id,
      notification_for: blog_author,
      user: commented_by,
      comment: resp._id,
    });
    await notiObject.save();

    // console.log("Notificatin", update_notification);

    return res.status(200).json({
      status: true,
      code: SUCCESS,
      payload: resp,
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

export default createCommentController;
