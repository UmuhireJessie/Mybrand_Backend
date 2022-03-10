const blogValidator = (req, res, next) => {

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
    
    next();

}

export default blogValidator;