import expressAsyncHandler from "express-async-handler";
import { validationResult } from "express-validator";
import Blog from "../../Schema/Blog.js";
// import Blog from "../../Schema/Blog.js";

const SUCCESS = "LIKE_BLOG_SUCCESS";
const FAILURE = "LIKE_BLOG_FAILURE";

const likeBlogController = expressAsyncHandler(async (req, res) => {
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

  const authorID = req.userId;
  const { blog_id } = req.params;

  try {
    let blog = await Blog.findOne({ blog_id }).select("activity");

    if (!blog) throw new Error("Blog does not exist!");

    const isLiked = blog?.activity?.likedBy?.find(
      (e) => e.toString() === authorID.toString()
    );

    if (isLiked) {
      // If already liked
      blog = await Blog.findOneAndUpdate(
        { blog_id },
        {
          $pull: { "activity.likedBy": authorID },
          $inc: { "activity.total_likes": -1 },
        },
        {
          new: true,
        }
      );
    } else {
      //is not liked
      blog = await Blog.findOneAndUpdate(
        { blog_id },
        {
          $push: { "activity.likedBy": authorID },
          $inc: { "activity.total_likes": 1 },
        },
        {
          new: true,
        }
      );
      // console.log(blog);
    }

    return res.status(200).json({
      status: true,
      code: SUCCESS,
      payload: {
        id: blog_id,
        publishedAt: blog.publishedAt,
        updatedAt: blog.updatedAt,
      },
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

  //   const post = await Post.findById(postId);

  //   if (!post) throw new Error("Post does not exist!");

  //   const isLiked = post?.likedBy?.find((e) => e.toString() === id.toString());
});

export default likeBlogController;
