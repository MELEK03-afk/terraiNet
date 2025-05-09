import React,{useEffect} from 'react'
import { IoHomeSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';
import BackChange from './BackChange';
function HeadAdmin({activeStep,setActiveStep}) {
  const user = JSON.parse(localStorage.getItem('user'))

  return (
    <div>
        <div className='HeadAdmin'>
            <h1>Sports Terrain Manager </h1>
            <div className='access'>
                <Link to='/AllFields' className='OwnerLink'>Fields</Link>
                {user.role === "Owner" ?(
                  <Link to='/Requests' className='OwnerLink'>Requests</Link>
                ):(
                  ''
                )
                  
                }
                <Link to='/ReservationManagment' className='OwnerLink'>Reservation</Link>
                {user.role === "Admin" ?(
                  <Link to='/MangementU' className='OwnerLink'>Users</Link>
                ):(
                  ''
                )
                  
                }
                <Link to='/AddTerrains' onClick={() => setActiveStep(3)}  style={{  backgroundColor: activeStep === 3 ? 'white' : 'transparent', color: activeStep === 3 ? "black" : "", padding: activeStep === 3 ? "6px 30px" : "black", borderRadius: activeStep === 3 ? "20px" : "black"  }}  className='OwnerLink'>Add terrain</Link>
            </div>  
            <div className='icons'>
                <Link to='/'><IoHomeSharp onClick={() => setActiveStep(0)} style={{fontSize:"large",marginLeft:"20px",color:"white",cursor:"pointer"}}/></Link>
            </div>
        </div>
    </div>
  )
}

export default HeadAdmin