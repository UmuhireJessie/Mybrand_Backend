import commentSchema from "../model/commentschema.js";
import blogSchema from "../model/blogschema.js";

// create and save new comment
const createComment = async (req, res) => {
  // save comment in the database

  try {
    const blogId = req.params.id;
    const NewComment = await commentSchema.create({
      name: req.body.name,
      email: req.body.email,
      comment: req.body.comment,
      blogId: blogId,
    });

    const BlogPost = await blogSchema.findById(blogId);
    BlogPost.comments.push(NewComment);
    await BlogPost.save().then((BlogPost) =>
      res.status(201).json({ message: "Your comment have been sent", BlogPost })
    );
  } catch (error) {
    res.status(500).send(`Error: ${error}`);
  }
};

// Get all comments
const getAllComment = async (req, res) => {
  try {
    const BlogId = req.params.id;
    const getComment = await blogSchema.findById(BlogId).populate("comments");
    res.status(200).json({
      message: "All Comments",
      Comment: getComment.comments,
    });
  } catch (error) {
    res.status(500).json({
      Error: "Internal server error",
    });
  }
};

// Delete a single comment on a particular blog
const deleteComment = async (req, res) => {
  const blogId = req.params.blogId;
  const commentId = req.params.commentId;
  try {
    const deleteComment = await commentSchema.findById(commentId);
    if (deleteComment) {
      const dele = await commentSchema.findByIdAndDelete(commentId);
      const blog = await blogSchema.findById(blogId);
      blog.comments.remove(commentId);
      await blog.save();
      res.status(200).json({
        message: "Successfully deleted the comment",
      });
    } else {
      res.status(400).json({
        error: `No comment found with this id ${commentId}`,
      });
    }
  } catch (error) {
    res.status(404).json({
      error: "No comment found",
    });
  }
};

export { createComment, getAllComment, deleteComment };
