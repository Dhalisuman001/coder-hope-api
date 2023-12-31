import expressAsyncHandler from "express-async-handler";
import { validationResult } from "express-validator";
import Blog from "../../Schema/Blog.js";
import User from "../../Schema/User.js";
import { nanoid } from "nanoid";

const SUCCESS = "CREATE_BLOG_SUCCESS";
const FAILURE = "CREATE_BLOG_FAILURE";

const createBlogController = expressAsyncHandler(async (req, res) => {
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
    let { tags, des, banner, content, title, draft } = req.body;
    const authorID = req.userId;

    tags = tags.map((tag) => tag.toLowerCase());

    let blog_id =
      title
        .replace(/[^a-zA-Z0-9]/g, "")
        .replace(/\s+/g, "-")
        .substring(0, 20)
        .trim() + nanoid().substring(0, 10);

    let blog = new Blog({
      title,
      des,
      banner,
      content,
      blog_id,
      tags,
      author: authorID,
      draft: Boolean(draft),
    });

    let incVal = draft ? 0 : 1;

    blog = await blog.save();
    await User.findOneAndUpdate(
      { _id: authorID },
      {
        $inc: { "account_info.total_posts": incVal },
        $push: { blogs: blog._id },
      }
    );

    res.status(200).json({
      status: true,
      code: SUCCESS,
      payload: {
        id: blog_id,
        publishedAt: blog.publishedAt,
        updatedAt: blog.updatedAt,
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

export default createBlogController;
