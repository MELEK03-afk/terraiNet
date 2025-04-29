import Owner from "../../models/Owner.js";
import Field from "../../models/Field.js";
import nodemaile from "nodemailer"
import Request from "../../models/request.js"
import User from "../../models/User.js";
// Fields Router


export const addField = async (req,res) => {
    const {title,description,capacity,city,address,price,images,status,type,owner} = req.body
    console.log(owner)
    if (req.user.role !== "Admin" && req.user.role !== "Owner") {
            return res.status(500).json({message : "You don't have access to do that"})
    }
        try {
            if(!title || !price) {
                return res.status(400).json({message : 'Fields required'})
            }

        const field = new Field({title,description,capacity,city,address,price,images,status,type,owner})
        await field.save()
        return res.status(201).json({ message : 'Field Created successfully'  ,field})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : 'Cannot add a new field'})

    }
}
export const updateField = async (req,res) => {
    const { title,capacity,city,address,price,status,type } = req.body
    const { id }= req.params
    console.log(req.user)
    if (req.user.role !== "Admin" && req.user.role !== "Owner") {
        return res.status(500).json({message : "You don't have access to do that"})
    }
    try {
        const newFields= await Field.updateOne({_id:id} , {title,capacity,city,address,price,status,type })
       
        if(newFields.modifiedCount !== 0) {
            return res.status(200).json({ message : 'Field Updated successfully'  ,newFields})

        }else {
            return res.status(400).json({ message : 'Cannot Update Field'})

        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : 'Cannot update a new field'})
    }
}
export const deleteField = async (req,res) => {
    if (req.user.role !== "Admin" && req.user.role !== "Owner") {
            return res.status(500).json({message : "You don't have access to do that"})
        }
    try {
        const {id} = req.params
        console.log(id)
        const deleteF= await Field.deleteOne({_id : id})
        return res.status(200).json({message:'Field deleted'})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : 'Cannot delete a new field'})
    }
}

export const getAllFields = async (req,res) => {
    
    
if (req.user.role !== "Admin" && req.user.role !== "Owner") {
        return res.status(500).json({message : "You don't have access to do that"})
    }
    try {
        const fields = await Field.find({})
        return res.status(200).json(fields)
    } catch (error) {
        return res.status(500).json({message : 'Cannot get fields'})

    }
}


export const getAllRequest = async (req,res) => {
    if (req.user.role !== "Admin" && req.user.role !== "Owner") {
        return res.status(500).json({message : "You don't have access to do that"})
    }
    try {
        const requests = await Request.find({})
        return res.status(200).json(requests)
    } catch (error) {
        return res.status(500).json({message : 'Cannot get fields'})

    }
}


export const updateRequest = async (req,res) => {
    const { id }= req.params
    const {status} = req.body
if (req.user.role !== "Admin" && req.user.role !== "Owner") {
        return res.status(500).json({message : "You don't have access to do that"})
    }
    try {
        const newFields= await Field.updateOne({_id:id} , {status})
       
        if(newFields.modifiedCount !== 0) {
            return res.status(200).json({ message : 'Field Updated successfully'  ,newFields})

        }else {
            return res.status(400).json({ message : 'Cannot Update Field'})

        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : 'Cannot update a new field'})
    }
}

// User Router

export const getUser = async(req,res)=>{
    if (req.user.role !== "Admin") {
        return res.status(500).json({message : "You don't have access to do that"})
    }
    try {
        const users= await User.find()
        console.log(users)
        return res.status(200).json(users)
    } catch (error) {
        console.log(error);
        return res.status(404).json({Message:"Internal server error",error})
    }
}

export const deleteuser = async (req , res) => {
    if (req.user.role !== "Admin" ) {
        return res.status(500).json({message : "You don't have access to do that"})
    }
    const { id } = req.params
    try {
        const user = await User.findById(id)
        await user.deleteOne({_id : id})
        return res.status(200).json({message : 'User deleted'})
    } catch (error) {
        console.log(error)
        res.status(500).json({message : 'Internal server error'})
    }
}
export const UpdateUSer = async(req,res) =>{
    if (req.user.role !== "Admin") {
        return res.status(500).json({message : "You don't have access to do that"})
    }
    const {id}=req.params
    const {role}=req.body
    console.log(role)
    try {
        await User.updateOne({ _id: id }, { $set: { role } });
        res.status(200).json({Message:"Updatet"})
    } catch (error) {
        console.log(error)
    }

}

export const contactMessage = async(req,res)=>{
    const{Message,phoneNumber,Name,email}=req.body
    try {
        SendEmail(Message,phoneNumber,Name,email)
    } catch (error) {
        console.log(error);
        
    }
}


function SendEmail(message,Number,Name,email){
        const transporter = nodemaile.createTransport({
            service: 'gmail',
            auth: {
              user: 'meleksaket2003@gmail.com',
              pass: 'ghqx emfa jzan lvrn'
            }
          });
          
          const mailOptions = {
            from: `${email}`,
            to: 'meleksaket2003@gmail.com',
            subject: 'Sending Email using Node.js',
            text: `Hi i'm ${Name} my phoneNumber is ${Number} my message is ${message}`
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