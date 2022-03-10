const userValidator = (req, res, next) => {

    if (req.body.firstName == "" ){
        res.status(204).json({message: "Please enter your First name"})
    };
    if (req.body.lastName == "" ){
        res.status(204).json({message: "Please enter your Last name"})
    };
    if (req.body.email == ""){
        res.status(204).json({message: "Please enter your email"})
    };
    if (req.body.password == ""){
        res.status(204).json({message: "Please enter your password"})
    };

    next();
}

export {userValidator}