import React, { useState, useEffect } from "react";
import ownerHead from "./HeadAdmin.jsx";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import toast, { Toaster } from "react-hot-toast";
import { FaSearch } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { ScaleLoader } from "react-spinners"; // Import ScaleLoader
import HeadAdmin from "./HeadAdmin.jsx";

function TestPage() {
  const [Fields, setFields] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [editMode, setEditMode] = useState(null);
  const [updatedName, setUpdatedName] = useState('');
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(true); // State for loading

  const getAllFields = async () => {
    try {
      const res = await axios.get('http://localhost:2024/api/getAllFields');
      setFields(res.data);
    } catch (error) {
      console.error("Error fetching fields:", error);
    }
  };

  const deleteUser = async (id) => {
    toast((t) => (
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", backgroundColor: "white" }}>
        <p>Are you sure you want to delete this Fields?</p>
        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
          <button
            onClick={() => confirmDelete(id, t.id)}
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
    ), { duration: 5000 });
  };

  useEffect(() => {
    getAllFields();
  }, []);
  setTimeout(() => {
    setLoading(false);
  }, 3000);

  const confirmDelete = async (id, toastId) => {
    try {
      const res = await axios.delete(`http://localhost:2024/api/owner/deleteUser/${id}`);
      if (res.status === 200) {
        toast.dismiss(toastId);
        toast.success("User deleted successfully!");
        getUser();
      }
    } catch (error) {
      toast.error("Error deleting user.");
    }
  };

  const count = useMotionValue(0);
  const rounded = useTransform(() => Math.round(count.get()));

  useEffect(() => {
    const controls = animate(count, filteredFields.length, { duration: 2 });
    return () => controls.stop();
  }, [Fields]);

  const displayForm = (field) => {
    if (editMode === field._id) {
      return (
        <tr key={field._id}>
        <td>
          <input type="text" value={field.title} />
        </td>
        <input type="text" value={field.address} />
        <td>
          <select  className="roleselecte"   onChange={(e) => setRole( e.target.value)}>
            <option value="">status</option>
            <option value="User">Available</option>
            <option value="owner">Not Availebal</option>
          </select>
        </td>
        <td>{field.capacity}</td>
        <td>{field.Price}</td>
        <td style={{ textAlign: "center" }}>
          <button className="update" onClick={() => updateUser(field._id)}>
            Update
          </button>
          <IoIosClose onClick={() => setEditMode(null)} style={{ cursor: "pointer" }} />
        </td>
      </tr>
      
      );
    } else {
      return (
        
        <tr key={field._id}>
          <td>{field.title}</td>
          <td>{field.address}</td>
          <td>{field.city}</td>
          <td>{field.capacity}</td>
          <td>{field.price * field.capacity}</td>
          <td>{field.type}</td>
          <td style={{ display: "flex", justifyContent: "space-evenly", fontSize: "large" }}>
            <MdDelete onClick={() => deleteUser(field._id)} style={{ cursor: "pointer" }} />
            <CiEdit onClick={() => { setEditMode(field._id); setUpdatedName(user.fullName); }} style={{ cursor: "pointer" }} />
          </td>
        </tr>
      );
    }
  };

  // Filtered users based on search term
  const filteredFields = Fields.filter((field) =>
    field.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="APUSers">
      <HeadAdmin />
      <div className="headUsrs">
        <Toaster />
        <h1>Management Users</h1>
        <div className="head-3">
          <div className="srch-1">
            <input type="search" className="search" placeholder="Search by Type" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <div className="srch-2">
            <FaSearch style={{ color: "black" }} />
          </div>
        </div>
        <motion.h6 style={{ fontSize: "20px", style: 'text' }}>{rounded}</motion.h6>
      </div>
      
      {/* Display ScaleLoader while loading */}
      {loading ? (
          <ScaleLoader style={{position:"absolute",top:"50%",marginLeft:"50%",fontSize:"xx-large"}} color="white" />
      ) : (
        <div className="divtabe">
          <table border={0}>
            <thead>
              <tr>
                <th>title</th>
                <th>Address</th>
                <th>city</th>
                <th>Capacity</th>
                <th>Price</th>
                <th>Type</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredFields.map((field) => displayForm(field))}
            </tbody>
          </table>
          {filteredFields.length === 0 && (
            <p style={{ textAlign: "center", marginTop: "10px" }}>
              No users found
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default TestPage;
