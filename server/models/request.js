import mongoose from "mongoose";

const requestSchema=mongoose.Schema(    {
    fullName:{type : mongoose.Schema.Types.ObjectId , ref :'User'},
    phoneNumber:{type:Number},
    fields:{type : mongoose.Schema.Types.ObjectId , ref :'Field'},
    owner : {type : mongoose.Schema.Types.ObjectId , ref :'Owner'},
    status :{type:String ,enum:['canceled ',"accepted","pending"],default:'pending'} ,
    Numberofplayers:{type:Number}
},
{timestamps:true})
export default mongoose.model('Request',requestSchema)