import React, { useState, useEffect, useRef } from 'react';
import ChangeBar from './ChangeBar';
import pic8 from '../images/pic8.jpg';
import pic2 from '../images/pic2.jpeg';
import pic1 from '../images/back.jpg';
import pic3 from '../images/pic3.png';
import pic4 from '../images/pic7.jpg';
import pic5 from '../images/pic5.jpg';
import { Link } from 'react-router-dom';
import { Instagram ,Facebook,Smile } from 'lucide-react';
import axios from 'axios'
import ko from '../images/ko.png'

// Hook to reveal content on scroll
function useRevealOnScroll() {
  const ref = useRef();
  const [isVisible, setVisible] = useState(false);
    const [showForm , setShowForm] = useState(false)
  

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
}

const displayForm =()=>{
  if (showForm == false) {
    return(
      <div style={{backgroundColor:'#050506'}}>
        <div
          className={`aboutus reveal ${aboutVisible ? 'visible' : ''}`}
          ref={aboutRef}>
          <div className='head-last'>
            <h1>Renting Playgrounds – A Platform for Every Player</h1>
          </div>
          <div className='head-last'>
            <p>
              Discover the easiest way to find and rent playgrounds for sports,
              events, and recreational activities. Our user-friendly platform
              offers expert tools and features to help individuals, teams, and
              organizations book the perfect space anytime, anywhere. With a wide
              range of listings, real-time availability, and seamless booking
              options, Renting Playgrounds helps you save time and focus on what
              matters most—playing the game.
            </p>
          </div>
        </div>

        <div
          className={`details reveal ${detailsVisible ? 'visible' : ''}`} ref={detailsRef}>
          <div className='dt'>
            <div className='dt-1'>
              <h3>Booking Made Simple</h3>
              <p>
              From mobile to desktop, booking your favorite sports field has never been easier. We walk you through the steps—from selecting a time slot to receiving instant confirmation—so you can focus on the game, not the process.
              </p>
            </div>
            <div className='dt-2'>
              <h3>Choosing the Right Venue</h3>
              <p>
              Not sure which facility suits your game? Our guide helps you compare locations based on amenities, surface types, and proximity. Whether you're playing casually with friends or organizing a competitive match, we’ll help you find the perfect spot.
              </p>
            </div>
          </div>
          <div className='dt'>
            <div className='dt-3'>
              <h3>Manage & Modify with Ease</h3>
              <p>
              Plans changed? No worries. Learn how to cancel, reschedule, or update your reservations in just a few clicks. Stay in control of your schedule and avoid last-minute surprises with our flexible booking management tools.
              </p>
            </div>
            <div className='dt-4'>
              <h3>Beginner's Guide</h3>
              <p>
              Our beginner’s guide provides essential information and tips for new users looking to book sports facilities with ease. Learn how to browse venues, check availability, make quick reservations, and manage your bookings confidently.
              </p>
            </div>
          </div>
        </div>
        <div className={` reveal ${contactVisible ? 'visible' : ''}`} ref={conatctRef}  >
          <div className='divcontact'></div>
          <div className='contactCom'>
              <h2>Contact</h2>
              <h2>review</h2>
          </div>
          {/* <h1 style={{color:"white",position:"relative",left:"30%",top:"160px",fontSize:"60px"}}>Contact</h1> */}
            <div style={{display:'flex'}}>
            <div className='divcontact-1'>
              <h3>
              Are you a sports facility owner or manager looking to maximize your bookings and reach more players? Join our network of Sport Booking partners and make your venue easily accessible to thousands of users looking to book courts, fields, and sports spaces online. By partnering with us, you’ll benefit from increased visibility, streamlined reservations, and dedicated support. <span style={{color:"#00E6AD"}}>  If you're interested in becoming a partner, feel free to contact us via email — we’d love to hear from you! </span>
              </h3>
            </div>
            <div className='divcontact-2'>
              <input type="text" placeholder="Name" id="" />
              <input type="text" placeholder="Phone Number" id="" />
              <input type="text" placeholder="Email" id="" />
              <textarea placeholder="Your message" id=""></textarea>
              <button className='sendcontact'>Send</button>
            </div>
            </div>
          <div className='footer'>
            <div className='footericons'>

            </div>
            <div className='footericons' style={{position:"relative",right:"2%"}}>
              <Smile className='iconFooter' size={30}/>
              <Facebook className='iconFooter' size={30}/>
              <Instagram  className='iconFooter' size={30}/>
            </div>
          </div>
        </div>
      </div>
    )
  }

}



