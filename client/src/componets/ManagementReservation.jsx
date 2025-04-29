import React, { useState, useEffect } from "react";
import HeadAdmin from "./HeadAdmin.jsx";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import toast, { Toaster } from "react-hot-toast";
import { FaSearch } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { ScaleLoader } from "react-spinners";
import { Check,Trash2 } from "lucide-react";
import { use } from "react";
import moment from "moment";

function TestPage() {
  // const [Reservation, setReservation] = useState([]);
  const [Reservation, setReservation] = useState([]);
  const [day, setday] = useState(() => {
      const today = new Date();
      return today.toISOString().split("T")[0]; // "YYYY-MM-DD"
    }); 
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));


  const getAllReservation = async () => {
    try {
      const URL = user?.role === 'Admin' ? 'http://localhost:2024/api/Admin/getAllReservation' : `http://localhost:2024/api/Owner/get-Reservation-Owner/${user.id}`
      const res = await axios.get(URL ,{
        headers: {
          'Authorization': `Bearer ${user.token}`
          }
        });
        setReservation(res.data)
        console.log(res.data);
        
    } catch (error) {
      console.error("Error fetching Reservation:", error); 
    }
  };

  useEffect(() => {
    getAllReservation();    
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);


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

  
  
  
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  useEffect(() => {
    const controls = animate(count, Reservation.length, { duration: 2 });
    return () => controls.stop();
  }, [Reservation, Reservation.length]);

  const filteredReservation = Reservation.filter((reservation) =>
    reservation.day.includes(day) &&
    reservation.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="APUSers">
      <HeadAdmin />
      <Toaster />
      <div className="headUsrs">
        <h1> Reservation</h1>
        <div className="head-3">
          <div className="srch-1">
            <input type="search" className="search" placeholder="Search by Email" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <div className="srch-2">
            <FaSearch style={{ color: "black" }} />
          </div>
        </div>
        <motion.h6 style={{ fontSize: "20px" }}>{rounded}</motion.h6>
      </div>
      <div>
        <div className="TimeReservationMR">
          {
          days.map(item => (
            <div key={item.date} className="day" style={{color: day === item.date ? "white" :'',backgroundColor: day === item.date ? "black" :''}} onClick={() => (setday(item.date),setNameDay(item.dayName))}>
              <h5>{item.dayName}</h5>
              <h5>{item.date}</h5>
            </div>
          ))
          }

        </div>
      </div>
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh" }}>
          <ScaleLoader color="white" />
        </div>
      ) : (
        <div className="divtabe">
          <table border={0}>
            <thead>
              <tr>
                <th>field Title</th>
                <th>request name</th>
                <th>phoneNumber</th>
                <th>Capacity</th>
                <th>Price</th>
                <th>time</th>
                <th>day</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredReservation.map((reservation) => 
               <tr key={reservation._id}>
                  <td>{reservation.title}</td>
                  <td>{reservation.fullName}</td>
                  <td>{reservation.phoneNumber}</td>
                  <td>{reservation.capacity}</td>
                  <td>{reservation.price}</td>
                  <td>{reservation.time}</td>
                  <td>{moment(reservation.day).format("YYYY-MM-DD")}</td>
                  <td style={{ display: "flex", justifyContent: "space-evenly", fontSize: "large" }}>
                    <Trash2  style={{color:"#F63528"}}/>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {Reservation.length === 0 && (
            <p style={{ textAlign: "center", marginTop: "10px" }}>
              No Reservation found.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default TestPage;
