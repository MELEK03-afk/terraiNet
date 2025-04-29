import React, { useEffect,useState } from 'react'
import { FaUser } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { UserRound,House,Menu  } from 'lucide-react';
import { X } from 'lucide-react';
import {Link,useNavigate} from "react-router-dom"

function HeadBar({activeStep,setActiveStep}) {
  const user = JSON.parse(localStorage.getItem('user'))
  const [showRow, setShowRow] = useState(false);
  const [showP, setShowp] = useState(false);
  const navigate=useNavigate()

  const LogOut=()=>{
    localStorage.removeItem("user");
    navigate('/')
    window.location.reload()
  }

useEffect(() => {  ; // Ensure the step is set on page load
}, );



  return (
      <div>
        <div className='headbar'>
          <h1>Kick<span style={{color:"#00E6AD"}}>Off</span> </h1>
          <div className='choose'>
            <Link to='/TerrainsFootball' onClick={() => (setActiveStep(1),setShowp(false))}  style={{  backgroundColor: activeStep === 1 ? 'transparent' : 'transparent', color: activeStep === 1 ? "white" : "#D6D6D6", padding: activeStep === 1 ? "6px 30px" : "black", borderRadius: activeStep === 1 ? "0" : "0" , borderBottom: activeStep === 1 ? " 3px solid white" : "0"  }} className='ftpd'>Foot</Link>
            <Link to='/TerrainsPadel' onClick={() => (setActiveStep(2),setShowp(false))} style={{  backgroundColor: activeStep === 2 ? 'transparent' : 'transparent', color: activeStep === 2 ? "white" : "#D6D6D6", padding: activeStep === 2 ? "6px 30px" : "black", borderRadius: activeStep === 2 ? "0" : "0" , borderBottom: activeStep === 2 ? " 3px solid white" : "0"  }} className='ftpd'>Padel</Link>
          </div>
          {
            showP &&(
              <>
              <div className='accessProfile'>
                <div style={{width:"100%"}}>
                  <X size={19} style={{marginLeft:"80%",color:"white",marginTop:"2%",cursor:"pointer"}} onClick={()=>setShowp(!showP)}/>
                </div>
                <Link className='LinkProfile' to='/Profile' onClick={()=> (setActiveStep(0),setShowp(!showP))}>Profile</Link>
                <Link className='LinkProfile' to='/Profile' onClick={()=> (setActiveStep(0),setShowp(!showP),LogOut())}>Log out</Link>
              </div>
              </>
            )
          }
            <div className='icons'>
              <Link to='/'><House  onClick={() => (setActiveStep(0),setShowp(false))} style={{fontSize:"large",marginLeft:"20px",color:"white",cursor:"pointer"}}/></Link>
              {user ?(  
              <UserRound onClick={()=>setShowp(!showP)} style={{fontSize:"large",marginLeft:"20px",color:"white",cursor:"pointer"}}  />
              ):(
                <Link to='/signUp' onClick={() => (setActiveStep(0))} > <button className='btsignup'>SignUp</button></Link>
              )}
              {
                user?.role === 'Admin' || user?.role === 'Owner'  ?(
                  <Menu style={{fontSize:"xx-large",marginLeft:"10px",color:"white",cursor:"pointer"}} onClick={()=>(setShowRow(true),setShowp(false))} />
                ):(
                  ""
                )
              }
            </div>
          </div>
          {showRow && (
            <>
              {/* Overlay to prevent clicks on other parts of the page */}
              <div className="overlay" onClick={() => setShowRow(false)}></div>

              <div className="adminlinks">
                <IoIosClose onClick={() => setShowRow(false)} size={25} className="iconnav"/>
                <h1 >
                  {user?.role === 'Admin' ? 'Admin Access' : 'Owner Access'}
                </h1>                
                <Link
                  to={user?.role === 'Admin' ? '/Admin' : '/Admin'}
                  onClick={() => {
                    setShowRow(false);
                    setActiveStep(0);
                  }}
                  className="block linkadmin bg-black text-white text-center py-3 rounded-lg hover:bg-gray-800 transition"
                >
                  {user?.role === 'Admin' ? 'Enter Admin Panel' : 'Enter Owner Panel'}
                </Link>
              </div>
            </>
          )}

        </div>
  )
}

export default HeadBar