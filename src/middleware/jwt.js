import  jwt  from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config()

const secret = process.env.JWT_SECRET;
const signToken = (payload) => {
    try {
        return jwt.sign(payload, secret, {expiresIn: "1d"})
    } catch (error) {
        res.status(500).json({Error: "Internal server error "})
        
    }
    
}


export { signToken };
