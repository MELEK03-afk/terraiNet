import React,{useState,useEffect} from 'react'
import pic1 from '../images/back.jpg'
import small from '../images/sassis.jpg'
import pic8 from '../images/pic8.jpg'
import pic2 from '../images/pic2.jpeg'
import pic3 from '../images/pic3.png'
import {Link} from 'react-router-dom'
import pic4 from '../images/pic7.jpg'
import pic5 from '../images/pic5.jpg'
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { CiFacebook } from "react-icons/ci";
const backgrounds = [pic3,pic1, pic8,pic5];

function ChangeBar({}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const x=<FaXTwitter className='icon'/>
  const insta=<FaInstagram className='icon'/>
  const fc=<CiFacebook className='icon'/>

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
    }, 5000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);
  
  return (
    <div>
      <div className='change' style={{ backgroundSize: "cover", backgroundPosition: "center", transition: "background-image 0.5s ease-in-out", backgroundImage: `url('${backgrounds[currentIndex]}')`,}}>
      </div>
      <div className='text'>
          <h1 style={{color:"#00E6AD"}}>Sport</h1>
          <h1 style={{color:"white"}}>Booking</h1>
          <h3>Réservez votre stade | Football | Padel | Disponible maintenant</h3>
          {/* <h3> <br /> more</h3> */}
      </div> 
      <div class="section-2">
            <div class="dvsection-1">
              <img src={pic4} alt="" />
            </div>
            <div class="dvsection-2">
                <h2>
                For Commercial Centres
                Book a meeting with our team                </h2>
                <h2>
                The Leading Online Software Solution for Booking, Payments, Facility Management, Events, Leagues, and more                </h2>
            </div>
        </div>
    </div>
  )
}

export default ChangeBar