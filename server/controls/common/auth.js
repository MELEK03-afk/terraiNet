import bcrypt from "bcrypt"
import validator from "validator"
import User from "../../models/User.js"
import Request from "../../models/request.js"
import jwt from "jsonwebtoken"
import nodemaile from "nodemailer"
import Field from "../../models/Field.js";
import Reservation from "../../models/reservation.js"

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
        const exist2= await User.findOne({phoneNumber})
        if (exist2) {
            return res.status(400).json({ message: "Cette Number est déjà utilisée" });
        }
        const exist= await User.findOne({email})
        if (exist) {
            return res.status(400).json({ message: "Cette adresse e-mail est déjà utilisée" });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Wrong E-mail" });
        }
          
        if (!validator.isLength(password, { min: 5 })) {
            return res.status(400).json({ message: "Wrong Password (min 5 characters)" });
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
            phoneNumber: newuser.phoneNumber,
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
      if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Wrong E-mail" });
      }
      
      if (!validator.isLength(password, { min: 5 })) {
        return res.status(400).json({ message: "Wrong Password (min 5 characters)" });
      }
        const user = await User.findOne({ email })
        if (!user) {
          return res.status(400).json({ message: "Invalid email or password" });
          
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }


        if (isMatch && user) {
            return res.status(200).json({
              id : user._id,
              email :user.email,
              fullName : user.fullName,
              phoneNumber: user.phoneNumber,
              token : GenerateToken(user._id),
              role : user.role,
          })
        }
    } catch (error) {
      console.log(error)
       return res.status(500).json({ message: "Internal Server Error" });

    }
};

// export const sendrequest = async(req,res)=>{
//   const {fullName,fields,owner,phoneNumber,status,Numberofplayers}=req.bodyss  
//   try {
//       const newrequest= new Request({fullName,fields,owner,phoneNumber,status,Numberofplayers})
//       await newrequest.save()
//      return res.status(201).json({newrequest})
      
//   } catch (error) {
//       console.log(error)
//       return res.status(500).json({ message: "Internal Server Error" });
// }
// }

export const getDesponibleFields = async (req,res) => {
    try {
        const fields = await Field.find({})
        return res.status(200).json(fields)
    } catch (error) {
        return res.status(500).json({message : 'Cannot get fields'})
    }
}

export const UpdateProfile = async (req, res) => {
  const { email, fullName, phoneNumber } = req.body;
  const { id } = req.params;
  console.log(phoneNumber);
  console.log(email);
  console.log(fullName);
  try {
    const updateResult = await User.updateOne(
      { _id: id },
      { email, fullName, phoneNumber }
    );

    if (updateResult.modifiedCount !== 0) {
      const updatedUser = await User.findById(id);

      return res.status(200).json({
        id: updatedUser._id,
        email: updatedUser.email,
        fullName: updatedUser.fullName,
        phoneNumber: updatedUser.phoneNumber,
        token: GenerateToken(updatedUser._id),
        role: updatedUser.role,
      });
    } else {
      return res.status(400).json({ message: "Cannot update user" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getField = async (req, res) => {
  const { id } = req.params;
  try {
    const field = await Field.findById(id);
    if (!field) {
      return res.status(404).json({ message: "Field not found" });
    }
    return res.status(200).json({ field });
  } catch (error) {
    console.error("Error fetching field:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const SendRequest = async (req,res) => {
  const {fullName,phoneNumber,title,capacity,price,day,time,owner,user}=req.body
    try {
      const existingRequest = await Request.findOne({ day, time, title });

      if (existingRequest) {
        return res.status(400).json({ message: "This time slot is already reserved." });
      }
      const request = new Request({fullName,phoneNumber,title,capacity,price,day,time,owner,user})
      await request.save()
    return res.status(201).json({Message:"Request send"})
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });

  }
}
export const checktime = async (req,res) => {
  const {time,day,title}=req.body
  console.log(time,day,title)
    try {
      const existingRequest = await Request.findOne({ day, time, title });
      const existReservation = await Reservation.findOne({ day, time, title });
      if (existingRequest) {
        return res.status(200).json({ message: "This time slot is already reserved.",existingRequest });
      }
      if (existReservation) {
        return res.status(200).json({ message: "This time slot is already reserved.",existReservation });
      }
      else{
        return res.status(201).json({Message:"time Available",existingRequest})
      }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });

  }
}

function SendEmail(email){
        const transporter = nodemaile.createTransport({
            service: 'gmail',
            auth: {
              user: 'meleksaket2003@gmail.com',
              pass: 'ghqx emfa jzan lvrn'
            }
          });
          
          const mailOptions = {
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