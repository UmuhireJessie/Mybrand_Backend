import blogSchema from "../model/blogschema.js";
import commentSchema from "../model/commentschema.js";
import { fileUpload } from "../middleware/multer.js";
import userSchema from "../model/userschema.js";
import slug from "slug";

// create and save new blog
const createBlog = async (req, res) => {
  // validate a request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // new blog
  try {
    const { title, blogdescription, detail } = req.body;
    if (await blogSchema.findOne({ slug: slug(title) }))
      res.status(400).json({
        error: `This Blog with ${title} exists`,
      });
    else {
      const user = await userSchema.findById(req.user.userId);
      req.body.blogimage = await fileUpload(req);
      const blogs = await blogSchema.create({
        title: title,
        blogdescription: blogdescription,
        blogimage: req.body.blogimage,
        detail: detail,
        slug: slug(title),
        author: user.firstName,
      });
      res.status(201).json({
        message: "Blog Has been saved successfully",
        data: blogs,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: `Internal ${error}`,
    });
  }
};

// find and retrieve all blogs
const findAllBlog = async (req, res) => {
  const blog = await blogSchema
    .find({}).sort({
      date: -1,
    })
    .then((blog) => {
      res.json({ allBlogs: blog, count: blog.length });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Error occurred while retrieving blog information",
      });
    });
};

// find and retrieve one blog
const findOneBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await blogSchema.findById(blogId);

    if (!blog)
      return res.status(404).json({ error: `blog with ${blogId} does not exists` });
    res.status(200).json({ blog });
  } catch (error) {
    res.status(500).json({
      error: "Internal server error"
    });
  }
  
};

// Update the information and the image on the blog
const updateBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    if (!(await blogSchema.findById(blogId)))
      return res
        .status(404)
        .json({ error: `Blog with id: ${blogId} does not exists` });
    req.body.blogimage = await fileUpload(req);
    const blogUpdate = await blogSchema.findByIdAndUpdate(blogId, req.body);
    res.status(201).json({
      message: "Blog has been update successfully!",
      data: blogUpdate,
    });
  } catch (error) {
    res.status(500).json({
      error: `Internal server error: ${error}`,
    });
  }
};

// Update blog information with out image
const updateNoImg = async (req, res) => {
  try {
    const blogId = req.params.id;
    if (!(await blogSchema.findById(blogId)))
      return res
        .status(404)
        .json({ error: `Blog with id: ${blogId} does not exists` });
    const updateBlog = await blogSchema.findByIdAndUpdate(blogId, req.body);
    res.status(201).json({
      message: "Blog has been updated successfully!",
      data: updateBlog,
    });
  } catch (error) {
    res.status(500).json({
      error: `Internal Server error: ${error}`,
    });
  }
};

// Delete a blog
const deleteBlog = async (req, res) => {
  try {
    const blog = await blogSchema.findById(req.params.id);
    if (blog) {
      const deleteBlog = await blogSchema.findByIdAndDelete(req.params.id);
      const commentDel = await commentSchema.deleteMany({
        blogId: req.params.id,
      });
      res.status(200).json({ message: "The blog has been deleted" });
    }
    res.status(404).json({ Error: "Invalid blog id" });
  } catch (error) {
    res.status(500).json({ message: `Error has occurred: ${error}` });
  }
};

export {
  createBlog,
  findAllBlog,
  findOneBlog,
  updateBlog,
  updateNoImg,
  deleteBlog,
};
