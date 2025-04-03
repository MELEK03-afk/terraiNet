import React,{useState} from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeadBar from './componets/HeadBar';
import SignUp from './componets/SignUp';
import ChangeBar from './componets/ChangeBar';
import TerrainsFootball from './componets/TerrainsFootball';
import TerrainsPadel from './componets/TerrainsPadel';
import HeadAdmin from './componets/HeadAdmin';
import UserMangement from './componets/UserMangement';
import AddTerrains from './componets/AddTerrains';
import ReservationP from './componets/ReservationP';
import HomePage from './componets/HomePage';
import AllFields from './componets/AllFields';
import Testpage from './componets/TestPage';

function App() {
  const [activeStep, setActiveStep] = useState(0);
  const [activeStep2, setActiveStep2] = useState(1);

  return (
    <Router>
      <HeadBar  activeStep={activeStep} setActiveStep={setActiveStep} />
      <Routes>
        <Route path='/' element={<HomePage  />}/>
        <Route path='/test' element={<Testpage />}/>
        <Route path='/AllFields' element={<Testpage/>}/>
        <Route path='/change'  element={<ChangeBar activeStep={activeStep} setActiveStep={setActiveStep}   />}/>
        <Route path='/Admin' element={<HeadAdmin setActiveStep={setActiveStep} activeStep={activeStep}/>}/>
        <Route path='/MangementU' element={<UserMangement/>}/>
        <Route path='/Reservation' element={<ReservationP activeStep2={activeStep2} />}/>
        <Route path='/TerrainsFootball' element={<TerrainsFootball activeStep={activeStep} setActiveStep={setActiveStep} />}/>
        <Route path='/TerrainsPadel' element={<TerrainsPadel activeStep={activeStep} setActiveStep={setActiveStep}/>}/>
        <Route path='/AddTerrains' element={<AddTerrains activeStep={activeStep} setActiveStep={setActiveStep} />}/>
        <Route path='/signUp' element={<SignUp/>}/>
      </Routes>
    </Router>
  )
}

export default App