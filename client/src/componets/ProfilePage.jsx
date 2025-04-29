import React, { useEffect,useState } from 'react'
import photo from '../images/cr7.jpeg'
import { Pencil,Mail,Phone  } from 'lucide-react';
import axios from 'axios';
import toast, { Toaster, } from 'react-hot-toast';
import {Link,useNavigate} from "react-router-dom"

function ProfilePage() {
  const [Statu,setStatu]=useState(true)
  const[fullName,setFullName]=useState('')
  const[email,setEmail]=useState('')
  const[phoneNumber,setPhoneNumber]=useState('')
  const[password,setPassword]=useState('')
  const user=JSON.parse(localStorage.getItem('user'))


  const updateProfile = async (id) => {
    if (!id) {
      toast.error("Invalid user ID");
      return;
    }
  
    try {
      const res = await axios.put(`http://localhost:2024/api/UpdateUser/${id}`, {
        email,
        phoneNumber,
        fullName,
      });
  
      if (res.status === 200) {
        toast.success("Profile updated successfully");
        setStatu(true)
        localStorage.removeItem("user");
        localStorage.setItem("user", JSON.stringify(res.data));
        } 
  
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Server error occurred");
    }
  };
  

  const displayFrom=()=>{
    if (Statu === true) {
      return(
        <div className='dsp' >
          <Pencil className='iconProfile' 
           onClick={() => {
            setStatu(false)
            setEmail(user.email);
            setFullName(user.fullName);
            setPhoneNumber(user.phoneNumber)
            // setUpdateAddress(field.address);
            
          }}
          size={15}/>
          <h3>Donner Perssonnel</h3>
          <h4>Name    :</h4>
          <h5>{user.fullName}</h5>
          <h4>Email    :</h4>
          <h5><span style={{marginRight:"5%",marginTop:"2%"}}> <Mail size={20} /></span >  {user.email}</h5>
          <h4>phoneNumber    :</h4>
          <h5><span style={{marginRight:"5%",marginTop:"2%"}}> <Phone size={20} /></span >  {user.phoneNumber}</h5>
        </div>
      )
    }
    else{
      return(
          <div style={{width:'100%'}}>
            <h3>Donner Perssonnel</h3>
            <h4>Name    :</h4>
            <input type="text" value={fullName} onChange={(e)=>setFullName(e.target.value)}/>
            <h4>Email    :</h4>
            <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <h4>phoneNumber    :</h4>
            <input type="text" onChange={(e)=>setPhoneNumber(e.target.value)} value={phoneNumber}/>
            
            <div style={{display:"flex",marginTop:"19%"}}>
              <button className='btProfile' style={{backgroundColor:"#BD1717"}}  onClick={()=>setStatu(true)}>Cancel</button>
              <button className='btProfile' style={{backgroundColor:"#11D677"}} onClick={()=>updateProfile(user.id)}>update</button>
            </div>
          </div>
      )
    }
  }
  return (
    <div className='PofileComp'>
        <div className='GideProfile'>
          <Toaster/>
          {displayFrom()}
        </div>
        <div className='donnerProfile'>
          <div className='dp-1'>
              <img src={photo} alt="" />
            <div className='dp-1-donner'>
              <h2>{user.fullName}</h2>
              <h3>Sports lover • Active since 2023</h3>
            </div>
          </div>
          <div className="dp-2">
            <h1>Recent Match</h1>
          </div>
        </div>
    </div>
  )
}

export default ProfilePage