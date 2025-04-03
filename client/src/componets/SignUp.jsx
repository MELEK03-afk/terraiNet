import React,{useState} from 'react'
import { motion } from "framer-motion";
import {Link,useNavigate} from "react-router-dom"
import axios from 'axios'
import toast, { Toaster, } from 'react-hot-toast';
import { MdErrorOutline } from "react-icons/md";

const pageVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  exit: { opacity: 0, y: -50, transition: { duration: 0.6 } },
};

function SignUp() {
  const [showForm , setShowForm] = useState(false)
  const [fullNameErr,setfullNameErr]=useState('')
  const [passwordErr,setpasswordErr]=useState('')
  const [emaildErr,setemaildErr]=useState('')
  const [phoneNumberErr,setPhoneNumberErr]=useState('')
  const [fullName,setFullName]=useState('')
  const [phoneNumber,setPhoneNumber]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const navigate=useNavigate()
  const displayForm= ()=>{
    if (showForm === false) {
          
          return(
          <div className='signup'>
            <h2>Create Your Account</h2>
            <input type="text" placeholder='fullName' onChange={(e)=>setFullName(e.target.value)} className='inputsignup' />
            <p className='error'>{fullNameErr}</p>
            <input type="text" placeholder='phoneNumber' onChange={(e)=>setPhoneNumber(e.target.value)} className='inputsignup' />
            <p className='error'>{phoneNumberErr} </p>
            <input type="text" placeholder='E-mail' onChange={(e)=>setEmail(e.target.value)} className='inputsignup' />
            <p className='error'>{emaildErr} </p>
            <input type="password" placeholder='Password' onChange={(e)=>setPassword(e.target.value)} className='inputsignup' />
            <p className='error'>{passwordErr} </p>
            <button className='btsign' onClick={signUp}>Sign Up</button>
            <h5 style={{color:" rgb(184, 183, 183)"}}>{showForm ? 'You don"t have Account?' : 'Already have Account?'} <Link style={{color:'black'}} onClick={() => setShowForm(!showForm)}>{showForm ? 'SignUp' : 'SignIn'}</Link></h5>
          </div> )
    }
    else{
      return(
          <div className='signup'>
            <h2>Create Your Account</h2>
            <input type="text" placeholder='E-mail' onChange={(e)=>setEmail(e.target.value)} style={{marginTop:"17%"}} className='inputsignin' />
            <input type="password" placeholder='Password' onChange={(e)=>setPassword(e.target.value)} className='inputsignin' />
            <button className='btsignin' onClick={singIn}>Sign In</button>
            <h5 style={{color:" rgb(184, 183, 183)"}}>{showForm ? 'You don"t have Account?' : 'Already have Account?'} <Link style={{color:'black'}} onClick={() => setShowForm(!showForm)}>{showForm ? 'SignUp' : 'SignIn'}</Link></h5>
          </div>
      )
    }
  }

  function isNumber(phoneNumber) {
    var pattern = /^\d+\.?\d*$/;
    return pattern.test(phoneNumber);  // returns a boolean
}
  const signUp= async()=>{
    console.log(email)
    console.log(fullName)
    console.log(phoneNumber)
    console.log(password)
    if(!fullName || !email || !password || !phoneNumber ){
      toast.error(`All fialds are required`)
    }
    var checkPhone = isNumber(phoneNumber)
    if (!fullName.trim() || fullName.length<0) {
      setfullNameErr(
        <>
          Invalid full name <MdErrorOutline />
        </>
      );
    } else {
      setfullNameErr('');
    }
    
    if (password.length < 6) {
      setpasswordErr(
        < >
          Invalid password <MdErrorOutline />
        </>
      );      }
    else {
      setpasswordErr('')  }
    if(!checkPhone){
      setPhoneNumberErr(
        < >
          Invalid Phone Number <MdErrorOutline />
        </>
      );    }else {
      setPhoneNumberErr('')
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setemaildErr(
        < >
          Invalid Email <MdErrorOutline />
        </>
      );     }
    else{
      setemaildErr('')   }

    try {
      const res= await axios.post('http://localhost:2024/api/signUp',{
        fullName,
        email,
        phoneNumber,
        password
      })
      switch (res.status) {
        case 201:
          toast.success("Account created successfully");
          localStorage.setItem('user' , JSON.stringify(res.data))
          setTimeout(() => {
            navigate("/");
            window.location.reload()}
          , 1000);
          email('')
          fullName('')
          phoneNumber('')
          password('')
          break;
    
        case 202:
          toast.error("This email address is already in use");
          break;
        case 203:
          toast.error("This phoneNumber is already in use");
          setPhoneNumberErr(
            < >
              Invalid Phone Number <MdErrorOutline />
            </>
          ); 
          break;
    
        case 200:
          toast.error(data.message || "Verify email or password");
          break;
    
        default:
          toast.error("An unexpected error occurred. Please try again.");
      }
    } catch (error) {
      console.log(error)
    }
  }
  const singIn= async()=>{
    try {
      console.log(password);
      console.log(email);
      
      if(!email || !password){
        toast.error("All fields are required")
      }
      const res= await axios.post('http://localhost:2024/api/signIn',{
        email,
        password
      })
     
      if(res.status === 200){
        toast.success("Wlecome back")
        localStorage.setItem('user' , JSON.stringify(res.data))
        setTimeout(() => {
          navigate('/')
        }, 1000);
      }
    } catch (error) {
      console.log(error)

    }
  }
  return (
    <div className='backline'>
      <motion.div variants={pageVariants}  initial="initial" animate="animate" exit="exit" >
        <Toaster   containerStyle={{ marginTop: "5%" }}/>
        {displayForm()}
        </motion.div>
    </div>
  )
}

export default SignUp