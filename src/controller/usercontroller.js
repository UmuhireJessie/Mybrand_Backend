import userSchema from "../model/userschema.js";
import bcrypt from "bcrypt";
import {signToken} from "../middleware/jwt.js"


// create a new user
const addnewUser = async(req, res) => {
    try {
        const email = req.body.email 
        const userExist = await userSchema.find({email: email})

        if (userExist.length) {
            res.status(403).json({Message: `User with email: ${email} exists`})
        } 
        else{
            const {
                firstName, lastName, email, password, comfirmPassword
            } = req.body
            const hashPassword = bcrypt.hashSync(password, 10)

            const addUser = await userSchema.create({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hashPassword,
                role: req.body.role
            })
            res.status(201).json({messsge: "Successfull registered", addUser})
        }
    } catch (error) {
        res.status(500).json({Message: `Error: ${error}`})
    }
}

// get all users
const getAllUser = async (req, res) => {
    const users = await userSchema.find()
    .then(users => {
        res.json({allUsers: users, count: users.length})
        
    })
    .catch(err => {
        res.status(500).send({message:err.message ||"Error occurred while retrieving blog information"})
    })

}

// get one user
const getOneUser = async (req, res) => {
    const user = await userSchema.findById(req.params.id)
    .then(user => {
        res.send(user)
    });
}

// delete a user
const deteleUser = async(req, res) => {
    try {
        const user = await userSchema.findByIdAndDelete(req.params.id)
        res.status(200).json({message: `The user with email: ${req.params.email} has been deleted`});
    } catch (error) {
        res.status(500).json({message: `Error has occurred: ${error}`})
    }
}

// update user
const updateUser = async (req, res) => {
    try {
        const user = await userSchema.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).send("Information has been updated");
    } 
    catch (error) {
        res.status(500).send(`Error has occurred: ${error}`)
        
    }    
}

// Authenticate user
const loginUser = async (req, res) => {
    
    try {
        let { email, password } = req.body;
        const userFound = await userSchema.findOne({ email: email });
        if (userFound) {
        bcrypt.compare(password, userFound.password, function (error, user) {
            if (error) {
            console.log(error);
            res.json({
                message: "incorrect password",
            });
            }
            if (user) {
                const token = signToken({
                    userId: userFound.id,
                    role: userFound.role,
                    firstName: userFound.firstName})

                res.status(201).json({
                    message: `welcome ${userFound.firstName}`, token
            });
            } else {
            res.status(403).json({
                error: "Incorrect Password",
            });
            }
        });
        } else {
        res.status(404).json({
            error: "User not Found",
        });
        }
    } catch (error) {
        res.status(500).send(`Error has occurred: ${error}`)
    }
      };

// Logout user

const logout = async (req, res) => {
  let token = req.headers.authorization.split(" ")[1];
  try {
    let randomNumberToAppend = toString(Math.floor(Math.random() * 1000 + 1));

    let hashedRandomNumberToAppend = await bcrypt.hash(
      randomNumberToAppend,
      10
    );

    token = token + hashedRandomNumberToAppend;
    return res.status(200).json("logout");
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

export {
    addnewUser, getAllUser, getOneUser, deteleUser, updateUser, loginUser, logout
}