import React from 'react'
import {Link} from 'react-router-dom'
function ReservationP({activeStep2}) {
  return (
    <div className='Reservation'>
       <div className="NavBar">
      <Link className='Linkreservation'  to="/etap1">
        <div className="etap-1">
          <div
            className="etap-1-1"
            style={{ backgroundColor: activeStep2 === 1 ? 'white' : 'transparent',color: activeStep2 === 1 ? 'black' : 'transparent' }}
          >
            1
          </div>
          <div className="etap-1-2">
            <h4>Step 1</h4>
            <h3>Reservation</h3>
          </div>
        </div>
      </Link >
      <Link className='Linkreservation' to="/etap2">
        <div className="etap-1">
          <div
            className="etap-1-1"
            style={{ backgroundColor: activeStep2 === 2 ? 'white' : 'transparent' }}
          >
            2
          </div>
          <div className="etap-1-2">
            <h4>Step 2</h4>
            <h3>Select Info</h3>
          </div>
        </div>
      </Link >
      {/* <Link className='Linkreservation' to="/etap3">
        <div className="etap-1">
          <div
            className="etap-1-1"
            style={{ backgroundColor: activeStep2 === 3 ? 'white' : 'transparent' }}
          >
            3
          </div>
          <div className="etap-1-2">
            <h4>Step 3</h4>
            <h3>ADD-ONS</h3>
          </div>
        </div>
      </Link > */}
      {/* <Link className='Linkreservation' to="/etap4">
        <div className="etap-1">
          <div
            className="etap-1-1"
            style={{ backgroundColor: activeStep2 === 4 ? 'white' : 'transparent' }}
          >
            4
          </div>
          <div className="etap-1-2">
            <h4>Step 4</h4>
            <h3>SUMMARY</h3>
          </div>
        </div>
      </Link > */}
      {/* <h1>teraiNet</h1> */}
    </div>
        <div className='content'></div>
    </div>
  )
}

export default ReservationP