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
    await BlogPost.save().then(BlogPost => res.status(201).json({message: "Data have been saved", BlogPost}))
  } catch (error) {
        res.status(500).send(`Error: ${error}`)
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
        res.status(500).send(`Error: ${error}`)
    }
  };


// Delete a single comment on a particular blog


export { createComment, getAllComment };
