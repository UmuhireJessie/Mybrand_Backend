import blogSchema from "../model/blogschema.js";
import commentSchema from "../model/commentschema.js"

// create and save new blog
const createBlog = async(req, res) => {

    // validate a request 
    if (!req.body){
        res.status(400).send({message:"Content can not be empty!"});
        return;
    }

    // new blog
    const blog = new blogSchema({
        title: req.body.title,
        blogdescription: req.body.blogdescription,
        blogimage: req.body.blogimage,
        detail: req.body.detail,
        date: Date.now()
    });

    // save blog in the database
    await blog
        .save(blog)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating a create operation"
            }); 
        });
};

// find and retrieve all blogs
const findAllBlog = async(req, res) => {
    const blog = await blogSchema.find({})
    .then(blog => {
        res.json({allBlogs: blog, count: blog.length})
        
    })
    .catch(err => {
        res.status(500).send({message:err.message ||"Error occurred while retrieving blog information"})
    })

}

// find and retrieve one blog
const findOneBlog = async (req, res) => {
    const blog = await blogSchema.findById(req.params.id)
    .then(blog => {
        res.send(blog)
    });
}

// Update the information on the blog
const updateBlog = async (req, res) => {
    try {
        const blog = await blogSchema.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).send("Information has been updated");
    } 
    catch (error) {
        res.status(500).send(`Error has occurred: ${error}`)
        
    }    
}

// Delete a blog
const deleteBlog = async (req, res) => {
    try {
        const deleteBlog = await blogSchema.findByIdAndDelete(req.params.id)
        const commentDel = await commentSchema.deleteMany({ blogId: blogId });
        res.status(200).json({message: "The blog has been deleted"});
    } catch (error) {
        res.status(500).json({message: `Error has occurred: ${error}`})
    }
    
}

export {
    createBlog, findAllBlog, findOneBlog, updateBlog, deleteBlog
}

