import Owner from "../../models/Owner.js";
import Field from "../../models/Field.js";
import Request from "../../models/request.js"
import User from "../../models/User.js";
// Fields Router

export const getFieldsOwner = async (req,res) => {
    const userId = req.user._id
    console.log(req.user.role);
if (req.user.role !== "Admin" && req.user.role !== "Owner") {
        return res.status(500).json({message : "You don't have access to do that"})
    }
    try {
        const fields = await Field.find({owner : userId})
        return res.status(200).json(fields)
    } catch (error) {
        return res.status(500).json({message : 'Cannot get fields'})

    }
}
export const addField = async (req,res) => {
    const {title,description,capacity,city,address,price,images,status,type} = req.body
    // if (req.user.role !== "Admin" && req.user.role !== "Owner") {
    //         return res.status(500).json({message : "You don't have access to do that"})
    // }
        try {
            if(!title || !price) {
                return res.status(400).json({message : 'Fields required'})
            }

        const field = new Field({title,description,capacity,city,address,price,images,status,type})
        await field.save()
        return res.status(201).json({ message : 'Field Created successfully'  ,field})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : 'Cannot add a new field'})

    }
}
export const updateField = async (req,res) => {
    const { title,description,capacity,city,address,price,images,status,type } = req.body
    const { id }= req.params
if (req.user.role !== "Admin" && req.user.role !== "Owner") {
        return res.status(500).json({message : "You don't have access to do that"})
    }
    try {
        const newFields= await Field.updateOne({_id:id} , {title,description,capacity,city,address,price,images,status,type})
       
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
        const deleteF= await Field.deleteOne({_id : id})
        return res.status(200).json({message:'Field deleted'})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : 'Cannot delete a new field'})
    }
}

export const getAllFields = async (req,res) => {
    const userId = req.user._id
    // console.log(req);
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


export const getRequest = async (req,res) => {
    const ownerId = req.user._id
if (req.user.role !== "Admin" && req.user.role !== "Owner") {
        return res.status(500).json({message : "You don't have access to do that"})
    }
    try {
        const requests = await Request.find({owner : ownerId})
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