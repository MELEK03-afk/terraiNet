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
import { Check,Trash2  } from "lucide-react";
import { use } from "react";
import moment from "moment";

function TestPage() {
  // const [Requests, setRequests] = useState([]);
  const [Requests, setRequests] = useState([]);
  


  const [searchTerm, setSearchTerm] = useState("");
    const [time, settime] = useState("");
    const [day, setday] = useState('')
    const [title,setTiltle]=useState('')
    const [capacity,setCapacity]=useState('')
    const [fullName,setFullname]=useState('')
    const [price,setPrice]=useState('')
    const [owner,setOwner]=useState('')
    const [phoneNumber,setNumber]=useState('')
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));


  const getAllRequests = async () => {
    try {
      const URL = user?.role === 'Admin' ? 'http://localhost:2024/api/Admin/getAllRequests' : `http://localhost:2024/api/Owner/get-Requests-Owner/${user.id}`
      const res = await axios.get(URL ,{
        headers: {
          'Authorization': `Bearer ${user.token}`
          }
        });
        setRequests(res.data)
        console.log(res.data);
        
    } catch (error) {
      console.error("Error fetching Requests:", error); 
    }
  };

  const deleteRequest = async (id) => {
    try {
      const res= await axios.delete(`http://localhost:2024/api/Owner/deleteRequest/${id}`,{
        headers: {
          'Authorization': `Bearer ${user.token}`
      }})

      if (res.status === 200) {
        toast.success("Request deleted ✅")
        setTimeout(() => {
          getAllRequests()
        }, 2000); 
      }

    } catch (error) {
      console.log(error);
      
      if (error.status != 200) {
        toast.error(error.response?.data?.message ||'Server error occurred' )
      }
    }
  }

  useEffect(() => {
    getAllRequests();    
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);



  const deleteField = async (id) => {
    toast((t) => (
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", backgroundColor: "white" }}>
        <p>Are you sure you want to delete this field?</p>
        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
          <button
            onClick={() => deleteRequest(id)}
            style={{ background: "red", color: "white", padding: "5px 10px", border: "none", borderRadius: "5px", cursor: "pointer" }}
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            style={{ background: "gray", color: "white", padding: "5px 10px", border: "none", borderRadius: "5px", cursor: "pointer" }}
          >
            No
          </button>
        </div>
      </div>
    ), { duration: 3000 });
  };

  const AccepteRequest = async (id) =>{
    try {
      const res= await axios.post(`http://localhost:2024/api/Owner/AccepteRequest/${id}`,{
        time,
        day,
        title,
        price,
        owner,
        fullName,
        phoneNumber,
        capacity,

        
      },{
        headers: {
          'Authorization': `Bearer ${user.token}`
      }})

      if (res.status === 200) {
        setTimeout(() => {
        toast.success("Request accepted ✅")
        getAllRequests()
        }, 2000); 
      }

    } catch (error) {
      console.log(error);
      
      if (error.status != 200) {
        toast.error(error.response?.data?.message ||'Server error occurred' )
      }
    }
  }

  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  

  useEffect(() => {
    const controls = animate(count, Requests.length, { duration: 2 });
    return () => controls.stop();
  }, [Requests, Requests.length]);


  return (
    <div className="APUSers">
      <HeadAdmin />
      <Toaster />
      <div className="headUsrs">
        <h1>Management Requets</h1>
        <div className="head-3">
          <div className="srch-1">
            <input
              type="search"
              className="search"
              placeholder="Search by Type"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="srch-2">
            <FaSearch style={{ color: "black" }} />
          </div>
        </div>
        <motion.h6 style={{ fontSize: "20px" }}>{rounded}</motion.h6>
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
              {Requests.map((requests) => 
               <tr key={requests._id}>
                  <td>{requests.title}</td>
                  <td>{requests.fullName}</td>
                  <td>{requests.phoneNumber}</td>
                  <td>{requests.capacity}</td>
                  <td>{requests.price}</td>
                  <td>{requests.time}</td>
                  <td>{moment(requests.day).format("YYYY-MM-DD")}</td>
                  <td style={{ display: "flex", justifyContent: "space-evenly", fontSize: "large" }}>
                    <Check style={{color:'#38BC60',marginRight:"20px"}} size={30} onClick={()=>(
                      setCapacity(requests.capacity),
                      setFullname(requests.fullName),
                      setOwner(requests.owner),
                      setPrice(requests.price),
                      setday(requests.day),
                      settime(requests.time),
                      setTiltle(requests.title),
                      setNumber(requests.phoneNumber),
                      AccepteRequest(requests._id)
                    )}/>
                    {/* <button className="requestbt" onClick={()=>(
                      setCapacity(requests.capacity),
                      setOwner(requests.owner),
                      setPrice(requests.price),
                      setday(requests.day),
                      settime(requests.time),
                      setTiltle(requests.title),
                      setNumber(requests.phoneNumber),
                      ac
                    )}  style={{backgroundColor:"#38BC60"}}>Accepte</button> */}
                    <Trash2 onClick={()=> deleteField(requests._id)} style={{color:"#F63528"}}/>
                    {/* <button className="requestbt" onClick={()=> deleteField(requests._id)} style={{backgroundColor:"#F63528"}}>Delete</button> */}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {Requests.length === 0 && (
            <p style={{ textAlign: "center", marginTop: "10px" }}>
              No Requests found.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default TestPage;
