import React,{useState} from 'react'
import HeadAdmin from './HeadAdmin.jsx'
import toast, { Toaster, } from 'react-hot-toast';

import axios from 'axios'
function AddTerrains() {
  const [title,setTitle]=useState('')
  const [city,setCity]=useState('')
  const [status,setStatu]=useState('')
  const [address,setAddress]=useState('')
  const [type,setType]=useState('')
  const [capacity,setCapacity]=useState('')
  const [price,setPrice]=useState('')
  const user = JSON.parse(localStorage.getItem('user'));
  
  const AddTerrains= async()=>{
    console.log(title);
    console.log(city);
    console.log(status);
    console.log(address);
    console.log(type);
    console.log(capacity);
    console.log(price);
    console.log(user);
    
    try {
      const res= await axios.post('http://localhost:2024/api/Owner/add-field',{
        title,
        city,
        status,
        address,
        type,
        capacity,
        price,
        owner : user.id
      },
      {
        headers : {
          Authorization : `Bearer ${user.token}`
        }
      }
    
    )
      if(res.status === 201){
        toast.success("Terrain created ")
      }
         } catch (error) {
          console.log(error);
          
    }
  }
  return (
    <div>
      <HeadAdmin/>
      <div className='addTerrains'>
        <Toaster/>
        <h1>Sports Terrain Manager</h1>
        <h4>Add and manage football or padel terrains</h4>
        <div className='gid'>
            <div className='gid1'></div>
            <div className='gid2'></div>
        </div>
        <div className='contenaire'>
          <div className='imagesadd'></div>
          <div className='donnerAdd'>
          <h4 style={{textAlign:'center',position:"relative",top:"2%",margin:"0"}}>Add  football or padel terrains</h4>
          <div style={{marginTop:'10%'}}>
                <div className='form1'>
                  <div>
                    <h4>title</h4>
                    <input type="text" onChange={(e)=>setTitle(e.target.value)}  name="" placeholder="title" />
                  </div>
                  <div>
                    <h4>city</h4>
                    <input type="text" onChange={(e)=>setCity(e.target.value)} name="" placeholder="city" />
                  </div>
                </div>
                <div className='form1'>
                  <div>
                    <h4>Adress</h4>
                    <input type="text" onChange={(e)=>setAddress(e.target.value)} name="" placeholder="Address" />
                  </div>               
                </div>
                <div className='form1'>
                  <select name="Status" onChange={(e)=>setStatu(e.target.value)} placeholder="">
                    <option value="" >Status</option>
                    <option value="Available">Availebal</option>
                    <option value="Not Available">Not Availebal</option>
                  </select>
                </div>
                <div className='form1'>
                  <div>
                    <h4>capacity</h4>
                    <input type="number" onChange={(e)=>setCapacity(e.target.value)} name="" placeholder="capacity" />
                  </div>
                  <div>
                    <h4>price</h4>
                    <input type="number" onChange={(e)=>setPrice(e.target.value)} name="" placeholder="Price" />
                  </div>
                </div>
                <div className='form1'>
                  <select name="type" onChange={(e)=>setType(e.target.value)} placeholder="">
                    <option value="" >type</option>
                    <option value="football">Football</option>
                    <option value="padel">padel</option>
                  </select>
                </div>
                <button className='add' onClick={AddTerrains}>add</button>
          </div>
          </div>


        </div>
      </div>
    </div>
  )
}

export default AddTerrains