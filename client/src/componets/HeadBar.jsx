import React, { useEffect,useState } from 'react'
import { FaUser } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoHomeSharp } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import { IoIosClose } from "react-icons/io";

function HeadBar({activeStep,setActiveStep}) {
  const user = JSON.parse(localStorage.getItem('user'))
  const [showRow, setShowRow] = useState(false);


useEffect(() => {
  console.log(activeStep);
  ; // Ensure the step is set on page load
}, );

  return (
      <div>
        <div className='headbar'>
          <h1>terraiNet</h1>
          <div className='choose'>
            <Link to='/TerrainsFootball' onClick={() => setActiveStep(1)}  style={{  backgroundColor: activeStep === 1 ? 'transparent' : 'transparent', color: activeStep === 1 ? "white" : "", padding: activeStep === 1 ? "6px 30px" : "black", borderRadius: activeStep === 1 ? "0" : "0" , borderBottom: activeStep === 1 ? " 3px solid white" : "0"  }} className='ftpd'>Foot</Link>
            <Link to='/TerrainsPadel' onClick={() => setActiveStep(2)} style={{  backgroundColor: activeStep === 2 ? 'transparent' : 'transparent', color: activeStep === 2 ? "white" : "", padding: activeStep === 2 ? "6px 30px" : "black", borderRadius: activeStep === 2 ? "0" : "0" , borderBottom: activeStep === 2 ? " 3px solid white" : "0"  }} className='ftpd'>Padel</Link>
          </div>
            <div className='icons'>
              <Link to='/'><IoHomeSharp  onClick={() => setActiveStep(0)} style={{fontSize:"large",marginLeft:"20px",color:"white",cursor:"pointer"}}/></Link>
              {user ?(  
              <Link to='/Profile' style={{ textDecoration: 'none', color: 'white' }} onClick={() => setActiveStep(0)}  onMouseEnter={() => setShowUser(true)}onMouseLeave={() => setShowUser(false)}><FaUser style={{fontSize:"large",marginLeft:"20px",color:"white",cursor:"pointer"}}  /></Link>
              ):(
                <Link to='/signUp' onClick={() => setActiveStep(0)} > <button className='btsignup'>SignUp</button></Link>
              )}
              {
                user?.role === 'Admin' ?(
                  <IoMdMenu style={{fontSize:"xx-large",marginLeft:"10px",color:"white",cursor:"pointer"}} onClick={()=>setShowRow(true)} />
                ):(
                  ""
                )
              }
            </div>
          </div>
          {showRow  && (
            <>
              {/* Overlay to prevent clicks on other parts of the page */}
              <div className="overlay" onClick={() => setShowRow(false)}></div>

              <div className='adminlinks'>
                <div style={{ marginLeft: "90%" }}>
                  <IoIosClose onClick={() => setShowRow(false)} className='iconnav' />
                <h1 >Admin</h1>
                </div>
                <Link to='/Admin' onClick={() => {setShowRow(false),setActiveStep(0)}} className='linkadmin'>Admin</Link>
              </div>
            </>
          )}
        </div>
  )
}

export default HeadBar