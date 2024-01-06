import expressAsyncHandler from "express-async-handler";
import { validationResult } from "express-validator";
import Blog from "../../Schema/Blog.js";
// import User from "../../Schema/User.js";
// import { nanoid } from "nanoid";

const SUCCESS = "UPDATE_BLOG_SUCCESS";
const FAILURE = "UPDATE_BLOG_FAILURE";

const updateBlogController = expressAsyncHandler(async (req, res) => {
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
    const authorID = req.userId;

    let { tags, des, banner, content, title, blog_id } = req.body;

    const user = await Blog.findOne({ blog_id }).select("author -_id");

    if (!user) {
      return res.status(403).json({
        status: false,
        code: FAILURE,
        payload: {
          error: "Blog id isn't valid",
        },
      });
    }

    if (authorID !== user?.author.toString()) {
      return res.status(401).json({
        status: false,
        code: FAILURE,
        payload: {
          error: "Unauthorized to update",
        },
      });
    }

    tags = tags.map((tag) => tag.toLowerCase());

    let data = {
      title,
      des,
      banner,
      content,
      tags,
    };

    const blog = await Blog.findOneAndUpdate({ blog_id }, data);

    return res.status(200).json({
      status: true,
      code: SUCCESS,
      payload: {
        id: blog_id,
        publishedAt: blog.publishedAt,
        updatedAt: blog.updatedAt,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      code: FAILURE,
      payload: {
        error: error.message,
      },
    });
  }
});

export default updateBlogController;
