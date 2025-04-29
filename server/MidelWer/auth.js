import jwt from "jsonwebtoken"
import User from "../models/User.js"


export const protect = async (req , res ,next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1]
            console.log(token);
            
            const decoded = jwt.verify(token , process.env.JWT_secret)
            console.log(decoded);
            
            req.user = await User.findById(decoded.id).select('-password')
            console.log(req.user);
            
            next()
        } catch (error) {
            console.log(error)
            return res.status(400).json({message : 'Please login to access to this route' , error})
        }
    }

    if(!token){
        return res.status(401).json({message : 'No authorized to access this route'})
    }
}
