// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home';
/* import SomeOtherPage from './components/SomeOtherPage'; */

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                {/* <Route path="/other" element={<SomeOtherPage />} /> */}
            </Routes>
        </Router>
    );
}

export default App;


//Nedostaju signin i login fileovi za pokusaj spajanja 2 App.jsx pa je kod drugog ispod:

/* import React, { useState } from 'react';
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";

function App() {
  const [form, setForm] =useState("login");
  return (
    <>
    {form == "login" ? (
      <LogIn FormHandle ={setForm}/>) : 
      ( <SignUp FormHandle ={setForm}/>)}
    </>
  );
}


export default App; */

