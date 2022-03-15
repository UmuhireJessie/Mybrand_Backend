import blogSchema from "../model/blogschema.js";

const blogValidator = async(req, res, next) => {

    if (req.body.title == "" ){
        res.status(204).json({message: "Please enter the title of the blog"})
    };
    if (req.body.blogdescription == ""){
        res.status(204).json({message: "Please enter the blogdescription of the blog"})
    };
    if (req.body.detail == ""){
        res.status(204).json({message: "Please enter the detail of the blog"})
    };
    if (req.body.blogimage == ""){
        res.status(204).json({message: "Please input the image of the blog"})
    };

    const title = req.body.title
    const blogExist = await blogSchema.find({title: title})
    if (blogExist.length) {
        res.status(403).json({Message: `Blog with title: "${title}" exists`})
    } 
    
    next();

}

export default blogValidator;