const contactValidator = (req, res, next) => {
    let {email, subject, message} = req.body;

    if (email == "") {
      return res.status(204).json({
        error: "Email is required",
      });
    }

    if (subject == "") {
      return res.status(204).json({
        error: "Subject is Required",
      });
    }

    if (message == "") {
        return res.status(204).json({
          error: "Message is Required",
        });
    }

    if (!email.includes("@") || !email.includes(".")) {
      return res.status(400).json({
        error: "The email is Incomplete",
      });
    }

    const atpos = email.indexOf("@");          
    const dotpos = email.lastIndexOf(".");
    if (atpos < 1 || dotpos - atpos < 2) {
      return res.status(400).json({
        error: "The email is Incomplete",
      });
    }

    next();  
}

export default contactValidator;