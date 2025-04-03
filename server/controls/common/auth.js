import bcrypt from "bcrypt"
import validator from "validator"
import User from "../../models/User.js"
import Request from "../../models/request.js"
import jwt from "jsonwebtoken"
import nodemaile from "nodemailer"
import Field from "../../models/Field.js";

export const singUp = async(req,res)=>{
    
    const {fullName,email,password,phoneNumber}=req.body
    console.log(fullName);
    console.log(email);
    console.log(password);
    console.log(phoneNumber);
    
    try {

        if(!fullName || !email || !password ){
            return res.status(400).json({Message:"All files are required"})
        }
        const exist= await User.findOne({email})
        if (exist) {
            return res.status(202).json({ message: "Cette adresse e-mail est déjà utilisée" });
          }
          
        const exist2= await User.findOne({phoneNumber})
        if (exist2) {
            return res.status(203).json({ message: "Cette Number est déjà utilisée" });
          }
          
        if (!validator.isEmail(email)) {
            return res.status(200).json({ message: "Wrong E-mail" });
        }
          
        if (!validator.isLength(password, { min: 5 })) {
            return res.status(200).json({ message: "Wrong Password (min 5 characters)" });
        }
        const HashedPassword= await bcrypt.hash(password,10)
        const newuser= new User({fullName,email,password:HashedPassword,phoneNumber})
        await newuser.save()
        SendEmail(email)
        console.log(GenerateToken(newuser._id));
       return res.status(201).json({
            id : newuser._id,
            email :newuser.email,
            fullName : newuser.fullName,
            token : GenerateToken(newuser._id),
            role : 'User',
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" });
}


}

export const singIn = async (req, res) => {
    const {email , password} = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) {
          return res.status(201).json({ message: "Invalid email or password" });
          
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(201).json({ message: "Invalid email or password" });
        }
        if (isMatch && user) {
            return res.status(200).json({
              id : user._id,
              email :user.email,
              fullName : user.fullName,
              token : GenerateToken(user._id),
              role : user.role,
          })
        }
    } catch (error) {
        console.log(error)
       return res.status(500).json({ message: "Internal Server Error" });

    }
};

export const sendrequest = async(req,res)=>{
  const {fullName,fields,owner,phoneNumber,status,Numberofplayers}=req.bodyss  
  try {
      const newrequest= new Request({fullName,fields,owner,phoneNumber,status,Numberofplayers})
      await newrequest.save()
     return res.status(201).json({newrequest})
      
  } catch (error) {
      console.log(error)
      return res.status(500).json({ message: "Internal Server Error" });
}
}

export const getDesponibleFields = async (req,res) => {
    try {
        const fields = await Field.find({})
        return res.status(200).json(fields)
    } catch (error) {
        return res.status(500).json({message : 'Cannot get fields'})
    }
}

function SendEmail(email){

        var transporter = nodemaile.createTransport({
            service: 'gmail',
            auth: {
              user: 'meleksaket2003@gmail.com',
              pass: 'ghqx emfa jzan lvrn'
            }
          });
          
          var mailOptions = {
            from: 'meleksaket2003@gmail.com',
            to: `${email}`,
            subject: 'Sending Email using Node.js',
            text: 'welecom to ower site web'
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
      return email
}

const GenerateToken =(id)=>{
    return jwt.sign({id},process.env.JWT_secret,{expiresIn:"15d"})
}