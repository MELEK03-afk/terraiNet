import React, { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"
import { toast, Toaster } from 'sonner';
import moment from 'moment'
import { ArrowBigRightDash,ArrowBigLeftDash  } from 'lucide-react';
import {useNavigate} from "react-router-dom"
import { Button, Modal } from 'antd';

const ReservationP = () => {
  const {id} = useParams(); // This gets the :id from the URL
  const [time, settime] = useState("");
  const [day, setday] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // "YYYY-MM-DD"
  }); 
  const [title,setTiltle]=useState('')
  const [capacity,setCapacity]=useState('')
  const [price,setPrice]=useState('')
  const [owner,setOwner]=useState('')
  const [NameDay, setNameDay] = useState(moment().format('dddd'));
  const [field, setField] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]); // Store available times
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate=useNavigate()
  const user=JSON.parse(localStorage.getItem("user"))
  const times = [
    "7:30", "9:00", "10:30", "12:00", "13:30",
    "15:00", "16:30", "18:00", "19:30", "21:00", "22:30"
  ];

  const getField = async (id) => {
    try {
      const res = await axios.get(`http://localhost:2024/api/getField/${id}`);
      setField(res.data.field);
      setTiltle(res.data.field.title)
      setCapacity(res.data.field.capacity)
      setPrice(res.data.field.price)
      setOwner(res.data.field.owner)
    } catch (error) {
      console.error("Failed to fetch field:", error);
    }
  };

  useEffect(() => {
    toast('You should pick time and day', {
      icon: '⚠️',
      duration: 2000,
    });   
    getField(id);
    
  }, []);
  

  const checkTime = async () => {
    try {
      const available = [];
  
      await Promise.all(
        times.map(async (time) => {
          const res = await axios.post("http://localhost:2024/api/checktime", {
            time,
            day,
            title,
          });
          if (res.status === 201) {
            available.push(time);
          }
        })
      );
  
      // Sort available times based on their original order
      available.sort((a, b) => times.indexOf(a) - times.indexOf(b));
      setAvailableTimes(available);
    } catch (error) {
      console.error("Failed to fetch time:", error);
    }
  };
  
  
  useEffect(() => {
    if (day && title) {
      checkTime();
    }
  }, [day, title]);

  console.log(availableTimes)
  
  
  const sendRequest = async ()=>{

    // console.log(title);
    // console.log(day);
    // console.log(time);
    // console.log(price);
    // console.log(capacity);
    if (time === '') {
      toast.error("You should pick time")

    }
    try {
      const res= await axios.post(`http://localhost:2024/api/send-Request`,{
        fullName:user.fullName,
        phoneNumber:user.phoneNumber,
        title,
        day,
        time,
        price,
        capacity,
        owner
      })
      if (res.status === 201) {
        toast.success("Your request sendet ✅")
        setTimeout(() => {
          navigate('/Profile')
          window.location.reload()
        }, 2000); }
    } catch (error) {
      console.log(error)
      if (res.status != 201) {
        toast.error(error.response?.data?.message || "Server error occurred");
      }
    }
  }


  const getNext7Days = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = moment().add(i, 'days');
      // console.log(day); // This logs the full moment object
      days.push({
        date: day.format('YYYY-MM-DD'),  // Formats the date as "2025-04-23"
        dayName: day.format('dddd'),     // Full day name, e.g., "Wednesday"
        shortDay: day.format('ddd'),     // Abbreviated day, e.g., "Wed"
      });
    }
    return days;
  };


    const days = getNext7Days();    
    // const filteredday= Users.filter((user) =>
    //   user.email.toLowerCase().includes(searchTerm.toLowerCase())
    // );
  return (
    <div className='Reservation'>
      <h1>Your  Reservation</h1>
      <div>
        <div className="TimeReservation">
          <ArrowBigLeftDash  size={45} style={{cursor:"pointer"}}/>
          {
          days.map(item => (
            <div key={item.date} className="day" style={{color: day === item.date ? "white" :'',backgroundColor: day === item.date ? "black" :''}} onClick={() => (setday(item.date),setNameDay(item.dayName))}>
              <h5>{item.dayName}</h5>
              <h5>{item.date}</h5>
            </div>
          ))
          }
          <ArrowBigRightDash size={45} style={{cursor:"pointer"}}/>

        </div>
      </div>
      <h3>Time Available in this day</h3>
      <div className='TimeReservation'>
      {availableTimes.map((Time , index) => {
        let t = ''
        times.map(item =>{
          if(item === Time){
            t = item
          }
        })
        return(
            <button 
            style={{color: Time === time ? "white" :'',backgroundColor: Time === time ? "black" :''}}
            key={index}
            variant={Time === time ? "default" : "outline"}
            onClick={() => settime(Time)}
            className="Timebt"
            >
              {t}
            </button>
          )

      }
      )
        }
      </div>
      {field ? (
        <div className='Reservation-1'>
          <div className="Reservation-2">
          <Modal title=" ✅" open={isModalOpen} onOk={()=>(sendRequest(),setIsModalOpen(false))} onCancel={()=>setIsModalOpen(false)}>
            <h3>Your request has been sent. You can view the result in your profile.</h3>
          </Modal>  
          </div>
          <div className="Reservation-3">
            <h2>Reserve: <span style={{color:"gray",fontSize:"24px",fontWeight:"600"}}>{field.title}</span></h2>
            <h2>City: <span style={{color:"gray",fontSize:"24px",fontWeight:"600"}}>{field.city || "Unknown"}</span></h2>
            <h2>Address: <span style={{color:"gray",fontSize:"24px",fontWeight:"600"}}>{field.address || "N/A"}</span></h2>
            <h2>Capacity: <span style={{color:"gray",fontSize:"24px",fontWeight:"600"}}>{field.capacity}</span></h2>
            <h2>Price: <span style={{color:"gray",fontSize:"24px",fontWeight:"600"}}>{field.price} dt</span></h2>
            <h2>Day: <span style={{color:"gray"}}> <span style={{color:"gray"}}>{NameDay}</span> {day} </span></h2>
            <h2>Time: <span style={{color:"gray"}}>{time}</span></h2>
            <button className="Timebt" onClick={()=>setIsModalOpen(true)} style={{marginLeft:"80%"}}>Resrve</button>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default ReservationP