function HomePage() {
  const backgrounds = [pic8, pic1, pic2, pic3, pic4, pic5];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [aboutRef, aboutVisible] = useRevealOnScroll();
  const [detailsRef, detailsVisible] = useRevealOnScroll();
  const [conatctRef, contactVisible] = useRevealOnScroll();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  

  const isValid=()=>{
    if(!Name || !email || !Number || !message ){
      return false
    }
      return true
    
  }

 

  return (
    <div className='Home'>
      <ChangeBar />
      <div style={{backgroundColor:'#010102'}}>
        <div
          className={`aboutus reveal ${aboutVisible ? 'visible' : ''}`}
          ref={aboutRef}>
          <div className='head-last'>
            <h1>Renting Playgrounds – A Platform for Every Player</h1>
          </div>
          <div className='head-last'>
            {/* <p>
              Discover the easiest way to find and rent playgrounds for sports,
              events, and recreational activities. Our user-friendly platform
              offers expert tools and features to help individuals, teams, and
              organizations book the perfect space anytime, anywhere. With a wide
              range of listings, real-time availability, and seamless booking
              options, Renting Playgrounds helps you save time and focus on what
              matters most—playing the game.
            </p> */}
          </div>
        </div>

        <div
          className={`details reveal ${detailsVisible ? 'visible' : ''}`} ref={detailsRef}>
          <div className='dt'>
            <div className='dt-1'>
              <h3>Booking Made Simple</h3>
              <p>
              From mobile to desktop, booking your favorite sports field has never been easier. We walk you through the steps—from selecting a time slot to receiving instant confirmation—so you can focus on the game, not the process.
              </p>
            </div>
            <div className='dt-2'>
              <h3>Choosing the Right Venue</h3>
              <p>
              Not sure which facility suits your game? Our guide helps you compare locations based on amenities, surface types, and proximity. Whether you're playing casually with friends or organizing a competitive match, we’ll help you find the perfect spot.
              </p>
            </div>
          </div>
          <div className='dt'>
            <div className='dt-3'>
              <h3>Manage & Modify with Ease</h3>
              <p>
              Plans changed? No worries. Learn how to cancel, reschedule, or update your reservations in just a few clicks. Stay in control of your schedule and avoid last-minute surprises with our flexible booking management tools.
              </p>
            </div>
            <div className='dt-4'>
              <h3>Beginner's Guide</h3>
              <p>
              Our beginner’s guide provides essential information and tips for new users looking to book sports facilities with ease. Learn how to browse venues, check availability, make quick reservations, and manage your bookings confidently.
              </p>
            </div>
          </div>
        </div>
        <div className={` reveal ${contactVisible ? 'visible' : ''}`} ref={conatctRef}  >
          <div className='footerHome'>
            <div className='footericons1'>
               <img src={ko} alt="" />
            </div>
            <div className='footerLink'>
            <Link className='linkfooter' to='/Contact' >Contact</Link>
            </div>
            <div className='footericons' style={{position:"relative",right:"2%"}}>
              <Smile className='iconFooter' size={30}/>
              <Facebook className='iconFooter'style={{marginLeft:"20px"}} size={30}/>
              <Instagram  className='iconFooter' style={{marginLeft:"20px"}} size={30}/>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
}

export default HomePage;
