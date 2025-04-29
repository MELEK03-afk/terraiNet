import Owner from "../../models/Owner.js";
import Field from "../../models/Field.js";
import Request from "../../models/request.js"
import User from "../../models/User.js";
import Reservation from "../../models/reservation.js";
// Fields Router

export const getFieldsOwner = async (req,res) => {
    const { id } = req.params
    console.log(id)
    console.log(req.user.role);
    if (req.user.role !== "Admin" && req.user.role !== "Owner") {
            return res.status(500).json({message : "You don't have access to do that"})
        }
    try {
        const fields = await Field.find({owner : id})
        return res.status(200).json(fields)
    } catch (error) {
        return res.status(500).json({message : 'Cannot get fields'})

    }
}
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


export const deleteRequest = async(req,res) => {
    if (req.user.role !== "Admin" && req.user.role !== "Owner") {
        return res.status(500).json({message : "You don't have access to do that"})
    }
    try {
        const {id} = req.params
        console.log(id)
        const deleteR= await Request.deleteOne({_id : id})
        return res.status(200).json({message:'Field deleted'})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : 'Cannot delete a new field'})
    }
}

export const AccepteRequest = async (req,res) =>{
    const {id} = req.params
    const {fullName,phoneNumber,title,capacity,price,day,time,owner,user}=req.body
    
    if (req.user.role !== "Admin" && req.user.role !== "Owner") {
        return res.status(500).json({message : "You don't have access to do that"})
    }
    try {
        const reservation = new Reservation({fullName,phoneNumber,title,capacity,price,day,time,owner,user})
        await reservation.save()
        const deleteR= await Request.deleteOne({_id : id})
        return res.status(200).json({message:'Reservation  successud'})
    } catch (error) {
        
    }
}

export const getRequest = async (req,res) => {
    const {id} = req.params
    console.log(id)

    if (req.user.role !== "Admin" && req.user.role !== "Owner") {
        return res.status(500).json({message : "You don't have access to do that"})
    }
    try {
        const requests = await Request.find({owner : id})
        return res.status(200).json(requests)
    } catch (error) {
        return res.status(500).json({message : 'Cannot get fields'})

    }
}

export const getReservation = async (req,res) => {
    const {id} = req.params
    console.log(id)

    if (req.user.role !== "Admin" && req.user.role !== "Owner") {
        return res.status(500).json({message : "You don't have access to do that"})
    }
    try {
        const reservation = await Reservation.find({owner : id})
        return res.status(200).json(reservation)
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

