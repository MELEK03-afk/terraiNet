import React, { useState, useEffect } from 'react';
import ChangeBar from './ChangeBar';
import { Link } from "react-router-dom";
import terrain from '../images/sassi.jpg';
import logo from '../images/Logoft1.png';
import axios from 'axios';
import { CiLocationOn } from "react-icons/ci";
import { FaUsers } from "react-icons/fa";
import { motion, useScroll } from "motion/react"



function Terrains({activeStep,setActiveStep}) {
  const [Fields, setFields] = useState([]);
  const { scrollYProgress } = useScroll()



  const getAllFields = async () => {
    try {
      const res = await axios.get('http://localhost:2024/api/getAllFields');
      setFields(res.data);
    } catch (error) {
      console.error("Error fetching fields:", error);
    }
  };
  useEffect(() => {
    getAllFields();
  }, []);



  return (
    <div className='terrainsFoot'>
       <motion.div
              id="scroll-indicator"
              style={{
                  scaleX: scrollYProgress,
                  position: "fixed",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 10,
                  originX: 0,
                  backgroundColor: "#28A745",
              }}
        />
      <div className='Fields'>
      {Fields.filter((Field) => Field.type === 'football').map((Field) => (
        <div className='Field' key={Field.id}> {/* Assuming Field has a unique 'id' */}
          <div style={{ height: "85%" }}>
            <img src={terrain} alt="Field" />
            <div className='donner'>
              <h4>{Field.title}</h4> {/* Display dynamic name */}
            </div>            
            <div className='donner'>
              {/* <h3><CiLocationOn/></h3> */}
              <h4 style={{color:"#28A745", fontWeight:"bolder"}}>{(Field.price*Field.capacity)} DT</h4>
            </div>
            <div className='donner'>
              <h3 style={{ marginRight: "10px" }}><FaUsers/></h3>
              <h3>Capacity:</h3>
              <h4>{Field.capacity}</h4>
            </div>
          </div>
          <Link to='/Reservation'>
            <button >Reserve</button>
          </Link>
        </div>
      ))}

      </div>
    </div>
  );
}

export default Terrains;
