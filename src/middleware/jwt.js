import  jwt  from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config()

const secret = process.env.JWT_SECRET;
const signToken = (payload) => {
    return jwt.sign(payload, secret, {expiresIn: 60*60})
}


export { signToken };
